class Learning
{
    static cookieDuration = 365;
    static getWordScore(word)
    {
        let value = 0;
        if ( word )
        {
            word = word.toLowerCase();
            value = Cookies.get(word);
            if( !value )
            {
                value = 0;
            }
            else
            {
                value = parseInt(value);
            }
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
        Cookies.set(word, score, { expires: Learning.cookieDuration });
    }    
}