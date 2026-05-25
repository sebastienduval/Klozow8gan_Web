import { startsWithVowel, endsWithVowel, startsWithIgnoreCase } from "./string.js";
import { VerbalOrder } from "./verbal_order.js"
import { VerbalTense } from "./verbal_tense.js"

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

export function generateVerbAffix(root, isAnimate, order, tense, plural, isDefinite)
{
    function GetIntro(tense)
    {
        if ( tense == VerbalTense.PAST_PERFECT )
        {
            return "kizi ";
        }
        return "";
    }

    function GeneratePronoun(root, index, order, isDefinite)
    {
        if ( order != VerbalOrder.INDEPENDENT )
        { 
            return ""; 
        }

        var Pronoun = Pronouns[index];
        if ( !isDefinite && (index == 2 || index ==6) )
        {
            Pronoun = "";
        }
        else
        {
            if ( startsWithVowel(root) )
            {
                Pronoun += "d";
            }
            Pronoun += "'";        
        }
        return Pronoun;        
    }

    function GenerateIndices(order)
    {
        if ( order == VerbalOrder.IMPERATIVE )
        {
            return [1, 4, 5];
        }
        return [0, 1, 2, 3,4, 5, 6];
    }
    
    function GenerateEnding(index, tense, isDefinite, lastChar)
    {        
        console.log("GenerateEnding:  " + index + " " + tense + " " + isDefinite + " " + lastChar);

        let endings = undefined;

        if ( !isDefinite )
        {
            let presentEndings = new Map();
            presentEndings.set("a", ["a", "a", "a", "abna", "abna", "aba", "ak"]);
            presentEndings.set("i", ["i", "i", "o", "ibna", "ibna", "iba", "oak"]);   
            presentEndings.set("ï", ["ï", "ï", "o", "ïbna", "ïbna", "ïba", "oak"]);
            presentEndings.set("8", ["8", "8", "a", "8bna", "8bna", "8ba", "ak"]);
            presentEndings.set("o", ["o", "o", "o", "obna", "obna", "oba", "oak"]);
            presentEndings.set("m", ["m", "m", "m", "mobna", "mobna", "moba", "mok"]);

            let pastEndings = new Map();
            pastEndings.set("a", ["ab", "ab", "ab", "abnob", "abnob", "ab8b", "abanik"]);
            pastEndings.set("i", ["ib", "ib", "ob", "ibnob", "ibnob", "ib8b", "obanik"]);
            pastEndings.set("ï", ["ïb", "ïb", "ob", "ïbnob", "ïbnob", "ïb8b", "obanik"]);        
            pastEndings.set("8", ["8b", "8b", "ab", "8bnob", "8bnob", "8b8b", "abanik"]);
            pastEndings.set("o", ["ob", "ob", "ob", "obnob", "obnob", "ob8b", "obanik"]);
            pastEndings.set("m", ["mob", "mob", "mob", "mobnob", "mobnob", "mob8b", "mobanik"]);         
            
            let tenseMap = new Map();        
            tenseMap.set(VerbalTense.PRESENT, presentEndings);
            tenseMap.set(VerbalTense.PAST_PERFECT, presentEndings);    
            tenseMap.set(VerbalTense.PAST, pastEndings);
            tenseMap.set(VerbalTense.FUTUR, presentEndings);       
            tenseMap.set(VerbalTense.CONDITIONAL, presentEndings);
            endings = tenseMap.get(tense);
        }
        else
        {
            console.log("Here GenerateEnding:  " + index + " " + tense + " " + isDefinite + " " + lastChar);
            var presentEndings = new Map();
            presentEndings.set("8", ["8", "8", "8", "8nna", "8nna", "8w8", "8w8"]);

            let pastEndings = new Map();
            pastEndings.set("8", ["8b", "8b", "8bani", "8nnob", "8nnob", "8w8b", "8w8bani"]);          

            let tenseMap = new Map();
            tenseMap.set(VerbalTense.PRESENT, presentEndings);                       
            tenseMap.set(VerbalTense.PAST, pastEndings);
            tenseMap.set(VerbalTense.PAST_PERFECT, presentEndings); 
            tenseMap.set(VerbalTense.FUTUR, presentEndings);       
            tenseMap.set(VerbalTense.CONDITIONAL, presentEndings);                       
            endings = tenseMap.get(tense);
        }        
        
        if ( !endings )
        {
            console.log("Could not find tense: " + tense);
        }
        return endings.get(lastChar)[index];
    }
    
    function GetExtraTenseVerbEndings(tense)
    {
        var extraTenseEnding = "";
        if ( tense == VerbalTense.FUTUR )
        {
            extraTenseEnding += 'ji';
        }
        else if  ( tense == VerbalTense.CONDITIONAL )
        {
            extraTenseEnding += 'ba';            
        }
        return extraTenseEnding;
    }

    var result = [];    
    const lastChar = root.at(-1);
    for ( const index of GenerateIndices(order) )
    {
        const strippedRoot = root.slice(0, root.length-1);
        result.push(GetIntro(tense) + GeneratePronoun(root, index, order, isDefinite) + strippedRoot + GenerateEnding(index, tense, isDefinite, lastChar) + GetExtraTenseVerbEndings(tense));
    }
    return result;
};