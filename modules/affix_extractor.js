import { Animacy } from "./animacy.js";
import { Dictionary } from "./dictionary.js";
import { startsWithVowel, endsWithVowel, startsWithIgnoreCase } from "./string.js";

export class DegenerationContext
{
    constructor(dictionary, word)
    {
        this.dictionary = dictionary;
        this.word = word;
        this.animacy = Animacy.UNKNOWN;
        this.isPlural = false;
        this.isLocative = false;
        this.isPossessive = false;
        this.person = undefined;
        this.entry = null;
    }
}

export function extractPluralAffix(context)
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

export function extractLocativeAffix(context)
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
            result = word;            
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
                let temp = word.slice(0,-2);
                let success =  temp.endsWith("em") || temp.endsWith("gen");
                return [success, temp];
            }
            return [false, null];            
        },
        (word) =>
        {
            if (word.endsWith('ok'))
            {
                let temp = word.slice(0,-2) + "w";
                let success =  temp.endsWith("kw") || temp.endsWith("gw");
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

export function extractPossessiveAffix(context)
{
    let result = context.word;  
    
    let pronounCases = 
    [    
        (word) =>
        {
            if ( startsWithIgnoreCase(word, 'n') )
            {
                let temp = word.slice(1);
                return [!startsWithVowel(temp), temp, 1];
            }
            return [false, null];            
        },
        (word) =>
        {
            console.log(word);
            if ( startsWithIgnoreCase(word, 'nd') )
            {
                let temp = word.slice(2);
                return [startsWithVowel(temp), temp, 1];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( startsWithIgnoreCase(word,'k') )
            {
                let temp = word.slice(1);
                return [!startsWithVowel(temp), temp, 2];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( startsWithIgnoreCase(word,'kd') )
            {
                let temp = word.slice(2);
                return [startsWithVowel(temp), temp, 2];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( startsWithIgnoreCase(word,'w') )
            {
                let temp = word.slice(1);
                return [!startsWithVowel(temp), temp, 3];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( startsWithIgnoreCase(word,'wd') )
            {
                let temp = word.slice(2);
                return [startsWithVowel(temp), temp, 3];
            }
            return [false, null];            
        }                            
    ]

    let endCases = 
    [    
        (word) =>
        {
            if ( word.endsWith('an') )
            {
                return [true, word];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( word.endsWith('om') )
            {
                let temp = word.slice(0, -2);                
                return [temp.endsWith('en')||temp.endsWith('em'), temp];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( word.endsWith('m') )
            {
                let temp = word.slice(0, -1);                
                return [endsWithVowel(temp) && !temp.endsWith('o'), temp];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( word.endsWith('agom') || word.endsWith('akom') || word.endsWith('sgom') || word.endsWith('skom') )
            {
                let temp = word.slice(0, -2) + "w";                
                return [true, temp];
            }
            return [false, null];            
        },
        (word) =>
        {
            if ( word.endsWith('em') )
            {
                let temp = word.slice(0, -2);                
                return [true, temp];
            }
            return [false, null];            
        },                                 
    ];    

    function analyzeCases(cases)
    {
        for ( let pronounCase of pronounCases )
        {
            const [success, word, person] = pronounCase(context.word);
            console.log("pronounCase: " + success + " -> " + word + " (person: " + person + ")");
            if ( success )
            {
                context.person = person;
                let oldWord = context.word;
                context.word = word;
                console.log(word);
                for ( let endCase of endCases )
                {                
                    const [success, word, person] = endCase(context.word);
                    console.log(word + " (" + success + ")");
                    if ( success )
                    {                
                        let entry = context.dictionary.findEntry(Dictionary.ABENAKI, word);
                        if ( entry != null )
                        {
                            context.isPossessive = true;
                            context.entry = entry;
                            result = word;
                            console.log(word + " SUCCESS");
                            return;
                        }
                    }
                } 
                context.word = oldWord;           
            }
        }
    }     

    analyzeCases(pronounCases);

    return result;    
}