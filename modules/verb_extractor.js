import { Person } from "./person.js";
import { startsWithVowel, endsWithVowel, startsWithIgnoreCase, endsWithIgnoreCase, sliceEnd } from "./string.js";

export class VerbContext
{
    constructor(dictionary, word)
    {
        this.dictionary = dictionary;
        this.word = word;
        this.order = undefined;
        this.isPlural = undefined;
        this.person = undefined;
        this.entry = undefined;
    }

    clone()
    {
        let clone = new VerbContext(this.dictionary, this.word);
        clone.isPlural = this.isPlural;
        clone.person = this.person;
        clone.entry = this.entry;    
        return clone;    
    }

    log()
    {
        console.log("Word " + this.word + " isPlural " + this.isPlural + " person " + this.person);        
    }
}

export function extractImperative(context)
{
    var ImperativeMap = new Map();    
    ImperativeMap.set("a", ["", "a", "aj", "ada", "ada", "akw", "adij"]);
    ImperativeMap.set("i", ["", "i", "ij", "ida", "ida", "ikw", "idij"]);
    ImperativeMap.set("8", ["", "a", "8j", "8da", "8da", "okw", "8dij"]);
    ImperativeMap.set("o", ["", "o", "oj", "oda", "oda", "okw", "odij"]);
    ImperativeMap.set("m", ["", "a", "ej", "moda", "moda", "mokw", "moodij"]);

    for ( let endings of ImperativeMap )
    {
        for (let i = 0; i < endings.length; i++)
        {
            if ( endsWithIgnoreCase(context.word, endings[i]) )
            {
                context.person = i;
            }
        }
    }
}

/*
  describe("L'impératif", () => 
  {  
      describe("Patron en A", () => 
      {
        it("Aloka -> Nd'aloka + [Impératif] + [2e personne du singulier]", () => 
        {
          let context = new ExtractionContext(dict, 'Aloka');      
          assert.equal(extractImperative(context), "Nd'aloka");               
        });
        it("Alokada -> Nd'aloka + [Impératif] + [1re personne du pluriel]", () => 
        {
           
        });
        it("Alokakw -> Nd'aloka + [Impératif] + [2e personne du pluriel]", () => 
        {
             
        });                     
      });
  });
*/