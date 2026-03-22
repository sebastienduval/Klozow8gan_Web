export class Dictionary
{
    constructor(dictionary)
    {
        this.dictionary = dictionary;
    }

    findEntry(key, value)
    {
        for ( var entry of this.dictionary ) 
        {
            if ( entry[key].toLowerCase() == value.toLowerCase() )
            {
                return entry;
            }
        }
        return null;
    }
    
    // Keys
    static get ABENAKI() { return "Abenaki"; }
    static get FRENCH() { return "French"; }
}