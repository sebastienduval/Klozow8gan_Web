function GenerateLocative(noun, plurial)
{
    // Trim the whitespaces.
    noun = noun.trim();
    noun = noun.toLowerCase();

    var locative = "";
    if ( plurial )
    {
        locative = noun + "ikok";
    }
    else
    {
        if (EndsWithVowel(noun))
        {
            locative = noun + "k";
        }
        else if ( noun.endsWith("em") || noun.endsWith("gen") )
        {
            locative = noun + "ok";
        }
        else if ( noun.endsWith("kw") || noun.endsWith("gw") )
        {        
            locative = noun.slice(0, -1) + "ok";
        } 
        else
        {
            locative = noun + "ek";
        }
    }   
    return locative;
}