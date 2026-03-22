import { degeneratePlural, degenerateLocative, DegenerationContext } from "./degenerator.js";
import { Animacy } from "./animacy.js";
import { Dictionary } from "./dictionary.js";

var assert = chai.assert;

describe("Le pluriel du nom", () => {
  let dict = new Dictionary(
  [
    {"French":"Ours","Type":"NA","Abenaki":"Awasos","Meta":"Nom;Objet"},
    {"French":"Femme","Type":"NA","Abenaki":"Phanem","Meta":"Nom;Objet"},
    {"French":"Carcajou","Type":"NA","Abenaki":"Alaskana","Meta":"Nom;Objet"},
    {"French":"Saumon","Type":"NA","Abenaki":"Mskwamagw","Meta":"Nom;Objet"},
    {"French":"Sangsue","Type":"NA","Abenaki":"Pabaskw","Meta":"Nom;Objet"},
    {"French":"Verre","Type":"NA","Abenaki":"Aasazit","Meta":"Nom;Objet"},
    {"French":"Porte","Type":"NA","Abenaki":"Klh8gan","Meta":"Nom;Objet"},
    {"French":"Bleuet","Type":"NA","Abenaki":"Sata","Meta":"Nom;Objet"},
    {"French":"Fourrure","Type":"NA","Abenaki":"Wswadagen","Meta":"Nom;Objet"},
    {"French":"Magasin","Type":"NA","Abenaki":"8kolhaïgamikw","Meta":"Nom;Objet"},
    {"French":"Restaurant","Type":"NA","Abenaki":"Atalipimek","Meta":"Nom;Objet"},      
  ]);
  describe("Animé", () => {
    it("Awasosak -> Awasos + isPlural", () => {
      let context = new DegenerationContext(dict, 'Awasosak');      
      assert.equal(degeneratePlural(context), "Awasos");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);
    });

    it("Phanemok -> Phanem + isPlural", () => {
      let context = new DegenerationContext(dict, 'Phanemok');      
      assert.equal(degeneratePlural(context), "Phanem");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);      
    });

    it("Alaskanak -> Alaskana + isPlural", () => {
      let context = new DegenerationContext(dict, 'Alaskanak');      
      assert.equal(degeneratePlural(context), "Alaskana");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);      
    });
    
    it("Mskwamagok -> Mskwamagw + isPlural", () => {
      let context = new DegenerationContext(dict, 'Mskwamagok');      
      assert.equal(degeneratePlural(context), "Mskwamagw");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);      
    });

    it("Pabaskok -> Pabaskw + isPlural", () => {
      let context = new DegenerationContext(dict, 'Pabaskok');      
      assert.equal(degeneratePlural(context), "Pabaskw");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);      
    });

    it("Aasazijik -> Aasazit + isPlural", () => {
      let context = new DegenerationContext(dict, 'Aasazijik');      
      assert.equal(degeneratePlural(context), "Aasazit");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.ANIMATE);
    });
  });
  describe("Inanimé", () => {
    it("Klh8ganal -> Klh8gan + isPlural", () => {
      let context = new DegenerationContext(dict, 'Klh8ganal');      
      assert.equal(degeneratePlural(context), "Klh8gan");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.INANIMATE);      
    });   
    it("Satal -> Sata + isPlural", () => {
      let context = new DegenerationContext(dict, 'Satal');      
      assert.equal(degeneratePlural(context), "Sata");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.INANIMATE);      
    }); 
    it("Wswadagenal -> Wswadagen + isPlural", () => {
      let context = new DegenerationContext(dict, 'Wswadagenal');      
      assert.equal(degeneratePlural(context), "Wswadagen");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.INANIMATE);      
    });
    it("8kolhaïgamikol -> 8kolhaïgamikw + isPlural", () => {
      let context = new DegenerationContext(dict, '8kolhaïgamikol');      
      assert.equal(degeneratePlural(context), "8kolhaïgamikw");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.INANIMATE);      
    }); 
    it("Atalipimekil -> Atalipimek + isPlural", () => {
      let context = new DegenerationContext(dict, 'Atalipimekil');      
      assert.equal(degeneratePlural(context), "Atalipimek");
      assert.equal(context.isPlural, true);
      assert.equal(context.animacy, Animacy.INANIMATE);
    });
  });  
});


