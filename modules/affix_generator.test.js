import { generatePossessiveAffix } from "./affix_generator.js";
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
});