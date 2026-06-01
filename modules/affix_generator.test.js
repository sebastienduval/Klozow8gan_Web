import { generatePossessiveAffix, generateVerbAffix } from "./affix_generator.js";
import { Animacy } from "./animacy.js"
import { VerbalOrder } from "./verbal_order.js"
import { VerbalTense } from "./verbal_tense.js";

var assert = chai.assert;

describe("Génération d'affixes", () => 
{
    describe("Le possessif du nom", () => 
    {
        it("Awasos", () =>
        {
            let expected = ["ndawasosem","kdawasosem","wdawasosema","ndawasosemna","kdawasosemna","kdawasosemw8", "wdawasosemw8"];
            let results = generatePossessiveAffix("awasos", true, false);
            for ( let i = 0; i < expected.length; i++ )
            {
                assert.equal(results[i], expected[i]);
            }
        });
    });

    function test(expected, results)
    {
        for ( let i = 0; i < expected.length; i++ )
        {                      
            it(expected[i], () =>
            {
                assert.equal(results[i], expected[i]);
            });
        }
    }

    describe("Conjugaisons", () => 
    {    
        describe("VAI", () => 
        {
            describe("Patron en A", () => 
            { 
                describe("Ordre indépendant", () => 
                {   
                    describe("Indéfini", () => 
                    {       
                        describe("Affirmatif", () => 
                        {         
                            describe("Présent", () => 
                            {   
                                let expected = ["nd'aloka","kd'aloka","aloka","nd'alokabna","kd'alokabna","kd'alokaba", "alokak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, false);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {                     
                                let expected = ["nd'alokab","kd'alokab","alokab","nd'alokabnob","kd'alokabnob","kd'alokab8b", "alokabanik"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, false);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {                     
                                let expected = ["kizi nd'aloka","kizi kd'aloka","kizi aloka","kizi nd'alokabna","kizi kd'alokabna","kizi kd'alokaba", "kizi alokak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, false);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["nd'alokaji","kd'alokaji","alokaji","nd'alokabnaji","kd'alokabnaji","kd'alokabaji", "alokakji"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, false);
                                test(expected, results);
                            });
                            describe("Conditionnel", () => 
                            {   
                                let expected = ["nd'alokaba","kd'alokaba","alokaba","nd'alokabnaba","kd'alokabnaba","kd'alokababa", "alokakba"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, false);
                                test(expected, results);
                            });
                        });
                        describe("Négatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nda nd'alokaw","nda kd'alokaw","nda alokawi","nda nd'alokawbna","nda kd'alokawbna","nda kd'alokawba", "nda alokawiak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {                     
                                let expected = ["nda nd'alokawb","nda kd'alokawb","nda alokawib","nda nd'alokawbnob","nda kd'alokawbnob","nda kd'alokawb8b", "nda alokawibanik"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                                test(expected, results);
                            }); 
                            describe("Présent", () => 
                            {   
                                let expected = ["asma nd'alokaw","asma kd'alokaw","asma alokawi","asma nd'alokawbna","asma kd'alokawbna","asma kd'alokawba", "asma alokawiak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                                test(expected, results);
                            });  
                            describe("Future", () => 
                            {   
                                let expected = ["ndaba nd'alokaw","ndaba kd'alokaw","ndaba alokawi","ndaba nd'alokawbna","ndaba kd'alokawbna","ndaba kd'alokawba", "ndaba alokawiak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                                test(expected, results);
                            });
                            describe("Conditionnel", () => 
                            {   
                                let expected = ["ndaba nd'alokaw","ndaba kd'alokaw","ndaba alokawi","ndaba nd'alokawbna","ndaba kd'alokawbna","ndaba kd'alokawba", "ndaba alokawiak"];
                                let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                                test(expected, results);
                            });                                                                                                                                         
                        });                        
                    });                                                          
                });
            });
            describe("Patron en I et Ï", () => 
            {   
                describe("Ordre indépendant", () => 
                {       
                    describe("Affirmatif", () => 
                    {                       
                        describe("Présent", () =>
                        {
                            let expected = ["n'michi","k'michi","micho","n'michibna","k'michibna","k'michiba", "michoak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                            test(expected, results);
                        });
                        describe("Passé", () => 
                        {                     
                            let expected = ["n'michib","k'michib","michob","n'michibnob","k'michibnob","k'michib8b", "michobanik"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                            test(expected, results);
                        });
                        describe("Passé composé", () => 
                        {                     
                            let expected = ["kizi n'michi","kizi k'michi","kizi micho","kizi n'michibna","kizi k'michibna","kizi k'michiba", "kizi michoak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                            test(expected, results);
                        });
                        describe("Future", () => 
                        {   
                            let expected = ["n'michiji","k'michiji","michoji","n'michibnaji","k'michibnaji","k'michibaji", "michoakji"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                            test(expected, results);
                        });
                        describe("Conditionnel", () => 
                        {   
                            let expected = ["n'michiba","k'michiba","michoba","n'michibnaba","k'michibnaba","k'michibaba", "michoakba"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                            test(expected, results);
                        });
                        describe("Présent", () =>
                        {
                            let expected = ["nd'aï","kd'aï","ao","nd'aïbna","kd'aïbna","kd'aïba", "aoak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                            test(expected, results);
                        });
                        describe("Passé", () =>
                        {
                            let expected = ["nd'aïb","kd'aïb","aob","nd'aïbnob","kd'aïbnob","kd'aïb8b", "aobanik"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                            test(expected, results);
                        });
                        describe("Passé Composé", () =>
                        {
                            let expected = ["kizi nd'aï","kizi kd'aï","kizi ao","kizi nd'aïbna","kizi kd'aïbna","kizi kd'aïba", "kizi aoak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                            test(expected, results);
                        });
                        describe("Future", () =>
                        {
                            let expected = ["nd'aïji","kd'aïji","aoji","nd'aïbnaji","kd'aïbnaji","kd'aïbaji", "aoakji"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                            test(expected, results);
                        });
                        describe("Conditionnel", () =>
                        {
                            let expected = ["nd'aïba","kd'aïba","aoba","nd'aïbnaba","kd'aïbnaba","kd'aïbaba", "aoakba"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                            test(expected, results);
                        });
                    });
                    describe("Négatif", () => 
                    {
                        describe("Présent", () =>
                        {
                            let expected = ["nda n'michiw","nda k'michiw","nda michowi","nda n'michiwbna","nda k'michiwbna","nda k'michiwba", "nda michowiak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                            test(expected, results);
                        });
                        describe("Passé", () => 
                        {                     
                            let expected = ["nda n'michiwb","nda k'michiwb","nda michowib","nda n'michiwbnob","nda k'michiwbnob","nda k'michiwb8b", "nda michowibanik"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                            test(expected, results);
                        });
                        describe("Passé composé", () => 
                        {                     
                            let expected = ["asma n'michiw","asma k'michiw","asma michowi","asma n'michiwbna","asma k'michiwbna","asma k'michiwba", "asma michowiak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                            test(expected, results);
                        });
                        describe("Future", () =>
                        {
                            let expected = ["ndaba n'michiw","ndaba k'michiw","ndaba michowi","ndaba n'michiwbna","ndaba k'michiwbna","ndaba k'michiwba", "ndaba michowiak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                            test(expected, results);
                        });
                        describe("Conditionnel", () =>
                        {
                            let expected = ["ndaba n'michiw","ndaba k'michiw","ndaba michowi","ndaba n'michiwbna","ndaba k'michiwbna","ndaba k'michiwba", "ndaba michowiak"];
                            let results = generateVerbAffix('michi', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                            test(expected, results);
                        });
                        describe("Présent", () =>
                        {
                            let expected = ["nda nd'aïw","nda kd'aïw","nda aowi","nda nd'aïwbna","nda kd'aïwbna","nda kd'aïwba", "nda aowiak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                            test(expected, results);
                        });
                        describe("Passé", () =>
                        {
                            let expected = ["nda nd'aïwb","nda kd'aïwb","nda aowib","nda nd'aïwbnob","nda kd'aïwbnob","nda kd'aïwb8b", "nda aowibanik"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                            test(expected, results);
                        });
                        describe("Passé Composé", () =>
                        {
                            let expected = ["asma nd'aïw","asma kd'aïw","asma aowi","asma nd'aïwbna","asma kd'aïwbna","asma kd'aïwba", "asma aowiak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                            test(expected, results);
                        });
                        describe("Future", () =>
                        {
                            let expected = ["ndaba nd'aïw","ndaba kd'aïw","ndaba aowi","ndaba nd'aïwbna","ndaba kd'aïwbna","ndaba kd'aïwba", "ndaba aowiak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                            test(expected, results);
                        });
                        describe("Conditionnel", () =>
                        {
                            let expected = ["ndaba nd'aïw","ndaba kd'aïw","ndaba aowi","ndaba nd'aïwbna","ndaba kd'aïwbna","ndaba kd'aïwba", "ndaba aowiak"];
                            let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                            test(expected, results);
                        });                                                                                                                                                                                                              
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
                    describe("Indéfini", () => 
                    {       
                        describe("Affirmatif", () => 
                        {
                            describe("Présent", () =>
                            {
                                let expected = ["n'namih8","k'namih8","namiha","n'namih8bna","k'namih8bna","k'namih8ba", "namihak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                                test(expected, results);
                            });
                            describe("Passé", () =>
                            {
                                let expected = ["n'namih8b","k'namih8b","namihab","n'namih8bnob","k'namih8bnob","k'namih8b8b", "namihabanik"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                                test(expected, results);
                            });
                            describe("Passé composé", () =>
                            {
                                let expected = ["kizi n'namih8","kizi k'namih8","kizi namiha","kizi n'namih8bna","kizi k'namih8bna","kizi k'namih8ba", "kizi namihak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                                test(expected, results);
                            });
                            describe("Future", () =>
                            {
                                let expected = ["n'namih8ji","k'namih8ji","namihaji","n'namih8bnaji","k'namih8bnaji","k'namih8baji", "namihakji"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                                test(expected, results);
                            });
                            describe("Conditionnel", () =>
                            {
                                let expected = ["n'namih8ba","k'namih8ba","namihaba","n'namih8bnaba","k'namih8bnaba","k'namih8baba", "namihakba"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                                test(expected, results);
                            });
                        });
                        describe("Négatif", () => 
                        {
                           describe("Présent", () =>
                            {
                                let expected = ["nda n'namih8w","nda k'namih8w","nda namihawi","nda n'namih8wbna","nda k'namih8wbna","nda k'namih8wba", "nda namihawiak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                                test(expected, results);
                            });
                           describe("Passé", () =>
                            {
                                let expected = ["nda n'namih8wb","nda k'namih8wb","nda namihawib","nda n'namih8wbnob","nda k'namih8wbnob","nda k'namih8wb8b", "nda namihawibanik"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                                test(expected, results);
                            });
                           describe("Passé composé", () =>
                            {
                                let expected = ["asma n'namih8w","asma k'namih8w","asma namihawi","asma n'namih8wbna","asma k'namih8wbna","asma k'namih8wba", "asma namihawiak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                                test(expected, results);
                            });
                           describe("Future", () =>
                            {
                                let expected = ["ndaba n'namih8w","ndaba k'namih8w","ndaba namihawi","ndaba n'namih8wbna","ndaba k'namih8wbna","ndaba k'namih8wba", "ndaba namihawiak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                                test(expected, results);
                            });
                           describe("Conditionnel", () =>
                            {
                                let expected = ["ndaba n'namih8w","ndaba k'namih8w","ndaba namihawi","ndaba n'namih8wbna","ndaba k'namih8wbna","ndaba k'namih8wba", "ndaba namihawiak"];
                                let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                                test(expected, results);
                            });
                        });
                    });
                    describe("Défini", () => 
                    {    
                        describe("Affirmatif", () => 
                        {                             
                            describe("Présent", () =>
                            {
                                let expected = ["n'namih8","k'namih8","w'namih8","n'namih8nna","k'namih8nna","k'namih8w8", "w'namih8w8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true);
                                test(expected, results);
                            }); 
                            describe("Passé", () =>
                            {
                                let expected = ["n'namih8b","k'namih8b","w'namih8bani","n'namih8nnob","k'namih8nnob","k'namih8w8b", "w'namih8w8bani"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () =>
                            {
                                let expected = ["kizi n'namih8","kizi k'namih8","kizi w'namih8","kizi n'namih8nna","kizi k'namih8nna","kizi k'namih8w8", "kizi w'namih8w8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true);
                                test(expected, results);
                            });
                            describe("Future", () =>
                            {
                                let expected = ["n'namih8ji","k'namih8ji","w'namih8ji","n'namih8nnaji","k'namih8nnaji","k'namih8w8ji", "w'namih8w8ji"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true);
                                test(expected, results);
                            });
                            describe("Conditionnel", () =>
                            {
                                let expected = ["n'namih8ba","k'namih8ba","w'namih8ba","n'namih8nnaba","k'namih8nnaba","k'namih8w8ba", "w'namih8w8ba"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true);
                                test(expected, results);
                            });
                        });
                        describe("Négatif", () => 
                        {
                            describe("Présent", () =>
                            {
                                let expected = ["nda n'namih8wi","nda k'namih8wi","nda w'namih8wia","nda n'namih8winna","nda k'namih8winna","nda k'namih8wiw8", "nda w'namih8wiw8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé", () =>
                            {
                                let expected = ["nda n'namih8wib","nda k'namih8wib","nda w'namih8wiabani","nda n'namih8winnob","nda k'namih8winnob","nda k'namih8wiw8b", "nda w'namih8wiw8bani"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () =>
                            {
                                let expected = ["asma n'namih8wi","asma k'namih8wi","asma w'namih8wia","asma n'namih8winna","asma k'namih8winna","asma k'namih8wiw8", "asma w'namih8wiw8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true, true);
                                test(expected, results);
                            });
                            describe("Future", () =>
                            {
                                let expected = ["ndaba n'namih8wi","ndaba k'namih8wi","ndaba w'namih8wia","ndaba n'namih8winna","ndaba k'namih8winna","ndaba k'namih8wiw8", "ndaba w'namih8wiw8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true, true);
                                test(expected, results);
                            });
                              describe("Conditionnel", () =>
                            {
                                let expected = ["ndaba n'namih8wi","ndaba k'namih8wi","ndaba w'namih8wia","ndaba n'namih8winna","ndaba k'namih8winna","ndaba k'namih8wiw8", "ndaba w'namih8wiw8"];
                                let results = generateVerbAffix('namih8', Animacy.ANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true, true);
                                test(expected, results);
                            });                                                      
                        });                            
                    });                                          
                });
            });
        });
        describe("VTI", () => 
        {      
            describe("Patron en O", () => 
            {
                describe("Ordre indépendant", () => 
                {     
                    describe("Indéfini", () => 
                    {             
                        describe("Affirmatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nd'askawito","kd'askawito","askawito","nd'askawitobna","kd'askawitobna","kd'askawitoba", "askawitoak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["nd'askawitob","kd'askawitob","askawitob","nd'askawitobnob","kd'askawitobnob","kd'askawitob8b", "askawitobanik"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["kizi nd'askawito","kizi kd'askawito","kizi askawito","kizi nd'askawitobna","kizi kd'askawitobna","kizi kd'askawitoba", "kizi askawitoak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["nd'askawitoji","kd'askawitoji","askawitoji","nd'askawitobnaji","kd'askawitobnaji","kd'askawitobaji", "askawitoakji"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                                test(expected, results);
                            });
                            describe("Conditional", () => 
                            {   
                                let expected = ["nd'askawitoba","kd'askawitoba","askawitoba","nd'askawitobnaba","kd'askawitobnaba","kd'askawitobaba", "askawitoakba"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                                test(expected, results);
                            });
                        });
                        describe("Négatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nda nd'askawitow","nda kd'askawitow","nda askawitowi","nda nd'askawitowbna","nda kd'askawitowbna","nda kd'askawitowba", "nda askawitowiak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["nda nd'askawitowb","nda kd'askawitowb","nda askawitowib","nda nd'askawitowbnob","nda kd'askawitowbnob","nda kd'askawitowb8b", "nda askawitowibanik"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["asma nd'askawitow","asma kd'askawitow","asma askawitowi","asma nd'askawitowbna","asma kd'askawitowbna","asma kd'askawitowba", "asma askawitowiak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["ndaba nd'askawitow","ndaba kd'askawitow","ndaba askawitowi","ndaba nd'askawitowbna","ndaba kd'askawitowbna","ndaba kd'askawitowba", "ndaba askawitowiak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                                test(expected, results);
                            });
                            describe("Conditional", () => 
                            {   
                                let expected = ["ndaba nd'askawitow","ndaba kd'askawitow","ndaba askawitowi","ndaba nd'askawitowbna","ndaba kd'askawitowbna","ndaba kd'askawitowba", "ndaba askawitowiak"];
                                let results = generateVerbAffix('askawito', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                                test(expected, results);
                            });                            
                        });
                    });
                    describe("Défini", () => 
                    {
                        describe("Affirmatif", () => 
                        {                        
                            describe("Présent", () => 
                            {   
                                let expected = ["nd'askawiton","kd'askawiton","wd'askawiton","nd'askawitonana","kd'askawitonana","kd'askawiton8", "wd'askawiton8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["nd'askawitonob","kd'askawitonob","wd'askawitonob","nd'askawitonanob","kd'askawitonanob","kd'askawiton8b", "wd'askawiton8b"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["kizi nd'askawiton","kizi kd'askawiton","kizi wd'askawiton","kizi nd'askawitonana","kizi kd'askawitonana","kizi kd'askawiton8", "kizi wd'askawiton8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["nd'askawitonji","kd'askawitonji","wd'askawitonji","nd'askawitonanaji","kd'askawitonanaji","kd'askawiton8ji", "wd'askawiton8ji"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true);
                                test(expected, results);
                            });
                            describe("Conditional", () => 
                            {   
                                let expected = ["nd'askawitonba","kd'askawitonba","wd'askawitonba","nd'askawitonanaba","kd'askawitonanaba","kd'askawiton8ba", "wd'askawiton8ba"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true);
                                test(expected, results);
                            });
                        });
                        describe("Négatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nda nd'askawitowen","nda kd'askawitowen","nda wd'askawitowen","nda nd'askawitowenana","nda kd'askawitowenana","nda kd'askawitowen8", "nda wd'askawitowen8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["nda nd'askawitowen","nda kd'askawitowen","nda wd'askawitowen","nda nd'askawitowenana","nda kd'askawitowenana","nda kd'askawitowen8", "nda wd'askawitowen8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["asma nd'askawitowen","asma kd'askawitowen","asma wd'askawitowen","asma nd'askawitowenana", "asma kd'askawitowenana", "asma kd'askawitowen8", "asma wd'askawitowen8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true, true);
                                test(expected, results);
                            }); 
                            describe("Future", () => 
                            {   
                                let expected = ["ndaba nd'askawitowen","ndaba kd'askawitowen","ndaba wd'askawitowen","ndaba nd'askawitowenana","ndaba kd'askawitowenana","ndaba kd'askawitowen8", "ndaba wd'askawitowen8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true, true);
                                test(expected, results);
                            });
                            describe("Conditionnel", () => 
                            {   
                                let expected = ["ndaba nd'askawitowen","ndaba kd'askawitowen","ndaba wd'askawitowen","ndaba nd'askawitowenana","ndaba kd'askawitowenana","ndaba kd'askawitowen8", "ndaba wd'askawitowen8"];
                                let results = generateVerbAffix('askawito', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true, true);
                                test(expected, results);
                            });                            
                        });
                    });   
                });
            });
            describe("Patron en M", () => 
            {       
                describe("Ordre indépendant", () => 
                {                 
                    describe("Indéfini", () => 
                    {            
                        describe("Affirmatif", () => 
                        {                           
                            describe("Présent", () => 
                            {   
                                let expected = ["n'waj8nem","k'waj8nem","waj8nem","n'waj8nemobna","k'waj8nemobna","k'waj8nemoba", "waj8nemok"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["n'waj8nemob","k'waj8nemob","waj8nemob","n'waj8nemobnob","k'waj8nemobnob","k'waj8nemob8b", "waj8nemobanik"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["kizi n'waj8nem","kizi k'waj8nem","kizi waj8nem","kizi n'waj8nemobna","kizi k'waj8nemobna","kizi k'waj8nemoba", "kizi waj8nemok"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["n'waj8nemji","k'waj8nemji","waj8nemji","n'waj8nemobnaji","k'waj8nemobnaji","k'waj8nemobaji", "waj8nemokji"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                                test(expected, results);
                            });
                            describe("Conditional", () => 
                            {   
                                let expected = ["n'waj8nemba","k'waj8nemba","waj8nemba","n'waj8nemobnaba","k'waj8nemobnaba","k'waj8nemobaba", "waj8nemokba"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                                test(expected, results);
                            });
                        });
                        describe("Négatf", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nda n'waj8nemow","nda k'waj8nemow","nda waj8nemowi","nda n'waj8nemowbna","nda k'waj8nemowbna","nda k'waj8nemowba", "nda waj8nemowiak"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false, true);
                                test(expected, results);
                            });
                            describe("Past", () => 
                            {   
                                let expected = ["nda n'waj8nemowb","nda k'waj8nemowb","nda waj8nemowib","nda n'waj8nemowbnob","nda k'waj8nemowbnob","nda k'waj8nemowb8b", "nda waj8nemowibanik"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["asma n'waj8nemow","asma k'waj8nemow","asma waj8nemowi","asma n'waj8nemowbna","asma k'waj8nemowbna","asma k'waj8nemowba", "asma waj8nemowiak"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false, true);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["ndaba n'waj8nemow","ndaba k'waj8nemow","ndaba waj8nemowi","ndaba n'waj8nemowbna","ndaba k'waj8nemowbna","ndaba k'waj8nemowba", "ndaba waj8nemowiak"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false, true);
                                test(expected, results);
                            });
                            describe("Conditionnel", () => 
                            {   
                                let expected = ["ndaba n'waj8nemow","ndaba k'waj8nemow","ndaba waj8nemowi","ndaba n'waj8nemowbna","ndaba k'waj8nemowbna","ndaba k'waj8nemowba", "ndaba waj8nemowiak"];
                                let results = generateVerbAffix('waj8nem', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false, true);
                                test(expected, results);
                            });                            
                        });
                    });
                    describe("Défini", () => 
                    {
                        describe("Affirmatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["n'waj8nemen","k'waj8nemen","w'waj8nemen","n'waj8nemenana","k'waj8nemenana","k'waj8nemen8", "w'waj8nemen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["n'waj8nemenob","k'waj8nemenob","w'waj8nemenob","n'waj8nemenanob","k'waj8nemenanob","k'waj8nemen8b", "w'waj8nemen8b"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["kizi n'waj8nemen","kizi k'waj8nemen","kizi w'waj8nemen","kizi n'waj8nemenana","kizi k'waj8nemenana","kizi k'waj8nemen8", "kizi w'waj8nemen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["n'waj8nemenji","k'waj8nemenji","w'waj8nemenji","n'waj8nemenanaji","k'waj8nemenanaji","k'waj8nemen8ji", "w'waj8nemen8ji"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true);
                                test(expected, results);
                            });
                            describe("Conditional", () => 
                            {   
                                let expected = ["n'waj8nemenba","k'waj8nemenba","w'waj8nemenba","n'waj8nemenanaba","k'waj8nemenanaba","k'waj8nemen8ba", "w'waj8nemen8ba"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true);
                                test(expected, results);
                            }); 
                        });
                        describe("Négatif", () => 
                        {
                            describe("Présent", () => 
                            {   
                                let expected = ["nda n'waj8nemowen","nda k'waj8nemowen","nda w'waj8nemowen","nda n'waj8nemowenana","nda k'waj8nemowenana","nda k'waj8nemowen8", "nda w'waj8nemowen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé", () => 
                            {   
                                let expected = ["nda n'waj8nemowenob","nda k'waj8nemowenob","nda w'waj8nemowenob","nda n'waj8nemowenanob","nda k'waj8nemowenanob","nda k'waj8nemowen8b", "nda w'waj8nemowen8b"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true, true);
                                test(expected, results);
                            });
                            describe("Passé composé", () => 
                            {   
                                let expected = ["asma n'waj8nemowen","asma k'waj8nemowen","asma w'waj8nemowen","asma n'waj8nemowenana","asma k'waj8nemowenana","asma k'waj8nemowen8", "asma w'waj8nemowen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true, true);
                                test(expected, results);
                            });
                            describe("Future", () => 
                            {   
                                let expected = ["ndaba n'waj8nemowen","ndaba k'waj8nemowen","ndaba w'waj8nemowen","ndaba n'waj8nemowenana","ndaba k'waj8nemowenana","ndaba k'waj8nemowen8", "ndaba w'waj8nemowen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true, true);
                                test(expected, results);
                            });
                            describe("Conditionnel", () => 
                            {   
                                let expected = ["ndaba n'waj8nemowen","ndaba k'waj8nemowen","ndaba w'waj8nemowen","ndaba n'waj8nemowenana","ndaba k'waj8nemowenana","ndaba k'waj8nemowen8", "ndaba w'waj8nemowen8"];
                                let results = generateVerbAffix('waj8nem', Animacy.INANIMATE, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true, true);
                                test(expected, results);
                            });                            
                        });
                    });                                             
                });           
            });
        });  
    });  
});