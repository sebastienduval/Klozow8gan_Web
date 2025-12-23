const vowelSet = new Set(['a','i','o','8']);

function GetFirstLetterUpperCase(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function StartsWithVowel(string) 
{
  return vowelSet.has(string[0]);
}

function EndsWithVowel(string)
{ 
  return vowelSet.has(string[string.length-1]);
}

function startsWithIgnoreCase(string1, string2)
{
  return string1.toUpperCase().startsWith(string2.toUpperCase());
}

function containsIgnoreCase(string1, string2)
{
  return string1.toUpperCase().includes(string2.toUpperCase());
}

function normalizeString(string) 
{
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeDuplicates(strings) 
{
  return Array.from(new Set(strings));
}

function findDuplicates(strings) 
{
  const map = new Map();
  const duplicates = [];

  for (const string of strings) 
  {
    if (map.has(string)) 
    {
      map.set(string, map.get(string) + 1); // Increment count
    } 
    else 
    {
      map.set(string, 1); // Initialize count
    }
  }

  for (const [key, value] of map) 
  {
    if (value > 1) 
    {
      duplicates.push(key);
    }
  }

  return duplicates;
}


function shuffleStringAllChars(string) 
{
  const arr = string.split('');

  // Fisher–Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 ≤ j ≤ i
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.join('');
}


function shuffleLettersOnly(string)
{
  // Collect letters and their positions
  const letters = [];
  const positions = [];
  for (let i = 0; i < string.length; i++) 
  {
    const ch = string[i];
    if (/[a-z]/.test(ch)) {
      letters.push(ch);
      positions.push(i);
    }
  }

  // Shuffle the letters (Fisher–Yates)

  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Rebuild the string
  const result = string.split('');
  for (let k = 0; k < positions.length; k++) {
    result[positions[k]] = letters[k];
  }

  return result.join('');
}

/// Count only letters in the string.
function countLetters(string)
{
  let result = 0;  
  string = string.toLowerCase();
  for (let i = 0; i < string.length; i++) 
  {
    const char = string[i];
    if (/[a-z]/.test(char)) 
    {
      ++result;
    }
  }
  return result;
}

// Helpers
function shuffleInPlace(array, rand = Math.random) 
{
  for (let i = array.length - 1; i > 0; i--) 
  {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sampleUnique(pool, k, rand = Math.random) 
{
  const copy = pool.slice();
  const result = [];
  // Partial Fisher–Yates selection
  for (let i = copy.length - 1; i >= 0 && result.length < k; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
    result.push(copy[i]);
  }
  return result;
}

/**
 * Shuffle only the middle letters (first and last fixed).
 * @param {string} word
 */
function middleShuffle(word) {
  const lower = word.toLowerCase();
  if (lower.length <= 3) return lower; // too short to matter

  const first = lower[0];
  const last = lower[lower.length - 1];
  const mid = lower.slice(1, -1).split('');

  shuffleInPlace(mid);

  return first + mid.join('') + last;
}

