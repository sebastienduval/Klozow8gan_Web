var choiceEntries = [];
var answerIndex = 0;
var currentDictionary;

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function validate(index) 
{
    var good = index == answerIndex;
    if ( !good )
    {
        document.getElementById("answer" + index).style = "color:red";
    }

    document.getElementById("answer"+ answerIndex).style = "color:green";

    for ( var i = 0; i < choiceEntries.length; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        var choiceElement = document.getElementById("choice"+ i);

        choiceElement.hidden = true;        
        answerElement.innerHTML = currentDictionary[choiceEntries[i]].French + " \"" + currentDictionary[choiceEntries[i]].Abenaki + "\"";
        answerElement.hidden = false;
    }

    document.getElementById("next").hidden = false;
}

function validateHard()
{
    const value = document.getElementById("hardQuestionInput").value.toLowerCase();
    const hardQuestionAnswer = currentDictionary[choiceEntries[answerIndex]].Abenaki.toLowerCase();

    document.getElementById("hardQuestionAnswer").innerHTML = hardQuestionAnswer;
    document.getElementById("hardQuestionAnswer").hidden = false;
    if ( value == hardQuestionAnswer )
    {        
        document.getElementById("hardQuestionAnswer").style = "color:green";
    }
    else
    {
        document.getElementById("hardQuestionAnswer").style = "color:red";
    }
    document.getElementById("next").hidden = false;
}

function reset()
{
    document.getElementById("next").hidden = true;
    for ( var i = 0; i <= 5; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        answerElement.style = "color:black";
        document.getElementById("answer" + i).hidden = true;
        document.getElementById("choice" + i).hidden = true;        
    }

    try
    {
        document.getElementById("hardQuestion").hidden = true; 
        document.getElementById("hardQuestionInput").value = "";
        document.getElementById("hardQuestionAnswer").hidden = true;  
    }    
    catch (error) {} 
}

function fillQuestionTypeAbenakiToFrench(document, dictionary)
{
    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choiceEntries[answerIndex]].Abenaki + "\"?";

    for ( var i = 0; i <= 5; i ++ )
    {
        if ( i < choiceEntries.length )
        {
            document.getElementById("choice" + i).hidden = false;        
            document.getElementById("choice" + i).value = dictionary[choiceEntries[i]].French;
        }
        else
        {
            document.getElementById("choice" + i).hidden = true;       
        }
    }    
}

function fillQuestionTypeFrenchToAbenaki(document, dictionary)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + dictionary[choiceEntries[answerIndex]].French + "\"?";

    var choices = [];
    for ( var i = 0; i <= 5; i ++ )
    {     
        if ( i < choiceEntries.length )
        {            
            choices.push(dictionary[choiceEntries[i]].Abenaki);
        }
    }
    
    fillQuestionTypeFrenchToAbenakiWithAnswerAndChoices(document, dictionary[choiceEntries[answerIndex]].French, choices);
}

function fillHardQuestionTypeFrenchToAbenaki(document, dictionary, hintLettersCount)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + dictionary[choiceEntries[answerIndex]].French + "\"?";
    document.getElementById("hardQuestion").hidden = false;
    if ( hintLettersCount > 0 )
    { 
        document.getElementById("hardQuestionInput").placeholder = dictionary[choiceEntries[answerIndex]].Abenaki.substring(0,3) + "...";     
    }
    else
    {
        document.getElementById("hardQuestionInput").placeholder = '';
    }
}

function fillQuestionTypeFrenchToAbenakiWithAnswerAndChoices(document, answer, choices)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + answer + "\"?";

    for ( var i = 0; i <= 5; i ++ )
    {
        if ( i < choices.length )
        {
            document.getElementById("choice" + i).hidden = false;        
            document.getElementById("choice" + i).value = choices[i];
        }
        else
        {
            document.getElementById("choice" + i).hidden = true;       
        }
    }    
}

function generateQuestionFromAbenakiWordList(dictionary, wordList)
{
    generateQuestionFromIndices(dictionary, convertAbenakiWordListToIndices(dictionary, wordList));    
}

