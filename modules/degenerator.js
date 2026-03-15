import { Animacy } from "./animacy.js";
import { Dictionary } from "./dictionary.js";
import { endsWithVowel } from "./string.js";

export class DegenerationContext
{
    constructor(dictionary, word)
    {
        this.dictionary = dictionary;
        this.word = word;
        this.animacy = Animacy.UNKNOWN;
        this.isPlural = false;
        this.isLocative = false;
        this.isDependent = false;
        this.entry = null;
    }
}

export function degeneratePlural(context)
{
    let result = context.word;
    function analyzeCases(cases, animacy)
    {
        for ( let specificCase of cases )
        {
            const [success, word] = specificCase(context.word);
            if ( success )
            {
                let entry = context.dictionary.findEntry(Dictionary.ABENAKI, word);
                if ( entry != null )
                {
                    context.animacy = animacy;
                    context.isPlural = true;
                    context.entry = entry;
                    result = word;
                    break;
                }
            }            
        }
    }

    let animateCases = 
    [    
        (word) =>
        {
            if ( word.endsWith('ak') || word.endsWith('8k') )
            {
                return [true, word.slice(0,-1)];
            }
            return [false, null];
        },    
        (word) =>
        {
            if (word.endsWith('emok'))
            {
                return [true, word.slice(0,-2)];
            }
            return [false, null];            
        },
        (word) =>
        {
            if (word.endsWith("akok") || word.endsWith("agok") || word.endsWith("skok") || word.endsWith("sgok"))
            {
                return [true, word.slice(0,-2) + "w"];
            }
            return [false, null];
        },
        (word) =>
        {
            if (word.endsWith("ajik") || word.endsWith("ijik"))
            {
                return [true, word.slice(0, -3) + "t"];
            }
            return [false, null];            
        },
        (word) =>
        {
            if (word.endsWith('ak'))
            {
                return [true, word.slice(0,-2)];
            }
            return [false, null];            
        }
    ];
    
    let inanimateCases = 
    [    
        (word) =>
        {
            if ( word.endsWith('al') )
            {
                return [true, word.slice(0,-1)];
            }
            return [false, null];            
        },    
        (word) =>
        {
            if (word.endsWith('genol'))
            {
                return [true, word.slice(0,-2)];
            }
            return [false, null];            
        },
        (word) =>
        {
            if (word.endsWith("kol") || word.endsWith("gol"))
            {
                return [true, word.slice(0,-2) + "w"];
            }
            return [false, null];
        },
        (word) =>
        {
            if (word.endsWith("kil"))
            {
                return [true, word.slice(0, -2)];
            }
            return [false, null];
        },
        (word) =>
        {
            if (word.endsWith('al'))
            {
                return [true, word.slice(0,-2)];
            }
            return [false, null];            
        }
    ];     
    
    if ( context.word.endsWith('k') )
    {
        analyzeCases(animateCases, Animacy.ANIMATE);
    }
    else if ( context.word.endsWith('l') )
    {
        analyzeCases(inanimateCases, Animacy.INANIMATE);
    }

    return result;
}

export function degenerateLocative(context)
{
    let result = context.word;  
    
    function analyzeCases(cases, isPlural)
    {
        for ( let specificCase of cases )
        {
            const [success, word] = specificCase(context.word);
            if ( success )
            {
                let entry = context.dictionary.findEntry(Dictionary.ABENAKI, word);
                if ( entry != null )
                {
                    context.isPlural = isPlural;
                    context.isLocative = true;
                    context.entry = entry;
                    result = word;
                    break;
                }
            }            
        }
    }    

    if ( context.word.endsWith('ikok') )
    {
        let word = context.word.slice(0, -4);

        let entry = context.dictionary.findEntry(Dictionary.ABENAKI, word);
        if ( entry != null )
        {
            context.isPlural = true;
            context.isLocative = true;
            context.word = word;
            context.entry = entry;
            return result;
        }                
    }

   let singularCases = 
    [    
        (word) =>
        {
            if ( word.endsWith('k') )
            {
                let temp = word.slice(0,-1);
                return [endsWithVowel(temp), temp];
            }
            return [false, null];            
        },    
        (word) =>
        {
            if (word.endsWith('ok'))
            {
                let temp = word.slice(0,-1);
                let success =  temp.endsWith("em") || temp.endsWith("gen") || temp.endsWith("kw") || temp.endsWith("gw");
                return [success, temp];
            }
            return [false, null];            
        },
        (word) =>
        {
            if (word.endsWith("ek"))
            {
                return [true, word.slice(0,-2)];
            }
            return [false, null];
        }
    ];
    analyzeCases(singularCases, false);
    return result;    
}