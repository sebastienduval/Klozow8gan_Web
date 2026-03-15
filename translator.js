import { degeneratePlural } from "./modules/degenerator.js";
import { degenerateLocative } from "./modules/degenerator.js";
import { DegenerationContext } from "./modules/degenerator.js";
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
            console.log("Try degenerate plural.");
            degeneratePlural(context);
        }

        if ( context.entry == null )
        {
            console.log("Try degenerate locative.");
            degenerateLocative(context);            
        }        

        let resultMessage = "";
        if ( context.entry != null )
        {
            let temp = context.entry[Dictionary.FRENCH];
            resultMessage = temp + (context.isLocative ? " (locatif)" : "") + (context.isPlural ? " (pluriel)" : "");
        }
        else
        {
            resultMessage = word;
        }
        document.getElementById("translation").innerHTML += resultMessage + " | ";
    }
}
    
document.getElementById('translate-button').addEventListener('click', Translate);
