class Learning
{
    static cookieDuration = 365;
    static kvp = new Map();
    static getWordScore(word)
    {
        let value = 0;
        if ( word )
        {
            word = word.toLowerCase();
            if ( this.kvp.has(word) )
            {
                return this.kvp.get(word);
            }
            
            let value = Cookies.get(word);
            if( !value )
            {
                value = 0;
            }
            else
            {
                value = parseInt(value);
            }
            this.kvp.set(word, value);
        }
        else
        {
            console.log(word);
        }
        return value;
    }

    static updateWordScore(word, scoreDelta)
    {
        const score = Learning.getWordScore(word) + scoreDelta;
        Learning.setWordScore(word, score);
    }

    static setWordScore(word, score)
    {
        word = word.toLowerCase();
        this.kvp.set(word, score);
        Cookies.set(word, score, { expires: Learning.cookieDuration });
    }
}