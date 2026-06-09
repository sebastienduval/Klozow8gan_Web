import { extractPluralAffix, extractLocativeAffix, extractPossessiveAffix, extract, ExtractionContext } from "./affix_extractor.js";
import { generatePossessiveAffix, generateVerbAffix, generateEveryVerbAffix } from "./affix_generator.js";
import { Animacy } from "./animacy.js";
import { Person } from "./person.js";
import { Dictionary } from "./dictionary.js";
import { present_independant } from "./present_independant.js";
import { VerbalOrder } from "./verbal_order.js"
import { VerbalTense } from "./verbal_tense.js";

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
        let context = new ExtractionContext(dict, 'Awasosak');      
        assert.equal(extractPluralAffix(context), "Awasos");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);
      });

      it("Phanemok -> Phanem + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Phanemok');
        assert.equal(extractPluralAffix(context), "Phanem");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Alaskanak -> Alaskana + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Alaskanak');      
        assert.equal(extractPluralAffix(context), "Alaskana");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      
      it("Mskwamagok -> Mskwamagw + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Mskwamagok');      
        assert.equal(extractPluralAffix(context), "Mskwamagw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Pabaskok -> Pabaskw + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Pabaskok');      
        assert.equal(extractPluralAffix(context), "Pabaskw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);      
      });

      it("Aasazijik -> Aasazit + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Aasazijik');      
        assert.equal(extractPluralAffix(context), "Aasazit");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.ANIMATE);
      });
    });
    describe("Inanimé", () => {
      it("Klh8ganal -> Klh8gan + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Klh8ganal');      
        assert.equal(extractPluralAffix(context), "Klh8gan");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      });   
      it("Satal -> Sata + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Satal');      
        assert.equal(extractPluralAffix(context), "Sata");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      }); 
      it("Wswadagenal -> Wswadagen + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Wswadagenal');      
        assert.equal(extractPluralAffix(context), "Wswadagen");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      });
      it("8kolhaïgamikol -> 8kolhaïgamikw + [Pluriel]", () => {
        let context = new ExtractionContext(dict, '8kolhaïgamikol');      
        assert.equal(extractPluralAffix(context), "8kolhaïgamikw");
        assert.equal(context.isPlural, true);
        assert.equal(context.animacy, Animacy.INANIMATE);      
      }); 
      it("Atalipimekil -> Atalipimek + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Atalipimekil');      
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
        let context = new ExtractionContext(dict, 'Sibok');      
        assert.equal(extractLocativeAffix(context), "Sibo");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });
      it("Abazik -> Abazi + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Abazik');      
        assert.equal(extractLocativeAffix(context), "Abazi");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });    
      it("Ndozek -> Ndoz + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Ndozek');      
        assert.equal(extractLocativeAffix(context), "Ndoz");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      }); 
      it("Phanemok -> Phanem + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Phanemok');  
        extractLocativeAffix(context);
        console.log(context);            
        assert.equal(extractLocativeAffix(context), "Phanem");      
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);    
      });  
      it("Mdawagenok -> Mdawagen + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Mdawagenok');      
        assert.equal(extractLocativeAffix(context), "Mdawagen");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Agaskok -> Agaskw + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Agaskok');      
        assert.equal(extractLocativeAffix(context), "Agaskw");
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Wanibagok -> Wanibagw + [Locatif]", () => {
        let context = new ExtractionContext(dict, 'Wanibagok');      
        assert.equal(extractLocativeAffix(context), "Wanibagw");  
        //assert.equal(context.isPlural, false);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      });
    });
    describe("Pluriel", () => {
      it("Siboikok -> Sibo + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Siboikok');   
        assert.equal(extractLocativeAffix(context), "Sibo");
        assert.equal(context.isPlural, true);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });
      it("Abaziikok -> Abazi + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Abaziikok');      
        assert.equal(extractLocativeAffix(context), "Abazi");
        //assert.equal(context.isPlural, false);      
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.INANIMATE);
      });    
      it("Ndozikok -> Ndoz + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Ndozikok');      
        assert.equal(extractLocativeAffix(context), "Ndoz");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      }); 
      it("Phanemikok -> Phanem + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Phanemikok');  
        extractLocativeAffix(context);
        console.log(context);            
        assert.equal(extractLocativeAffix(context), "Phanem");      
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);    
      });  
      it("Mdawagenikok -> Mdawagen + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Mdawagenikok');      
        assert.equal(extractLocativeAffix(context), "Mdawagen");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Agaskwikok -> Agaskw + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Agaskwikok');      
        assert.equal(extractLocativeAffix(context), "Agaskw");
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);      
      });
      it("Wanibagwikok -> Wanibagw + [Locatif] + [Pluriel]", () => {
        let context = new ExtractionContext(dict, 'Wanibagwikok');      
        assert.equal(extractLocativeAffix(context), "Wanibagw");  
        assert.equal(context.isPlural, true);
        assert.equal(context.isLocative, true);
        //assert.equal(context.animacy, Animacy.ANIMATE);
      });      
    });        
  });

  describe("Le possessif du nom", () => 
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
                let context = new ExtractionContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word);
                if ( (context.person != Person.ThirdSingular) 
                  && (context.person != Person.ThirdPlural) )
                {
                  assert.equal(context.isPlural, false);
                }
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
                let context = new ExtractionContext(dict, results[i]);      
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
                let context = new ExtractionContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                //assert.equal(context.animacy, Animacy.INANIMATE);
                assert.equal(context.isPossessive, true);
                assert.equal(context.person, i+1);  
              });
            }
          });
          describe(word + " pluriel", () => 
          {
            let results = generatePossessiveAffix(word, false, true);
            for ( let i = 0; i < results.length; i++ )
            {
              it(results[i] + " -> " + word + " + [Possessif] + [Plural]", () => {
                let context = new ExtractionContext(dict, results[i]);      
                assert.equal(extractPossessiveAffix(context), word); 
                //assert.equal(context.animacy, Animacy.INANIMATE);                
                assert.equal(context.isPossessive, true);
                assert.equal(context.isPlural, true);                
                assert.equal(context.person, i+1);  
              });
            }
          });           
        }                 
    });
  });

  describe("Les verbes", () => 
  {
    function DoTest(dict, root, animacy, order, tense, isPlural, isDefinite, isNegative)
    {
      for ( let test of generateEveryVerbAffix(root, animacy, order, tense, isPlural, isDefinite, isNegative) )
      {        
        it (test, () => 
        {  
          let context = new ExtractionContext(dict, test);    
          let results = extract(context, present_independant);
          assert.equal(results.length, 1);
          assert.equal(results[0].word, 
            generateVerbAffix(root, 0, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, false));
        });
      }        
    }

    describe("VAI", () => 
    { 
      describe("Patron en A", () => 
      {
        describe("Ordre indépendant", () => 
        {   
          let dict = new Dictionary([
            {"French":"Je travaille","Type":"VAI;1;s;Présent","Abenaki":"Nd'aloka","Meta":"Verbe"}
          ]);
          
          let root = 'aloka';          
          describe("Affirmatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, false);
          });
          describe("Négatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);     
          });
        });
      });
      describe("Patron en I", () => 
      {        
        describe("Ordre indépendant", () => 
        {               
          let dict = new Dictionary([
            {"French":"Je mange","Type":"VAI;1;s;Présent","Abenaki":"N'michi","Meta":"Verbe"}
          ]);       
          
          let root = 'michi';
          describe("Affirmatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, false);
          });
          describe("Négatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);     
          });
        });
      });
      describe("Patron en Ï", () => 
      { 
        describe("Ordre indépendant", () => 
        {               
          let dict = new Dictionary([
            {"French":"	Je suis ","Type":"VAI;1;s;Présent","Abenaki":"Nd'aï","Meta":"Verbe"}
          ]);       
          
          let root = 'aï';
          describe("Affirmatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, false);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, false);
          });
          describe("Négatif", () => 
          {
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
            DoTest(dict, root, undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);     
          });
        });        
      });
    });
    describe("VTA", () => 
    {
      describe("Patron en 8", () => 
      {
        describe("Ordre indépendant", () => 
        {   
          let dict = new Dictionary([
            {"French":"	J'observe quelquechose (A) ou quelqu'un","Type":"VTA;1;s;Présent","Abenaki":"N'namih8","Meta":"Verbe"}
          ]);        
          let root = 'namih8';
          let animacy = Animacy.ANIMATE;  
          describe("Indéfini", () => 
          {
            let isDefinite = false;
            describe("Affirmatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, false);
            });
            describe("Négatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, true);     
            });
          });          
          describe("Défini", () => 
          {
            let isDefinite = true;
            describe("Singulier", () =>
            {           
              let isPlural = false; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });
            describe("Pluriel", () =>
            {            
              let isPlural = true; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });            
          });          
        });        
      });      
    });
    describe("VTI", () => 
    {
        let animacy = Animacy.INANIMATE;       
      describe("Patron en O", () => 
      {       
        describe("Ordre indépendant", () => 
        {   
          let dict = new Dictionary([
            {"French":"J'attends quelquechose (I)","Type":"VTI;1;s;Présent","Abenaki":"nd'askawito","Meta":"Verbe"}
          ]);        
          let root = 'askawito';
          describe("Indéfini", () => 
          {
            let isDefinite = false;
            describe("Affirmatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, false);
            });
            describe("Négatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, true);     
            });
          });          
          describe("Défini", () => 
          {
            let isDefinite = true;
            describe("Singulier", () =>
            {           
              let isPlural = false; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });
            describe("Pluriel", () =>
            {            
              let isPlural = true; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });            
          });          
        });        
      });
      describe("Patron en M", () => 
      {       
        describe("Ordre indépendant", () => 
        {   
          let dict = new Dictionary([
            {"French":"	Je possède quelquechose (I).","Type":"VTI;1;s;Présent","Abenaki":"n'waj8nem","Meta":"Verbe"}
          ]);        
          let root = 'waj8nem';
          describe("Indéfini", () => 
          {
            let isDefinite = false;
            describe("Affirmatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, false);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, false);
            });
            describe("Négatif", () => 
            {
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, isDefinite, true);
              DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, isDefinite, true);     
            });
          });          
          describe("Défini", () => 
          {
            let isDefinite = true;
            describe("Singulier", () =>
            {           
              let isPlural = false; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });
            describe("Pluriel", () =>
            {            
              let isPlural = true; 
              describe("Affirmatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, false);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, false);
              });
              describe("Négatif", () => 
              {
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, isPlural, isDefinite, true);
                DoTest(dict, root, animacy, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, isPlural, isDefinite, true);     
              });
            });            
          });          
        });        
      });           
    });         
  });
});