// Given a dictionary entry, tell if it includes the supplied category as part of its meta.
function doesEntryIncludesCategory(entry, category)
{
    return !category || category == "Tout" || entry.Meta.split(";").includes(category);
}

// Given a dictionary, gathers every category includes and returns a set.
function gatherCategories(dictionary)
{
    var categories = new Set();
    categories.add("Tout");  
    for (var index in dictionary) 
    {        
        const metas = dictionary[index].Meta.split(';');
        for ( const meta of metas )
        {            
            if ( meta )
            {
                categories.add(meta);
            }
        }
    }
    return categories;
}

function formatCategories(data, selectName)
{
    var categoriesSelect = document.getElementById(selectName);
    const categories = gatherCategories(data);
    var categoryInnerHTML = "";
    for ( const category of categories )
    {
        categoryInnerHTML += "<option value=\"" + category + "\">" + category + "</option>";
    }
    categoriesSelect.innerHTML += categoryInnerHTML;
}

// Given a dictionary returns an array of indices refering to entries that includes the supplied category.
function generateWordIndices(dictionary, category)
{
    var wordList = []; 
    for ( let i = 0; i < dictionary.length; i ++ ) 
    {        
        if ( doesEntryIncludesCategory(dictionary[i], category) )
        {
            wordList.push(i);
        }
    }
    return wordList;
}

// Given a list of words generate a list of indices.
function convertAbenakiWordListToIndices(dictionary, wordList)
{
    var wordListCopy = wordList.slice();
    var indices = []; 
    for ( let i = 0; i < dictionary.length; i ++ ) 
    {                
        var word = dictionary[i].Abenaki.toLowerCase();
        if ( wordListCopy.includes(word) )
        {
            indices.push(i);
            wordListCopy = wordListCopy.filter(item => item !== word);
        }
    }

    if ( wordListCopy.length > 0 )
    {
        console.log(wordListCopy)
    }

    return indices;
}

// Given dictionary and a key, find the entry matching the key.
function findEntry(dictionary, key, value)
{
    for ( var entry of dictionary ) 
    {
        if ( entry[key].toLowerCase() == value.toLowerCase() )
        {
            return entry;
        }
    }
    return null;
}

function isNoun(entry)
{
    return entry.Type[0] == "N";
}

function isAnimate(entry)
{
    return startsWithIgnoreCase(entry.Type, "NA");
}

function isDependant(entry)
{
    return startsWithIgnoreCase(entry.Type, "NAD") || startsWithIgnoreCase(entry.Type, "NID");
}