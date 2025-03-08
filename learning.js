class Learning
{
    static cookieDuration = 365;
    static getWordScore(word)
    {
        word = word.toLowerCase();
        let value = Cookies.get(word);
        if( !value )
        {
            value = 0;
        }
        else
        {
            value = parseInt(value);
        }
        return value;
    }

    static updateWordScore(word, scoreDelta)
    {
        word = word.toLowerCase();
        const score = Learning.getWordScore(word) + scoreDelta;
        Cookies.set(word, score, { expires: Learning.cookieDuration });
    }
}