function generateHardQuestionFromAbenakiWordList(dictionary, wordList)
{
    generateHardQuestionFromIndices(dictionary, convertAbenakiWordListToIndices(dictionary, wordList));    
}

function generateQuestionFromCategory(dictionary, category)
{    
    generateQuestionFromIndices(dictionary, generateWordIndices(dictionary, category));
}

function generateQuestionFromIndices(dictionary, indices)
{    
    currentDictionary = dictionary;
    reset();

    const difficulty = document.getElementById("difficulties").value;

    var generateMultipleChoiceQuestion = false;

    var choiceCount = 0;
    var hintLettersCount = 3;
    if ( difficulty == 'Très facile')
    {
        choiceCount = 2;
        generateMultipleChoiceQuestion = true
    }
    else if ( difficulty == 'Facile')
    {
        choiceCount = 4;
        generateMultipleChoiceQuestion = true;
    }     
    else if ( difficulty == 'Moyen')
    {
        choiceCount = 6;
        generateMultipleChoiceQuestion = true;
    }   
    else if ( difficulty == 'Très difficile')
    {
        hintLettersCount = 0;
    }

    if ( generateMultipleChoiceQuestion )
    {
        choiceEntries = [];
        for (let i = 0; i < choiceCount && indices.length > 0; i++) 
        {
            const index = indices.splice(getRandomInt(indices.length), 1);
            choiceEntries.push([index]);
        }

        answerIndex = getRandomInt(choiceEntries.length);

        if ( getRandomInt(2) == 0 )
        {
            fillQuestionTypeAbenakiToFrench(document, dictionary);   
        }
        else
        {
            fillQuestionTypeFrenchToAbenaki(document, dictionary);  
        }
    }
    else
    {
        generateHardQuestionFromIndices(dictionary, indices, hintLettersCount);
    }
}

function generateHardQuestionFromIndices(dictionary, indices, hintLettersCount)
{    
    currentDictionary = dictionary;
    reset();

    choiceEntries = [];
    const index = indices.splice(getRandomInt(indices.length), 1);
    choiceEntries.push([index]);

    answerIndex = 0;

    fillHardQuestionTypeFrenchToAbenaki(document, dictionary, hintLettersCount);  
}

function onCategoryChanged()
{
    generateQuestionFromCategory(dictionary, document.getElementById("categories").value);
}

function formatDifficulties(data, selectName)
{
    const defaultSelected = 'Facile';
    var select = document.getElementById(selectName);
    const difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile', 'Très difficile'];
    var innerHTML = "";
    for ( const difficulty of difficulties )
    {
        var extra = difficulty == defaultSelected ? 'selected' : '';
        innerHTML += '<option value="' + difficulty + '" ' + extra + '>' + difficulty + '</option>';
    }
    select.innerHTML += innerHTML;
}

function addGameHtmlTo(elementId, updateQuestion)
{
    var element = document.getElementById(elementId);

    var innerHTML = "";

    innerHTML += '<br>';
    innerHTML += '<select name="difficulties" id="difficulties" onchange="' + updateQuestion + '">'
    innerHTML += '</select>';
    innerHTML += '</br>';
    innerHTML += '<h4 id="question"></h4>';

    for ( let i = 0; i < 6 ; i++ )
    {
        innerHTML += '<ol>';
        innerHTML += '<input type="button" name="question' + i + '" id="choice' + i + '" value=' + i + ' onclick="validate(' + i + ')"/>';
        innerHTML += '<span id="answer' + i + '" hidden=true>answer' + i + '</span>';
        innerHTML += '</ol>';
    }

    innerHTML += '<ol>';
    innerHTML += '<div id="hardQuestion">';
    innerHTML += '    <input type="text" id="hardQuestionInput" value="" placeholder="" onchange="validateHard()"/>'
    innerHTML += '    <button onclick="validateHard()">Vérifier</button>';
    innerHTML += '    <span id="hardQuestionAnswer" hidden=true></span>'
    innerHTML += '</div>'

    innerHTML += '<input type="button" id="next" value="Suivant" hidden=true onclick="' + updateQuestion + '"/>';    
    innerHTML += '</ol>';

    element.innerHTML += innerHTML;
}