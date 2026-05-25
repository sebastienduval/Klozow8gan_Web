import { generatePossessiveAffix, generateVerbAffix } from "./affix_generator.js";
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

    describe("VAI", () => 
    {
        describe("Patron en A", () => 
        { 
            describe("Ordre indépendant", () => 
            {   
                describe("Indéfini", () => 
                {                   
                    describe("Présent", () => 
                    {   
                        let expected = ["nd'aloka","kd'aloka","aloka","nd'alokabna","kd'alokabna","kd'alokaba", "alokak"];
                        let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, false);
                        test(expected, results);
                    });
                    describe("Passé", () => 
                    {                     
                        let expected = ["nd'alokab","kd'alokab","alokab","nd'alokabnob","kd'alokabnob","kd'alokab8b", "alokabanik"];
                        let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, false);
                        test(expected, results);
                    });
                    describe("Passé composé", () => 
                    {                     
                        let expected = ["kizi nd'aloka","kizi kd'aloka","kizi aloka","kizi nd'alokabna","kizi kd'alokabna","kizi kd'alokaba", "kizi alokak"];
                        let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, false);
                        test(expected, results);
                    });
                    describe("Future", () => 
                    {   
                        let expected = ["nd'alokaji","kd'alokaji","alokaji","nd'alokabnaji","kd'alokabnaji","kd'alokabaji", "alokakji"];
                        let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, false);
                        test(expected, results);
                    });
                    describe("Conditionel", () => 
                    {   
                        let expected = ["nd'alokaba","kd'alokaba","alokaba","nd'alokabnaba","kd'alokabnaba","kd'alokababa", "alokakba"];
                        let results = generateVerbAffix('aloka', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                        test(expected, results);
                    });   
                });                                                          
            });
        });
        describe("Patron en I et Ï", () => 
        {   
            describe("Ordre indépendant", () => 
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
                describe("Conditionel", () => 
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
                describe("Conditionel", () =>
                {
                    let expected = ["nd'aïba","kd'aïba","aoba","nd'aïbnaba","kd'aïbnaba","kd'aïbaba", "aoakba"];
                    let results = generateVerbAffix('aï', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                    test(expected, results);
                });                                                             
            });            
        });
    });
    describe("Patron en 8", () => 
    {
        describe("Ordre indépendant", () => 
        {       
            describe("Indéfini", () => 
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
                describe("Conditionel", () =>
                {
                    let expected = ["n'namih8ba","k'namih8ba","namihaba","n'namih8bnaba","k'namih8bnaba","k'namih8baba", "namihakba"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, false);
                    test(expected, results);
                });    
            });
            describe("Défini", () => 
            {                      
                describe("Présent", () =>
                {
                    let expected = ["n'namih8","k'namih8","w'namih8","n'namih8nna","k'namih8nna","k'namih8w8", "w'namih8w8"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PRESENT, false, true);
                    test(expected, results);
                }); 
                describe("Passé", () =>
                {
                    let expected = ["n'namih8b","k'namih8b","w'namih8bani","n'namih8nnob","k'namih8nnob","k'namih8w8b", "w'namih8w8bani"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST, false, true);
                    test(expected, results);
                });
               describe("Passé composé", () =>
                {
                    let expected = ["kizi n'namih8","kizi k'namih8","kizi w'namih8","kizi n'namih8nna","kizi k'namih8nna","kizi k'namih8w8", "kizi w'namih8w8"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.PAST_PERFECT, false, true);
                    test(expected, results);
                });
                describe("Future", () =>
                {
                    let expected = ["n'namih8ji","k'namih8ji","w'namih8ji","n'namih8nnaji","k'namih8nnaji","k'namih8w8ji", "w'namih8w8ji"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.FUTUR, false, true);
                    test(expected, results);
                });
                describe("Conditionnel", () =>
                {
                    let expected = ["n'namih8ba","k'namih8ba","w'namih8ba","n'namih8nnaba","k'namih8nnaba","k'namih8w8ba", "w'namih8w8ba"];
                    let results = generateVerbAffix('namih8', undefined, VerbalOrder.INDEPENDENT, VerbalTense.CONDITIONAL, false, true);
                    test(expected, results);
                });                                                            
            });                                          
        });
    });
    describe("Patron en O", () => 
    {
        describe("Ordre indépendant", () => 
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
    });
    describe("Patron en M", () => 
    {       
        describe("Ordre indépendant", () => 
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
    });      
});