
function formatCategories(data)
{
    var categoriesSelect = document.getElementById("categories");
    const categories = gatherCategories(data);
    const categoryArray = Array.from(categories);
    const sortedCategories = categoryArray.sort((a, b) => a.localeCompare(b));
    var categoryInnerHTML = "";
    categoryInnerHTML += "<option value=\"\">Tout</option>";    
    for ( const category of sortedCategories )
    {
        categoryInnerHTML += "<option value=\"" + category + "\">" + category + "</option>";
    }
    categoriesSelect.innerHTML = categoryInnerHTML;
}

function closureCopyEntryToClipboard(entry) 
{ 
    function copyEntryToClipboard()
    {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        {
            const str = entry.Abenaki + " [" + entry.Type + "] " + "(" + entry.French + ")" ;
            return navigator.clipboard.writeText(str);
        }
        return Promise.reject('The Clipboard API is not available.');
    };
    return copyEntryToClipboard;
}

function formatToTable(data, category="", filter="", filter_language) {
    var tableContainer = document.getElementById("word-table");
    var tableHTML = "<table>";

    var profiling = document.getElementById("profiling");    
    const tableEntrieStart = performance.now();    
    var tableEntries = [];

    const bigTask = (data, startIndex) => 
    {
        let endIndex = startIndex + 20;
        //if ( endIndex > data.length )
        {
            endIndex = data.length;
        }

        for (var i = startIndex; i < data.length && i < endIndex; i ++ ) 
        {
            const entry = data[i];
            if ( doesEntryIncludesCategory(entry, category) && 
                (!filter || containsIgnoreCase(entry[filter_language], filter)) )
            {         
                const copyId = "copy" + tableEntries.length;                
                tableHTML += "<tr>";
                tableHTML += "<td>" + i + "</td>";
                tableHTML += "<td>" + entry.French + "</td>";
                tableHTML += "<td>" + entry.Type + "</td>";
                tableHTML += "<td>" + entry.Abenaki + "</td>";
                tableHTML += "<td>" + entry.Source + "</td>";
                tableHTML += "<td>" + Learning.getWordScore(entry.Abenaki) + "</td>";
                tableHTML += "<td id=" + copyId + "></td>";
                tableHTML += "</tr>";

                tableEntries.push(entry);
            }
        }

        tableContainer.innerHTML = tableHTML + "</table>";        
        console.log(data.length);
        if (endIndex < data.length) 
        {
            setTimeout(() => bigTask(data, endIndex), 0); // Yield to the event loop
        }
        else
        {
            // Create the buttons for the cells.
            for (var i = 0; i < tableEntries.length; i ++ ) 
            {   
                console.log("Table Entry " + i);
                const copyId = "copy" + i;
                var cell = document.getElementById(copyId); 
                var btn = document.createElement("button");
                btn.id = "button" + i;
                const callback = closureCopyEntryToClipboard(tableEntries[i]);
                btn.addEventListener("click", callback);
                btn.innerHTML = "Copier";
                cell.appendChild(btn);
            }
        }
    };

    bigTask(data, 0);
}

function onCategoryChanged() 
{
    var profiling = document.getElementById("profiling");
    profiling.innerHTML = "";

    const start = performance.now();
    formatToTable(dictionary, document.getElementById("categories").value, document.getElementById("filter").value, document.getElementById("filter_language").value);
    const end = performance.now();

    profiling.innerHTML += `Execution time: ${end - start} ms`;
}