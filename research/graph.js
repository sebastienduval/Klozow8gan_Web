/**
 * Represents a node in the Multi-Entry / Multi-Exit Word Graph.
 */
class GraphNode {
    static nextId = 0;

    constructor(char) {
        this.id = GraphNode.nextId++;
        this.char = char;
        // Outgoing transitions: nextChar -> GraphEdge
        this.outEdges = new Map();
        // Incoming transitions: prevChar -> GraphEdge
        this.inEdges = new Map();
        // Words that start at this character
        this.startWords = new Set();
        // Words that end at this character
        this.endWords = new Set();
        // All words that visit this node at least once
        this.words = new Set();
    }
}

/**
 * Represents a directed character transition between two GraphNodes.
 */
class GraphEdge {
    constructor(fromNode, toNode, charPair) {
        this.id = `${fromNode.id}->${toNode.id}:${charPair}`;
        this.from = fromNode;
        this.to = toNode;
        this.charPair = charPair;
        // Set of word strings that traverse this edge
        this.words = new Set();
    }

    get weight() {
        return this.words.size;
    }
}

/**
 * Multi-Entry / Multi-Exit Directed Graph for exploring shared sub-paths
 * and recurring character patterns across a lexicon.
 */
class WordPatternGraph {
    constructor() {
        // char -> GraphNode
        this.nodes = new Map();
        // edge.id -> GraphEdge
        this.edges = new Map();
        // word -> metadata object ({ french, type, source, raw })
        this.lexicon = new Map();
    }

    getOrCreateNode(char) {
        if (!this.nodes.has(char)) {
            this.nodes.set(char, new GraphNode(char));
        }
        return this.nodes.get(char);
    }

    getOrCreateEdge(fromNode, toNode) {
        const key = `${fromNode.id}->${toNode.id}`;
        if (!this.edges.has(key)) {
            const edge = new GraphEdge(fromNode, toNode, `${fromNode.char}→${toNode.char}`);
            fromNode.outEdges.set(toNode.char, edge);
            toNode.inEdges.set(fromNode.char, edge);
            this.edges.set(key, edge);
        }
        return this.edges.get(key);
    }

    /**
     * Adds a word (and optional lexical metadata) into the graph.
     * @param {string} word
     * @param {object|null} meta
     */
    addWord(word, meta = null) {
        if (!word) return;
        const chars = Array.from(word);
        if (chars.length === 0) return;

        // If word already exists, remove old contribution first so counts stay clean
        if (this.lexicon.has(word)) {
            this.removeWord(word);
        }

        this.lexicon.set(word, meta || {
            french: '',
            type: '',
            source: '',
            raw: word
        });

        const firstNode = this.getOrCreateNode(chars[0]);
        firstNode.startWords.add(word);
        firstNode.words.add(word);

        for (let i = 0; i < chars.length; i++) {
            const currNode = this.getOrCreateNode(chars[i]);
            currNode.words.add(word);

            if (i < chars.length - 1) {
                const nextNode = this.getOrCreateNode(chars[i + 1]);
                nextNode.words.add(word);
                const edge = this.getOrCreateEdge(currNode, nextNode);
                edge.words.add(word);
            }
        }

        const lastNode = this.getOrCreateNode(chars[chars.length - 1]);
        lastNode.endWords.add(word);
    }

    /**
     * Removes a word from the graph and prunes unused edges/nodes.
     * @param {string} word
     * @returns {boolean}
     */
    removeWord(word) {
        if (!this.lexicon.has(word)) return false;
        this.lexicon.delete(word);

        for (const [edgeId, edge] of this.edges.entries()) {
            edge.words.delete(word);
            if (edge.words.size === 0) {
                edge.from.outEdges.delete(edge.to.char);
                edge.to.inEdges.delete(edge.from.char);
                this.edges.delete(edgeId);
            }
        }

        for (const [char, node] of this.nodes.entries()) {
            node.startWords.delete(word);
            node.endWords.delete(word);
            node.words.delete(word);
            if (
                node.words.size === 0 &&
                node.inEdges.size === 0 &&
                node.outEdges.size === 0
            ) {
                this.nodes.delete(char);
            }
        }

        return true;
    }

    getAllWords() {
        return Array.from(this.lexicon.keys());
    }

    /**
     * Finds all occurrences of a substring across stored words.
     * @param {string} pattern
     * @returns {{ word: string, startIndex: number, endIndex: number, left: string, right: string }[]}
     */
    findPatternOccurrences(pattern) {
        if (!pattern) return [];
        const results = [];
        for (const word of this.lexicon.keys()) {
            let idx = word.indexOf(pattern);
            while (idx !== -1) {
                results.push({
                    word,
                    startIndex: idx,
                    endIndex: idx + pattern.length,
                    left: word.slice(0, idx),
                    right: word.slice(idx + pattern.length)
                });
                idx = word.indexOf(pattern, idx + 1);
            }
        }
        return results;
    }

