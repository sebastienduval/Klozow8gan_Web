import { startsWithVowel, endsWithVowel, startsWithIgnoreCase } from "./string.js";

const Pronouns = ["n", "k", "w", "n", "k", "k", "w"];

export function generatePossessiveAffix(noun, animate, plural)
{
    function GeneratePronoun(noun, index)
    {
        if ( startsWithVowel(noun) )
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
        if ( endsWithVowel(noun) )
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