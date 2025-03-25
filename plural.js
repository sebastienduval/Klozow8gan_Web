const Pronouns = ["n", "k", "w", "n", "k", "k", "w"];

function GenerateNoun(noun, animate, plural, possessive, dependant, locative)
{
    // Trim the whitespaces.
    noun = noun.trim();
    noun = noun.toLowerCase();

    var nouns = [];
    if ( dependant )
    {
        nouns = GenerateDependant(noun, animate, plural);
    }
    else
    {        
        if ( possessive )
        {
            nouns = GeneratePossessive(noun, animate, plural);
        }
        else
        {
            if ( locative )
            {
                nouns.push(GenerateLocative(noun, plural));
            }
            else if ( plural )
            {
                nouns.push(GenerateIndependantPlural(noun, animate));
            }
            else
            {
                nouns.push(noun);
            }
        }
    }
    return nouns;
}

// Todo: Manage the alienability.
function GeneratePossessive(noun, animate, plural)
{
    function GeneratePronoun(noun, index)
    {
        if ( StartsWithVowel(noun) )
        {
            return Pronouns[index] + 'd';
        }
        return Pronouns[index];
    }

    function GenerateSingularPossive(noun)
    {
        if ( noun.endsWith("an") )
        {
            return noun;
        }
        if ( noun.endsWith("em") || noun.endsWith("en") )
        {
            return noun + 'om';
        }
        if ( EndsWithVowel(noun) )
        {
            return noun + 'm';
        }
        if ( noun.endsWith('akw') || noun.endsWith("agw") 
          || noun.endsWith("skw") || noun.endsWith("sgw") )
        {
            return noun.slice(0, -1) + "om";
        }
        return noun + 'em';
    }

    function GetPersonFinal(animate, index)
    {
        var finals;
        if ( animate )
        {
            const animateFinals = ["", "", "a", "na", "na", "w8", "w8"];
            finals = animateFinals;
        }
        else
        {
            const inanimateFinals = ["", "", "", "na", "na", "w8", "w8"];
            finals = inanimateFinals;
        }
        return finals[index];
    }

    function GetPlural(animate, plural, index)
    {
        if ( !plural )
        {
            return '';
        }
        var finals;
        if ( animate )
        {
            const animateFinals = ["ak", "ak", "", "wak", "wak", "k", ""];
            finals = animateFinals;
        }
        else
        {
            const inanimateFinals = ["al", "al", "al", "wal", "wal", "l", "l"];
            finals = inanimateFinals;
        }
        return finals[index];
    }    
    
    var result = [];
    for ( var i = 0; i < Pronouns.length; i ++ )
    {
        result.push(GeneratePronoun(noun, i)+GenerateSingularPossive(noun)+GetPersonFinal(animate, i)+GetPlural(animate, plural, i));
    }
    return result;
}

function GenerateIndependantPlural(noun, animate=false, possessive=false)
{
    var plural = "";
    if (animate)
    {
        if (noun.endsWith("a") || noun.endsWith("8"))
        {
            plural = noun + "k";
        }
        else if (noun.endsWith("em") /*|| noun.endsWith("gen")*/)
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

function GenerateDependant(noun, animate, plural)
{
    var plurals = [];
    noun = noun.substring(1);

    if ( animate )
    {
        const Finals = ["", "", "a", "na", "na", "w8", "w8"];
        const Plurals = ["ak", "ak", "", "wak", "wak", "k", ""];
        for ( var i = 0; i < Pronouns.length; i ++ )
        {
            let temp = Pronouns[i]+noun+Finals[i];
            if ( plural )
            {
                if ( i < 2 )
                {
                    if ( temp[temp.length-1] == 'a' )
                    {
                        temp = temp.slice(0, -1);
                    }
                }
                temp += Plurals[i];
            }
            plurals.push(temp);
        }
    }
    else
    {
        const Finals = ["", "", "", "na", "na", "w8", "w8"];
        const Plurals = ["al", "al", "al", "wal", "wal", "l", "l"];
        for ( var i = 0; i < Pronouns.length; i ++ )
        {
            plurals.push(Pronouns[i]+noun+Finals[i]+(plural?Plurals[i]:''));
        }
    }
    return plurals;
}