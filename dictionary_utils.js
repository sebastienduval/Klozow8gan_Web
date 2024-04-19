function GatherCategories(dictionary)
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