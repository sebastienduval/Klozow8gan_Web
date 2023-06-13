function GenerateLocative(noun, animate=false)
{
    var locative = "";
    if (EndsWithVowel(noun))
    {
        locative = noun + "k";
    }
    else if ( animate && noun.endsWith("em") || !animate && noun.endsWith("gen") )
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
    return locative;
}