    /**
     * Extracts recurring substrings of lengths [minLen..maxLen] appearing in at least minFreq words.
     * @param {number} minLen
     * @param {number} maxLen
     * @param {number} minFreq
     */
    discoverRecurringPatterns(minLen = 2, maxLen = 6, minFreq = 2) {
        // pattern -> Set of words containing it
        const patternToWords = new Map();

        for (const word of this.lexicon.keys()) {
            const chars = Array.from(word);
            const seenInThisWord = new Set();

            for (let i = 0; i < chars.length; i++) {
                for (let len = minLen; len <= maxLen && i + len <= chars.length; len++) {
                    const sub = chars.slice(i, i + len).join('');
                    if (!seenInThisWord.has(sub)) {
                        seenInThisWord.add(sub);
                        if (!patternToWords.has(sub)) {
                            patternToWords.set(sub, new Set());
                        }
                        patternToWords.get(sub).add(word);
                    }
                }
            }
        }

        const candidates = [];
        for (const [pattern, wordSet] of patternToWords.entries()) {
            if (wordSet.size >= minFreq) {
                const occurrences = this.findPatternOccurrences(pattern);
                const glosses = Array.from(wordSet)
                    .map(w => this.lexicon.get(w)?.french)
                    .filter(Boolean);

                candidates.push({
                    pattern,
                    length: Array.from(pattern).length,
                    wordCount: wordSet.size,
                    words: Array.from(wordSet),
                    glosses,
                    occurrences
                });
            }
        }

        // Rank by word frequency first, then longer substrings
        candidates.sort((a, b) => {
            if (b.wordCount !== a.wordCount) return b.wordCount - a.wordCount;
            return b.length - a.length;
        });

        return candidates;
    }

    getStats() {
        return {
            wordCount: this.lexicon.size,
            nodeCount: this.nodes.size,
            edgeCount: this.edges.size
        };
    }
}

/**
 * REST client for managing morphemes against the backend API.
 */
class MorphemeApiClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
    }

    buildUrl(path, queryParams = {}) {
        const url = new URL(`${this.baseUrl}${path}`, window.location.origin);
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && String(value).trim() !== '') {
                url.searchParams.set(key, String(value).trim());
            }
        });
        // If baseUrl is explicitly cross-origin/full URL, use full href; otherwise path+search
        if (/^https?:\/\//i.test(this.baseUrl)) {
            return url.toString();
        }
        return `${url.pathname}${url.search}`;
    }

    async search({ q = '', morpheme = '', type = '', description = '' } = {}) {
        const endpoint = this.buildUrl('/api/morphemes', { q, morpheme, type, description });
        const res = await fetch(endpoint);
        if (!res.ok) {
            const errBody = await res.json().catch(() => ({}));
            throw new Error(errBody.error || `HTTP ${res.status}`);
        }
        return res.json();
    }

    async add({ morpheme, description, type }) {
        const endpoint = this.buildUrl('/api/morphemes');
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ morpheme, description, type })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || `HTTP ${res.status}`);
        }
        return data.data || data;
    }

    async update(id, { morpheme, description, type }) {
        const endpoint = this.buildUrl(`/api/morphemes/${encodeURIComponent(id)}`);
        const payload = {};
        if (morpheme !== undefined) payload.morpheme = morpheme;
        if (description !== undefined) payload.description = description;
        if (type !== undefined) payload.type = type;

        const res = await fetch(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || `HTTP ${res.status}`);
        }
        return data.data || data;
    }

    async remove(id) {
        const endpoint = this.buildUrl(`/api/morphemes/${encodeURIComponent(id)}`);
        const res = await fetch(endpoint, {
            method: 'DELETE'
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.error || `HTTP ${res.status}`);
        }
        return data;
    }
}

/**
 * Local state helper for morpheme records returned by the API.
 */
class MorphemeStore {
    constructor(apiClient) {
        this.api = apiClient;
        this.items = [];
        this.selectedId = null;
    }

    async refresh(filters = {}) {
        const rows = await this.api.search(filters);
        this.items = Array.isArray(rows) ? rows : [];
        if (this.selectedId !== null && !this.items.some(m => m.id === this.selectedId)) {
            this.selectedId = null;
        }
        return this.items;
    }

    async create(entry) {
        const created = await this.api.add(entry);
        await this.refresh();
        if (created && created.id !== undefined) {
            this.selectedId = created.id;
        }
        return created;
    }

    async edit(id, patch) {
        const updated = await this.api.update(id, patch);
        await this.refresh();
        return updated;
    }

    async delete(id) {
        await this.api.remove(id);
        if (this.selectedId === id) {
            this.selectedId = null;
        }
        await this.refresh();
    }

    getSelected() {
        return this.items.find(m => m.id === this.selectedId) || null;
    }
}