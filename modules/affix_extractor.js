import { Animacy } from "./animacy.js";
import { Person } from "./person.js";
import { Dictionary } from "./dictionary.js";
import { startsWithVowel, endsWithVowel, startsWithIgnoreCase, endsWithIgnoreCase, sliceEnd } from "./string.js";

export class ExtractionContext
{
    constructor(dictionary, word)
    {
        this.dictionary = dictionary;
        this.word = word;
        this.animacy = Animacy.UNKNOWN;
        this.isPlural = false;
        this.isLocative = false;
        this.isPossessive = false;
        this.isVerb = false;        
        this.person = undefined;
        this.entry = null;
        this.isDefinite = undefined;
    }

    clone()
    {
        let clone = new ExtractionContext(this.dictionary, this.word);
        clone.animacy = this.animacy;
        clone.isPlural = this.isPlural;
        clone.isLocative = this.isLocative
        clone.isPossessive = this.isPossessive;
        clone.isVerb = this.isVerb;
        clone.person = this.person;
        clone.entry = this.entry; 
        clone.isDefinite = this.isDefinite;           
        return clone;    
    }

    log()
    {
        console.log("Word " + this.word + " isPlural " + this.isPlural + " isPossessive " + this.isPossessive + " person " + this.person);        
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
    const Pronouns = ["n", "k", "w", "n", "k", "k", "w"];
    const AnimateFinals = ["", "", "a", "na", "na", "w8", "w8"];
    const InanimateFinals = ["", "", "", "na", "na", "w8", "w8"];
    const AnimatePluralFinals = ["ak", "ak", "", "wak", "wak", "k", ""];
    const InanimatePluralFinals = ["al", "al", "al", "wal", "wal", "l", "l"];

    let extractFinal = (context, word, i) =>
    {
        let possibleContexts = [];
        if ( endsWithIgnoreCase(word, AnimateFinals[i] + AnimatePluralFinals[i]) )
        {
            let newContext = context.clone();
            newContext.isPlural = true;
            newContext.animacy = Animacy.ANIMATE;
            newContext.word = sliceEnd(word, (AnimateFinals[i] + AnimatePluralFinals[i]).length);
            newContext.person = i+1;
            newContext.log();
            possibleContexts.push(newContext);
        }
        if ( endsWithIgnoreCase(word, AnimateFinals[i]) )
        {
            let newContext = context.clone();            
            newContext.word = sliceEnd(word, (AnimateFinals[i]).length);            
            newContext.isPlural = false;
            newContext.animacy = Animacy.ANIMATE;
            newContext.person = i+1;   
            newContext.log();                     
            possibleContexts.push(newContext);           
        }
        if ( endsWithIgnoreCase(word, InanimateFinals[i] + InanimatePluralFinals[i]) )
        {
            let newContext = context.clone();             
            newContext.word = sliceEnd(word, (InanimateFinals[i] + InanimatePluralFinals[i]).length);
            newContext.isPlural = true;
            newContext.animacy = Animacy.INANIMATE;
            newContext.person = i+1; 
            newContext.log();                       
            possibleContexts.push(newContext);                        
        }
        if ( endsWithIgnoreCase(word, InanimateFinals[i]) )
        {
            let newContext = context.clone();             
            newContext.word = sliceEnd(word, (InanimateFinals[i]).length);            
            newContext.isPlural = false;
            newContext.animacy = Animacy.INANIMATE;
            newContext.person = i+1;
            newContext.log();            
            possibleContexts.push(newContext);                     
        } 
        return possibleContexts;
    };

    let extractPronoun = (context) =>        
    {
        let possibleContexts = [];
        for (let i = 0; i < Pronouns.length; i++) 
        {
            if ( startsWithIgnoreCase(context.word, Pronouns[i] + 'd') )
            {
                let temp = context.word.slice(2);
                if ( startsWithVowel(temp) )
                {             
                    let newContext = context.clone();
                    newContext.word = temp;
                    possibleContexts = possibleContexts.concat(extractFinal(newContext, temp, i));
                }
            }
            if (startsWithIgnoreCase(context.word, Pronouns[i]) )
            {
                let temp = context.word.slice(1);
                if ( !startsWithVowel(temp) )
                {                
                    let newContext = context.clone();
                    newContext.word = temp;              
                    possibleContexts = possibleContexts.concat(extractFinal(newContext, temp, i));
                }
            }
        }
        return possibleContexts;
    }

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

    let result = context.word;
    function analyzeCases()
    {
        let possibleContexts = extractPronoun(context);
        console.log(possibleContexts.length);
        for ( let possibleContext of possibleContexts )
        {
            for ( let endCase of endCases )
            {                
                const [success, word, person] = endCase(possibleContext.word);
                if ( success )
                {                
                    let entry = context.dictionary.findEntry(Dictionary.ABENAKI, word);
                    if ( entry != null )
                    {
                        //context = possibleContext;
                        context.Animacy = possibleContext.Animacy;
                        context.isPlural = possibleContext.isPlural;
                        context.isLocative = possibleContext.isLocative;
                        context.person = possibleContext.person;
                        context.word = word;
                        context.isPossessive = true;
                        context.entry = entry;
                        return word;
                    }
                }       
            }
        }
    }     

    return analyzeCases();
}

export function extract(context, config)
{
    let results = [];

    console.log("Extract " + context.word);
    console.log(context);    
    let word = context.word.toLowerCase();
    for (const configEntry of config.entries ) 
    {
        if (word.startsWith(configEntry.prefix) && word.endsWith(configEntry.suffix)) 
        {
            let stripped = word.slice(configEntry.prefix.length, word.length - configEntry.suffix.length);
            console.log("Stripped " + stripped); 
            let reconstructed = configEntry.reconstruction.prefix + stripped + configEntry.reconstruction.suffix;
            console.log("Reconstructed " + reconstructed);  
            
            let dictEntry = context.dictionary.findEntry(Dictionary.ABENAKI, reconstructed);
            if ( dictEntry != null )
            {
                let newContext = context.clone();
                newContext.entry = dictEntry;
                for ( const annotation in configEntry.annotations )
                {
                    newContext[annotation] = configEntry.annotations[annotation];
                }
                newContext.word = reconstructed; 
                console.log(newContext);                
                results.push(newContext);
            }   
        }
    }

    console.log("Extract Results: " + results);
    console.log("Extract " + context.word + " End");
    
    return results;
}
