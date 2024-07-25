function formatCategories(data)
{
    var categoriesSelect = document.getElementById("categories");
    const categories = gatherCategories(data);
    var categoryInnerHTML = "";
    for ( const category of categories )
    {
        categoryInnerHTML += "<option value=\"" + category + "\">" + category + "</option>";
    }
    categoriesSelect.innerHTML = categoryInnerHTML;
}

function formatToTable(data, category="", filter="", filter_language) {
    var tableContainer = document.getElementById("sched-table");
    var tableHTML = "<table>";

    for (var i = 0; i < data.length; i ++ ) 
    {
        const entry = data[i];
        if ( doesEntryIncludesCategory(entry, category) && 
            (!filter || containsIgnoreCase(entry[filter_language], filter)) )
        {            
            tableHTML += "<tr>";
            tableHTML += "<td>" + i + "</td>";
            tableHTML += "<td>" + entry.French + "</td>";
            tableHTML += "<td>" + entry.Type + "</td>";
            tableHTML += "<td>" + entry.Abenaki + "</td>";
            tableHTML += "<td>" + entry.Source + "</td>";
            tableHTML += "</tr>";
        }
    }

    tableHTML += "</table>";
    tableContainer.innerHTML = tableHTML;
}

function onCategoryChanged() 
{
    formatToTable(dictionary, document.getElementById("categories").value, document.getElementById("filter").value, document.getElementById("filter_language").value);
}