describe("Le locatif du nom", () => 
{
  let dict = new Dictionary(  [
    {"French":"Rivière","Type":"NA","Abenaki":"Sibo","Meta":"Nom;Objet"},
    {"French":"Arbre","Type":"NA","Abenaki":"Abazi","Meta":"Nom;Objet"},    
    {"French":"Ma fille","Type":"NA","Abenaki":"Ndoz","Meta":"Nom;Objet"},
    {"French":"Femme","Type":"NA","Abenaki":"Phanem","Meta":"Nom;Objet"},
    {"French":"Mdawagenok","Type":"NA","Abenaki":"Mdawagen","Meta":"Nom;Objet"},  
    {"French":"Agaskok","Type":"NA","Abenaki":"Agaskw","Meta":"Nom;Objet"},  
    {"French":"Wanibagok","Type":"NA","Abenaki":"Wanibagw","Meta":"Nom;Objet"}    
  ]);    
  describe("Singulier", () => {
    it("Sibok -> Sibo + isLocative", () => {
      let context = new DegenerationContext(dict, 'Sibok');      
      assert.equal(degenerateLocative(context), "Sibo");
      //assert.equal(context.isPlural, false);      
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.INANIMATE);
    });
    it("Abazik -> Abazi + isLocative", () => {
      let context = new DegenerationContext(dict, 'Abazik');      
      assert.equal(degenerateLocative(context), "Abazi");
      //assert.equal(context.isPlural, false);      
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.INANIMATE);
    });    
    it("Ndozek -> Ndoz + isLocative", () => {
      let context = new DegenerationContext(dict, 'Ndozek');      
      assert.equal(degenerateLocative(context), "Ndoz");
      //assert.equal(context.isPlural, false);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);
    }); 
    it("Phanemok -> Phanem + isLocative", () => {
      let context = new DegenerationContext(dict, 'Phanemok');  
      degenerateLocative(context);
      console.log(context);            
      assert.equal(degenerateLocative(context), "Phanem");      
      //assert.equal(context.isPlural, false);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);    
    });  
    it("Mdawagenok -> Mdawagen + isLocative", () => {
      let context = new DegenerationContext(dict, 'Mdawagenok');      
      assert.equal(degenerateLocative(context), "Mdawagen");
      //assert.equal(context.isPlural, false);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);      
    });
    it("Agaskok -> Agaskw + isLocative", () => {
      let context = new DegenerationContext(dict, 'Agaskok');      
      assert.equal(degenerateLocative(context), "Agaskw");
      //assert.equal(context.isPlural, false);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);      
    });
    it("Wanibagok -> Wanibagw + isLocative", () => {
      let context = new DegenerationContext(dict, 'Wanibagok');      
      assert.equal(degenerateLocative(context), "Wanibagw");  
      //assert.equal(context.isPlural, false);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);
    });
  });
  describe("Pluriel", () => {
    it("Siboikok -> Sibo + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Siboikok');   
      assert.equal(degenerateLocative(context), "Sibo");
      assert.equal(context.isPlural, true);      
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.INANIMATE);
    });
    it("Abaziikok -> Abazi + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Abaziikok');      
      assert.equal(degenerateLocative(context), "Abazi");
      //assert.equal(context.isPlural, false);      
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.INANIMATE);
    });    
    it("Ndozikok -> Ndoz + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Ndozikok');      
      assert.equal(degenerateLocative(context), "Ndoz");
      assert.equal(context.isPlural, true);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);
    }); 
    it("Phanemikok -> Phanem + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Phanemikok');  
      degenerateLocative(context);
      console.log(context);            
      assert.equal(degenerateLocative(context), "Phanem");      
      assert.equal(context.isPlural, true);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);    
    });  
    it("Mdawagenikok -> Mdawagen + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Mdawagenikok');      
      assert.equal(degenerateLocative(context), "Mdawagen");
      assert.equal(context.isPlural, true);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);      
    });
    it("Agaskwikok -> Agaskw + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Agaskwikok');      
      assert.equal(degenerateLocative(context), "Agaskw");
      assert.equal(context.isPlural, true);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);      
    });
    it("Wanibagwikok -> Wanibagw + isLocative + isPLural", () => {
      let context = new DegenerationContext(dict, 'Wanibagwikok');      
      assert.equal(degenerateLocative(context), "Wanibagw");  
      assert.equal(context.isPlural, true);
      assert.equal(context.isLocative, true);
      //assert.equal(context.animacy, Animacy.ANIMATE);
    });      
  });        
});