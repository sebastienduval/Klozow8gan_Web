import { degeneratePlural } from "./modules/degenerator.js";
import { DegenerationContext } from "./modules/degenerator.js";
import { Dictionary } from "./modules/dictionary.js";

function Translate()
{    
    let context = new DegenerationContext(new Dictionary(dictionary), document.getElementById("Input").value);

    let resultMessage = degeneratePlural(context);
    if ( context.entry != null )
    {
        resultMessage += " (" + context.entry[Dictionary.FRENCH] + ")" + " (" + context.animacy + ")" + " (" + (context.isPlural ? "Pluriel" : "Singulier") + ")";
    }
    document.getElementById("translation").innerHTML = resultMessage;    
}
    
document.getElementById('translate-button').addEventListener('click', Translate);
