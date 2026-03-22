import { extractPluralAffix, extractLocativeAffix, extractPossessiveAffix, DegenerationContext } from "./affix_extractor.js";
import { generatePossessiveAffix } from "./affix_generator.js";
import { Animacy } from "./animacy.js";
import { Dictionary } from "./dictionary.js";

var assert = chai.assert;

describe("Extraction d'affixes", () => 
{
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
      it("Awasosak -> Awasos + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Awasosak');      
        assert.equal(extractPluralAffix(context), "Awasos");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);
      });

      it("Phanemok -> Phanem + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Phanemok');
        assert.equal(extractPluralAffix(context), "Phanem");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Alaskanak -> Alaskana + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Alaskanak');      
        assert.equal(extractPluralAffix(context), "Alaskana");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      
      it("Mskwamagok -> Mskwamagw + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Mskwamagok');      
        assert.equal(extractPluralAffix(context), "Mskwamagw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Pabaskok -> Pabaskw + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Pabaskok');      
        assert.equal(extractPluralAffix(context), "Pabaskw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Aasazijik -> Aasazit + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Aasazijik');      
        assert.equal(extractPluralAffix(context), "Aasazit");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);
      });
    });
    describe("Inanimé", () => {
      it("Klh8ganal -> Klh8gan + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Klh8ganal');      
        assert.equal(extractPluralAffix(context), "Klh8gan");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      });   
      it("Satal -> Sata + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Satal');      
        assert.equal(extractPluralAffix(context), "Sata");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      }); 
      it("Wswadagenal -> Wswadagen + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Wswadagenal');      
        assert.equal(extractPluralAffix(context), "Wswadagen");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      });
      it("8kolhaïgamikol -> 8kolhaïgamikw + [Pluriel]", () => {
        let context = new DegenerationContext(dict, '8kolhaïgamikol');      
        assert.equal(extractPluralAffix(context), "8kolhaïgamikw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      }); 
      it("Atalipimekil -> Atalipimek + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Atalipimekil');      
        assert.equal(extractPluralAffix(context), "Atalipimek");
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
      {"French":"Drapeau","Type":"NI","Abenaki":"Mdawagen","Meta":"Nom;Objet"},  
      {"French":"Marmotte","Type":"NA","Abenaki":"Agaskw","Meta":"Nom;Objet"},  
      {"French":"Feuille d'arbre","Type":"NI","Abenaki":"Wanibagw","Meta":"Nom;Objet"}    
    ]);    
    describe("Singulier", () => {
      it("Sibok -> Sibo + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Sibok');      
        assert.equal(extractLocativeAffix(context), "Sibo");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });
      it("Abazik -> Abazi + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Abazik');      
        assert.equal(extractLocativeAffix(context), "Abazi");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });    
      it("Ndozek -> Ndoz + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Ndozek');      
        assert.equal(extractLocativeAffix(context), "Ndoz");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      }); 
      it("Phanemok -> Phanem + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Phanemok');  
        extractLocativeAffix(context);
        console.log(context);            
        assert.equal(extractLocativeAffix(context), "Phanem");      
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);    
      });  
      it("Mdawagenok -> Mdawagen + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Mdawagenok');      
        assert.equal(extractLocativeAffix(context), "Mdawagen");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Agaskok -> Agaskw + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Agaskok');      
        assert.equal(extractLocativeAffix(context), "Agaskw");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Wanibagok -> Wanibagw + [Locatif]", () => {
        let context = new DegenerationContext(dict, 'Wanibagok');      
        assert.equal(extractLocativeAffix(context), "Wanibagw");  
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      });
    });
    describe("Pluriel", () => {
      it("Siboikok -> Sibo + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Siboikok');   
        assert.equal(extractLocativeAffix(context), "Sibo");
        assert.equal(context.isPlural, true);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });
      it("Abaziikok -> Abazi + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Abaziikok');      
        assert.equal(extractLocativeAffix(context), "Abazi");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });    
      it("Ndozikok -> Ndoz + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Ndozikok');      
        assert.equal(extractLocativeAffix(context), "Ndoz");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      }); 
      it("Phanemikok -> Phanem + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Phanemikok');  
        extractLocativeAffix(context);
        console.log(context);            
        assert.equal(extractLocativeAffix(context), "Phanem");      
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);    
      });  
      it("Mdawagenikok -> Mdawagen + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Mdawagenikok');      
        assert.equal(extractLocativeAffix(context), "Mdawagen");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Agaskwikok -> Agaskw + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Agaskwikok');      
        assert.equal(extractLocativeAffix(context), "Agaskw");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Wanibagwikok -> Wanibagw + [Locatif] + [Pluriel]", () => {
        let context = new DegenerationContext(dict, 'Wanibagwikok');      
        assert.equal(extractLocativeAffix(context), "Wanibagw");  
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      });      
    });        
  });

  describe("Le posessif du nom", () => 
  {
    describe("Animé", () => 
      {
        let dict = new Dictionary([
          {"French":"Ours","Type":"NA","Abenaki":"awasos","Meta":"Nom;Objet"},
          {"French":"Être humain","Type":"NA","Abenaki":"aln8ba","Meta":"Nom;Objet"},
          {"French":"Femme","Type":"NA","Abenaki":"phanem","Meta":"Nom;Objet"}, 
          {"French":"Marmotte","Type":"NA","Abenaki":"agaskw","Meta":"Nom;Objet"},  
          {"French":"Saumon","Type":"NA","Abenaki":"mskwamagw","Meta":"Nom;Objet"},
          {"French":"Frêne blanc","Type":"NA","Abenaki":"8gmakw","Meta":"Nom;Objet"},           
        ]);  

        for ( let entry of dict.dictionary )
        {
          let word = entry["Abenaki"];
          describe(word + " singulier", () => 
          {
            let results = generatePossessiveAffix(word, true, false);
            for ( let i = 0; i < results.length; i++ )
            {
              it(results[i] + " -> " + word + " + [Possessif]", () => {
                let context = new DegenerationContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                assert.equal(context.isPossessive, true);
                assert.equal(context.person, i+1);  
              });
            }
          }); 
          describe(word + " pluriel", () => 
          {
            let results = generatePossessiveAffix(word, true, true);
            for ( let i = 0; i < results.length; i++ )
            {
              it(results[i] + " -> " + word + " + [Possessif] + [Plural]", () => {
                let context = new DegenerationContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                assert.equal(context.isPossessive, true);
                assert.equal(context.isPlural, true);                
                assert.equal(context.person, i+1);  
              });
            }
          });          
        }       
    });  
    describe("Inanimé", () => {
        let dict = new Dictionary(
        [
          {"French":"Bleuet","Type":"NI","Abenaki":"sata","Meta":"Nom;Objet"},        
          {"French":"Livre","Type":"NI","Abenaki":"awikhigan","Meta":"Nom;Objet"},
          {"French":"Drapeau","Type":"NI","Abenaki":"mdawagen","Meta":"Nom;Objet"},    
          {"French":"Feuille d'arbre","Type":"NI","Abenaki":"wanibagw","Meta":"Nom;Objet"},
        ]);

        for ( let entry of dict.dictionary )
        {
          let word = entry["Abenaki"];
          describe(word + " singulier", () => 
          {
            let results = generatePossessiveAffix(word, false, false);
            for ( let i = 0; i < results.length; i++ )
            {
              it(results[i] + " -> " + word + " + [Possessif]", () => {
                let context = new DegenerationContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                assert.equal(context.isPossessive, true);
                assert.equal(context.person, i+1);  
              });
            }
          });
          describe(word + " pluriel", () => 
          {
            let results = generatePossessiveAffix(word, false, false);
            for ( let i = 0; i < results.length; i++ )
            {
              it(results[i] + " -> " + word + " + [Possessif] + [Plural]", () => {
                let context = new DegenerationContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                assert.equal(context.isPossessive, true);
                assert.equal(context.isPlural, true);                
                assert.equal(context.person, i+1);  
              });
            }
          });           
        }                 
    });
  }); 
});