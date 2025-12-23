var answerIndex = 0;
var validated = false;
var currentDictionary = null;

function resetCharivari()
{
    answerIndex = 0;
    validated = false;
    currentDictionary = null;

    try
    {
        document.getElementById("charivariQuestionInput").value = "";
        document.getElementById("charivariQuestionAnswer").hidden = true;
        document.getElementById("next").hidden = true;
    }    
    catch (error) {}     
}

function getMaxLength()
{
    let selectedDifficulty = document.getElementById("difficulties").value;
    if ( selectedDifficulty == 'Très facile')
    {
        return 4;
    }
    else if ( selectedDifficulty == 'Facile' || selectedDifficulty == 'Moyen')
    {
        return 6;
    }
    else if ( selectedDifficulty == 'Difficile')
    {
        return 8;
    }        
    else
    {
        return 99999;
    }    
}


function generateCharivariQuestionFromCategory(dictionary, category)
{    
    var wordList = generateWordIndicesWithLength(dictionary, category, getMaxLength());
    generateCharivariQuestionFromIndices(dictionary, wordList);
}

function generateCharivariQuestionFromIndices(dictionary, indices)
{    
    resetCharivari();    
    currentDictionary = dictionary;
    answerIndex = indices[getRandomInt(indices.length)];    
    let chosenWord = currentDictionary[answerIndex].Abenaki; 

    fillCharivariQuestion(document, chosenWord);   
}

function shuffleWord(document, chosenWord)
{
    let selectedDifficulty = document.getElementById("difficulties").value;

    if ( selectedDifficulty == 'Très facile')
    {
        return shuffleLettersOnly(chosenWord);
    }
    else if ( selectedDifficulty == 'Facile')
    {
        return middleShuffle(chosenWord);
    }     
    else if ( selectedDifficulty == 'Moyen')
    {
        return shuffleLettersOnly(chosenWord);
    }   
    else if ( selectedDifficulty == 'Difficile')
    {
        return middleShuffle(chosenWord);
    }      
    else if ( selectedDifficulty == 'Très difficile')
    {
        return shuffleLettersOnly(chosenWord);
    }
    
    return middleShuffle(chosenWord);    
}

function fillCharivariQuestion(document, chosenWord)
{
    let chosenWordLowerCase = chosenWord.toLowerCase();
    console.log("Chosen word: " + chosenWordLowerCase);

    let shuffledWord = shuffleWord(document, chosenWordLowerCase);
    
    document.getElementById("question").textContent = "Décrypter ce mot: \"" + shuffledWord + "\"?";
}

function validateCharivari()
{
    if ( !validated )
    {    
        const value = document.getElementById("charivariQuestionInput").value.toLowerCase();

        const answerEntry = currentDictionary[answerIndex];
        var answer = answerEntry.Abenaki.toLowerCase();        

        const good = value == answer;
        document.getElementById("charivariQuestionAnswer").innerHTML = answer + " (" + answerEntry.French + ")";
        document.getElementById("charivariQuestionAnswer").hidden = false;
        if ( good )
        {        
            document.getElementById("charivariQuestionAnswer").style = "color:green";
        }
        else
        {
            document.getElementById("charivariQuestionAnswer").style = "color:red";
        }
        document.getElementById("next").hidden = false;
        validated = true;
    }
}

/// Add the necessary View code to support charivari question.
function addCharivariGameHtmlTo(elementId, updateQuestion)
{
    var element = document.getElementById(elementId);

    var innerHTML = "";

    innerHTML += '<br>';
    innerHTML += '<select name="difficulties" id="difficulties" onchange="' + updateQuestion + '">'
    innerHTML += '</select>';
    innerHTML += '</br>';    
    innerHTML += '<h4 id="question"></h4>';

    innerHTML += '<ol>';
    innerHTML += '<div id="charivariQuestion">';
    innerHTML += '    <input type="text" id="charivariQuestionInput" value="" placeholder="" onchange="validateCharivari()"/>'
    innerHTML += '    <button onclick="validateCharivari()">Vérifier</button>';
    innerHTML += '    <span id="charivariQuestionAnswer" hidden=true></span>'
    innerHTML += '</div>'

    innerHTML += '<input type="button" id="next" value="Suivant" hidden=true onclick="' + updateQuestion + '"/>';    
    innerHTML += '</ol>';

    element.innerHTML += innerHTML;
}
