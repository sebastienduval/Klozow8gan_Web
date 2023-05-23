function GeneratePlural(noun, animate=false)
{
    var plural = "";
    if (animate)
    {
        if (noun.endsWith("a") || noun.endsWith("8"))
        {
            plural = noun + "k";
        }
        else if (noun.endsWith("m"))
        {
            plural = noun + "ok";
        }
        else if (noun.endsWith("akw") || noun.endsWith("agw") || noun.endsWith("skw") || noun.endsWith("sgw"))
        {
            plural = noun.slice(0, -1) + "ok";
        }
        else if (noun.endsWith("at") || noun.endsWith("it") || noun.endsWith("ad") || noun.endsWith("id"))
        {
            plural = noun.slice(0, -1) + "jik";
        }
        else
        {
            plural = noun + "ak";
        }
    }
    else
    {
        if (noun.endsWith("a"))
        {
            plural = noun + "l";
        }
        else if (noun.endsWith("gen"))
        {
            plural = noun + "ol";
        }
        else if (noun.endsWith("kw") || noun.endsWith("gw"))
        {
            plural = noun.slice(0, -1) + "ol";
        }
        else if (noun.endsWith("ek"))
        {
            plural = noun + "il";
        }
        else
        {
            plural = noun + "al";
        }
    }

    return plural;
}