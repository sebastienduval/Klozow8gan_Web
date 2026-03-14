import { degeneratePlural } from "./modules/degenerator.js";
import { DegenerationContext } from "./modules/degenerator.js";
import { Dictionary } from "./modules/dictionary.js";

function Translate()
{    
    let context = new DegenerationContext(new Dictionary(dictionary), document.getElementById("Input").value);
    document.getElementById("translation").innerHTML = degeneratePlural(context);
}
    
document.getElementById('translate-button').addEventListener('click', Translate);
