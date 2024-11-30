const Pronouns = ["n", "k", "w", "n", "k", "k", "w"];

function GenerateNoun(noun, animate, possessive, dependant)
{
    // Trim the whitespaces.
    noun = noun.trim();

    var plurals = [];
    if ( dependant )
    {
        plurals = GenerateDependantPlural(noun, animate);
    }
    else
    {        
        if ( possessive )
        {
            plurals = GeneratePossessive(noun, animate);
        }
        else
        {
            plurals.push(noun);
        }

        for (var i = 0; i < plurals.length; i ++ )
        {
            plurals[i] = GenerateIndependantPlural(plurals[i], animate);
        }
    }
    return plurals;
}

// Todo: Manage the alienability.
function GeneratePossessive(noun, animate)
{
    var result = [];
    var finals;
    if ( animate )
    {
        const Finals = ["", "", "a", "na", "na", "w8", "w8"];
        finals = Finals;
    }
    else
    {
        const Finals = ["", "", "", "na", "na", "w8", "w8"];
        finals = Finals;
    }
    for ( var i = 0; i < Pronouns.length; i ++ )
    {
        result.push(Pronouns[i]+noun+"em"+finals[i]);
    }
    return result;
}

function GenerateIndependantPlural(noun, animate=false)
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
        else if (noun.endsWith("k"))
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

function GenerateDependantPlural(noun, animate=false)
{
    var plurals = [];
    noun = noun.substring(1);

    if ( animate )
    {
        const Finals = ["", "", "a", "na", "na", "w8", "w8"];
        const Plurals = ["ak", "ak", "", "wak", "wak", "k", ""];
        for ( var i = 0; i < Pronouns.length; i ++ )
        {
            plurals.push(Pronouns[i]+noun+Finals[i]+Plurals[i]);
        }
    }
    else
    {
        const Finals = ["", "", "", "na", "na", "w8", "w8"];
        const Plurals = ["al", "al", "al", "wal", "wal", "al", "al"];
        for ( var i = 0; i < Pronouns.length; i ++ )
        {
            plurals.push(Pronouns[i]+noun+Finals[i]+Plurals[i]);
        }
    }
    return plurals;
}