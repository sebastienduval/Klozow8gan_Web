import { startsWithVowel, endsWithVowel, startsWithIgnoreCase } from "./string.js";
import { Animacy } from "./animacy.js"
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

export function generateVerbAffix(root, index, animacy, order, tense, isPlural, isDefinite, isNegative)
{
    function GetIntro(order, tense, isNegative)
    {
        if ( order == VerbalOrder.IMPERATIVE )
        {  
            if ( isNegative )            
            {
                return "akwi ";
            }                 
        }
        else
        {
            if ( tense == VerbalTense.PRESENT || tense == VerbalTense.PAST )
            {
                if ( isNegative )
                {
                    return "nda ";
                }
            }
            else if ( tense == VerbalTense.PAST_PERFECT )
            {
                if ( !isNegative )
                {
                    return "kizi ";
                }
                return "asma ";
            }
            else if ( tense == VerbalTense.FUTUR || tense == VerbalTense.CONDITIONAL )
            {
                if ( isNegative )
                {
                    return "ndaba ";
                }            
            }
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

    function GeneratePronouns(root, index, order, isDefinite)
    {
        if ( order != VerbalOrder.INDEPENDENT )
        { 
            return [""]; 
        }

        var Pronoun = Pronouns[index];
        if ( !isDefinite && (index == 2 || index ==6) )
        {
            return [""];
        }
        else
        {
            return [Pronoun+"'", Pronoun+"d'"];             
        }     
    }
        
    function GenerateEnding(index, root, order, tense, isDefinite, animacy, isNegative)
    {        
        //console.log("GenerateEnding:  " + index + " " + tense + " " + isDefinite + " " + lastChar);

        let endings = undefined;

        if ( order == VerbalOrder.IMPERATIVE )
        {
            endings = new Map();
            endings.set("a", ["", "a", "", "ada", "ada", "akw", ""]);
            endings.set("i", ["", "i", "", "ida", "ida", "ikw", ""]);
            endings.set("ï", ["", "ï", "", "ïda", "ïda", "ïkw", ""]);                     
            endings.set("8", ["", "a", "", "8da", "8da", "okw", ""]);
            endings.set("o", ["", "o", "", "oda", "oda", "okw", ""]);
            endings.set("em", ["", "a", "", "emoda", "emoda", "emokw", ""]);
            endings.set("am", ["", "a", "", "amoda", "amoda", "amokw", ""]);
            endings.set("om", ["", "a", "", "omoda", "omoda", "omokw", ""]);
            endings.set("im", ["", "ia", "", "imoda", "imoda", "imokw", ""]);            
        }
        else
        {
            if ( !isDefinite )
            {
                let presentEndings = new Map(); 
                let pastEndings = new Map();                       
                if ( !isNegative )
                {
                    presentEndings.set("a", ["a", "a", "a", "abna", "abna", "aba", "ak"]);
                    presentEndings.set("i", ["i", "i", "o", "ibna", "ibna", "iba", "oak"]);   
                    presentEndings.set("ï", ["ï", "ï", "o", "ïbna", "ïbna", "ïba", "oak"]);
                    presentEndings.set("8", ["8", "8", "a", "8bna", "8bna", "8ba", "ak"]);
                    presentEndings.set("o", ["o", "o", "o", "obna", "obna", "oba", "oak"]);
                    presentEndings.set("m", ["m", "m", "m", "mobna", "mobna", "moba", "mok"]);
                    
                    pastEndings.set("a", ["ab", "ab", "ab", "abnob", "abnob", "ab8b", "abanik"]);
                    pastEndings.set("i", ["ib", "ib", "ob", "ibnob", "ibnob", "ib8b", "obanik"]);
                    pastEndings.set("ï", ["ïb", "ïb", "ob", "ïbnob", "ïbnob", "ïb8b", "obanik"]);        
                    pastEndings.set("8", ["8b", "8b", "ab", "8bnob", "8bnob", "8b8b", "abanik"]);
                    pastEndings.set("o", ["ob", "ob", "ob", "obnob", "obnob", "ob8b", "obanik"]);
                    pastEndings.set("m", ["mob", "mob", "mob", "mobnob", "mobnob", "mob8b", "mobanik"]);
                } 
                else
                {
                    presentEndings.set("a", ["aw", "aw", "awi", "awbna", "awbna", "awba", "awiak"]);
                    presentEndings.set("i", ["iw", "iw", "owi", "iwbna", "iwbna", "iwba", "owiak"]);   
                    presentEndings.set("ï", ["ïw", "ïw", "owi", "ïwbna", "ïwbna", "ïwba", "owiak"]);
                    presentEndings.set("8", ["8w", "8w", "awi", "8wbna", "8wbna", "8wba", "awiak"]);
                    presentEndings.set("o", ["ow", "ow", "owi", "owbna", "owbna", "owba", "owiak"]);
                    presentEndings.set("m", ["mow", "mow", "mowi", "mowbna", "mowbna", "mowba", "mowiak"]);

                    pastEndings.set("a", ["awb", "awb", "awib", "awbnob", "awbnob", "awb8b", "awibanik"]);
                    pastEndings.set("i", ["iwb", "iwb", "owib", "iwbnob", "iwbnob", "iwb8b", "owibanik"]);
                    pastEndings.set("ï", ["ïwb", "ïwb", "owib", "ïwbnob", "ïwbnob", "ïwb8b", "owibanik"]);        
                    pastEndings.set("8", ["8wb", "8wb", "awib", "8wbnob", "8wbnob", "8wb8b", "awibanik"]);
                    pastEndings.set("o", ["owb", "owb", "owib", "owbnob", "owbnob", "owb8b", "owibanik"]);
                    pastEndings.set("m", ["mowb", "mowb", "mowib", "mowbnob", "mowbnob", "mowb8b", "mowibanik"]);                
                }        
                
                let tenseMap = new Map();        
                tenseMap.set(VerbalTense.PRESENT, presentEndings);
                tenseMap.set(VerbalTense.PAST_PERFECT, presentEndings);    
                tenseMap.set(VerbalTense.PAST, pastEndings);
                tenseMap.set(VerbalTense.FUTUR, presentEndings);       
                tenseMap.set(VerbalTense.CONDITIONAL, presentEndings);
                endings = tenseMap.get(tense);
            }
            else if ( animacy == Animacy.ANIMATE )
            {
                var presentEndings = new Map();
                let pastEndings = new Map();
                if ( !isNegative )
                {
                    presentEndings.set("8", ["8", "8", "8", "8nna", "8nna", "8w8", "8w8"]);
                    pastEndings.set("8", ["8b", "8b", "8bani", "8nnob", "8nnob", "8w8b", "8w8bani"]);          
                }
                else
                {
                    presentEndings.set("8", ["8wi", "8wi", "8wia", "8winna", "8winna", "8wiw8", "8wiw8"]);
                    pastEndings.set("8", ["8wib", "8wib", "8wiabani", "8winnob", "8winnob", "8wiw8b", "8wiw8bani"]);                    
                }

                let tenseMap = new Map();
                tenseMap.set(VerbalTense.PRESENT, presentEndings);                       
                tenseMap.set(VerbalTense.PAST, pastEndings);
                tenseMap.set(VerbalTense.PAST_PERFECT, presentEndings); 
                tenseMap.set(VerbalTense.FUTUR, presentEndings);       
                tenseMap.set(VerbalTense.CONDITIONAL, presentEndings);                       
                endings = tenseMap.get(tense);
            }
            else if ( animacy == Animacy.INANIMATE )
            {
                var presentEndings = new Map();
                let pastEndings = new Map();
                if ( !isNegative )
                {
                    presentEndings.set("a", ["an", "an", "an", "anana", "anana", "an8", "an8"]);    
                    presentEndings.set("i", ["in", "in", "in", "inana", "inana", "in8", "in8"]);
                    presentEndings.set("8", ["8n", "8n", "8n", "8nana", "8nana", "8n8", "8n8"]);
                    presentEndings.set("o", ["on", "on", "on", "onana", "onana", "on8", "on8"]);
                    presentEndings.set("m", ["men", "men", "men", "menana", "menana", "men8", "men8"]); 

                    pastEndings.set("a", ["anob", "anob", "anob", "ananob", "ananob", "an8b", "an8b"]);    
                    pastEndings.set("i", ["inob", "inob", "inob", "inanob", "inanob", "in8b", "in8b"]);
                    pastEndings.set("8", ["8nob", "8nob", "8nob", "8nanob", "8nanob", "8n8b", "8n8b"]);
                    pastEndings.set("o", ["onob", "onob", "onob", "onanob", "onanob", "on8b", "on8b"]);
                    pastEndings.set("m", ["menob", "menob", "menob", "menanob", "menanob", "men8b", "men8b"]);
                }
                else
                {
                    presentEndings.set("a", ["awen", "awen", "awen", "awenana", "awenana", "awen8", "awen8"]);    
                    presentEndings.set("i", ["iwen", "iwen", "iwen", "iwenana", "iwenana", "iwen8", "iwen8"]);
                    presentEndings.set("8", ["8wen", "8wen", "8wen", "8wenana", "8wenana", "8wen8", "8wen8"]);
                    presentEndings.set("o", ["owen", "owen", "owen", "owenana", "owenana", "owen8", "owen8"]);
                    presentEndings.set("m", ["mowen", "mowen", "mowen", "mowenana", "mowenana", "mowen8", "mowen8"]); 

                    pastEndings.set("a", ["awenob", "awenob", "awenob", "awenanob", "awenanob", "awen8b", "awen8b"]);    
                    pastEndings.set("i", ["iwenob", "iwenob", "iwenob", "iwenanob", "iwenanob", "iwen8b", "iwen8b"]);
                    pastEndings.set("8", ["8wenob", "8wenob", "8wenob", "8wenanob", "8wenanob", "8wen8b", "8wen8b"]);
                    pastEndings.set("o", ["owenob", "owenob", "owenob", "owenanob", "owenanob", "owen8b", "owen8b"]);
                    pastEndings.set("m", ["mowenob", "mowenob", "mowenob", "mowenanob", "mowenanob", "mowen8b", "mowen8b"]);                
                }

                let tenseMap = new Map();
                tenseMap.set(VerbalTense.PRESENT, presentEndings);                       
                tenseMap.set(VerbalTense.PAST, pastEndings);
                tenseMap.set(VerbalTense.PAST_PERFECT, presentEndings); 
                tenseMap.set(VerbalTense.FUTUR, presentEndings);       
                tenseMap.set(VerbalTense.CONDITIONAL, presentEndings);                       
                endings = tenseMap.get(tense);
            }
        }
        
        if ( !endings )
        {
            console.log("Could not find tense: " + tense);
        }
        if ( endings )
        {
            for (let [key, value] of  endings.entries()) 
            {   
                console.log(key);             
                if ( root.endsWith(key) )
                {
                    return [endings.get(key)[index], root.slice(0, root.length-key.length), root.at(-1)];
                }
            }
        }
        return undefined;
    }

    function GenerateNegative(index, isNegative)
    {
        if ( isNegative )
        {
            let presentEndings = new Map();
            presentEndings.set("a", ["aw", "aw", "awi", "aw", "aw", "aw", "awi"]);
            let endings = presentEndings.get(lastChar);
            return endings[index];
        }
        return '';
    }     
    
    function GetExtraTenseVerbEndings(tense, isNegative)
    {
        var extraTenseEnding = "";
        if ( !isNegative )
        {        
            if ( tense == VerbalTense.FUTUR )
            {

                extraTenseEnding += 'ji';
            }
            else if  ( tense == VerbalTense.CONDITIONAL )
            {
                extraTenseEnding += 'ba';            
            }
        }
        return extraTenseEnding;
    }
    
    function GetPluralEnding(index, isPlural, animacy, isNegative, lastChar)
    {
        if ( isPlural )
        {
            if ( animacy == Animacy.ANIMATE )
            {
                if ( !isNegative )
                {
                    const animateEndings = ["k", "k", "", "wak", "wak", "k", ""];
                    return animateEndings[index];
                }
                else
                {
                    const animateEndings = ["ak", "ak", "", "wak", "wak", "k", ""];
                    return animateEndings[index];                    
                }
            }
            else
            {
                    const inanimateEndings = ["al", "al", "al", "wal", "wal", "l", "l"];
                    return inanimateEndings[index];                   
            }
        }
        return "";
    }    
    
    const [ending, strippedRoot, lastChar] = GenerateEnding(index, root, order, tense, isDefinite, animacy, isNegative)

    return GetIntro(order, tense, isNegative) 
        + GeneratePronoun(root, index, order, isDefinite) 
        + strippedRoot 
        + ending
        + GetPluralEnding(index, isPlural, animacy, isNegative, lastChar)
        + GetExtraTenseVerbEndings(tense, isNegative);
}

export function generateEveryVerbAffix(root, animacy, order, tense, isPlural, isDefinite, isNegative)
{
    function GenerateIndices(order)
    {
        if ( order == VerbalOrder.IMPERATIVE )
        {
            return [1, 3, 4, 5];
        }
        return [0, 1, 2, 3,4, 5, 6];
    }

    var result = ["", "", "", "", "", "", ""];
    for ( const index of GenerateIndices(order) )
    {
        result[index] = generateVerbAffix(root, index, animacy, order, tense, isPlural, isDefinite, isNegative);
    }

    return result;
};