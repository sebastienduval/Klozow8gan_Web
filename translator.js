import { extractPluralAffix, extractLocativeAffix, extractPossessiveAffix, ExtractionContext, extract } from "./modules/affix_extractor.js";
import { Dictionary } from "./modules/dictionary.js";
import { verbConfig } from "./modules/verb_config.js";
import { nthToken,replaceChar } from "./modules/string.js";
import { isVerb } from "./modules/verb_type.js";

function Translate()
{    
    document.getElementById("translation").innerHTML = "";

    let text = document.getElementById("Input").value;
    text = replaceChar(text, '’', "'");
    let words = text.split(/([ .,!?])|\s+/)
                   .filter(Boolean)
                   .map(t => t.trim())
                   .filter(t => t !== "");

    let dict = new Dictionary(dictionary);
    for ( let word of words )
    {
        word = word.toLowerCase();
        let context = new ExtractionContext(dict, word);
        context.entry = dict.findEntry(Dictionary.ABENAKI, word);
        
        let result = context;
        if ( context.entry == null )
        {
            extractPluralAffix(context);
            result = context;
            console.log("Try extract plural affix for " + word + "(" + (context.entry != null? "success" : "failure") + ")");            
        }

        if ( context.entry == null )
        {
            extractLocativeAffix(context);
            result = context;         
            console.log("Try extract locative affix for " + word + "(" + (context.entry != null? "success" : "failure") + ")");
        }
        
        if ( context.entry == null )
        {
            extractPossessiveAffix(context);
            result = context;            
            console.log("Try extract possessive affix for " + word + "(" + (context.entry != null? "success" : "failure") + ")");
        }
        
        if ( context.entry == null || isVerb(result.entry.Type) )
        {
            let results = extract(context, verbConfig);             
            result = results.length > 0 ? results[0] : null;
            console.log("Try extract verb affixes for " + word + "(" + (results.length > 0? "success" : "failure") + ")");
        }

        let resultMessage = "";
        if ( result != null )
        {
            let temp = result.entry[Dictionary.FRENCH];
            resultMessage = temp;
            resultMessage += " (";
                    
            let wordType = nthToken(result.entry.Type, ";", 0);
            if ( result.isVerb )
            {
                resultMessage += result.order.toStringShort(); + "-";    
                resultMessage += "[" + wordType;    
                resultMessage += result.isDefinite?"d":"i" + ";";                               
                resultMessage += result.person.toStringShort();
                resultMessage += result.tense.toLocaleLowerCase() + "]";

            }
            else
            {
                resultMessage += "[" + wordType;
                resultMessage += "]";                
                resultMessage +=
                    (result.isLocative ? " (locatif)" : "") 
                    + (result.isPlural ? " (pluriel)" : "") 
                    + (result.isPossessive ? " (possessif)" : "") 
                    + (result.person ? " (personne " + result.person + ")" : "");
            }
            resultMessage += ")";
        }
        else
        {
            resultMessage = word;
        }
        document.getElementById("translation").innerHTML += resultMessage + " | ";
    }

    console.log(words);
}
    
document.getElementById('translate-button').addEventListener('click', Translate);