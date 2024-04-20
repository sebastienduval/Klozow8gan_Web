// Given a dictionary entry, tell if it includes the supplied category as part of its meta.
function doesEntryIncludesCategory(entry, category)
{
    return !category || entry.Meta.split(";").includes(category);
}

// Given a dictionary, gathers every category includes and returns a set.
function gatherCategories(dictionary)
{
    var categories = new Set();
    categories.add("");    
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
    categoriesSelect.innerHTML = categoryInnerHTML;
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