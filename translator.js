import { extractPluralAffix, extractLocativeAffix, extractPossessiveAffix, DegenerationContext } from "./modules/affix_extractor.js";
import { Dictionary } from "./modules/dictionary.js";

function Translate()
{    
    document.getElementById("translation").innerHTML = "";

    let text = document.getElementById("Input").value;
    let words = text.split(/\s+/);

    let dict = new Dictionary(dictionary);
    for ( let word of words )
    {
        console.log(word);
        let context = new DegenerationContext(dict, word);
        context.entry = dict.findEntry(Dictionary.ABENAKI, word);
        if ( context.entry == null )
        {
            extractPluralAffix(context);
            console.log("Try extract plural affix(" + (context.entry != null? "success" : "failure") + ")");            
        }

        if ( context.entry == null )
        {
            extractLocativeAffix(context);             
            console.log("Try extract locative affix (" + (context.entry != null? "success" : "failure") + ")");
        }
        
        if ( context.entry == null )
        {
            extractPossessiveAffix(context);             
            console.log("Try extract possessive affix (" + (context.entry != null? "success" : "failure") + ")");
        }            

        let resultMessage = "";
        if ( context.entry != null )
        {
            let temp = context.entry[Dictionary.FRENCH];
            resultMessage = temp 
            + (context.isLocative ? " (locatif)" : "") 
            + (context.isPlural ? " (pluriel)" : "") 
            + (context.isPossessive ? " (possessif)" : "") 
            + (context.person ? " (personne " + context.person + ")" : "");
        }
        else
        {
            resultMessage = word;
        }
        document.getElementById("translation").innerHTML += resultMessage + " | ";
    }
}
    
document.getElementById('translate-button').addEventListener('click', Translate);
