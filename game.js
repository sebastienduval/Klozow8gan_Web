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
    for ( var i = 0; i <= 3; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        answerElement.style = "color:black";
        document.getElementById("answer" + i).hidden = true;
        document.getElementById("choice" + i).hidden = true;        
    }
    document.getElementById("hardQuestion").hidden = true; 
    document.getElementById("hardQuestionInput").value = "";
    document.getElementById("hardQuestionAnswer").hidden = true;         
}

function fillQuestionTypeAbenakiToFrench(document, dictionary)
{
    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choiceEntries[answerIndex]].Abenaki + "\"?";

    for ( var i = 0; i <= 3; i ++ )
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
    for ( var i = 0; i <= 3; i ++ )
    {     
        if ( i < choiceEntries.length )
        {            
            choices.push(dictionary[choiceEntries[i]].Abenaki);
        }
    }
    
    fillQuestionTypeFrenchToAbenakiWithAnswerAndChoices(document, dictionary[choiceEntries[answerIndex]].French, choices);
}

function fillHardQuestionTypeFrenchToAbenaki(document, dictionary)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + dictionary[choiceEntries[answerIndex]].French + "\"?";
    document.getElementById("hardQuestion").hidden = false; 
    document.getElementById("hardQuestionInput").placeholder = dictionary[choiceEntries[answerIndex]].Abenaki.substring(0,3) + "...";     
}

function fillQuestionTypeFrenchToAbenakiWithAnswerAndChoices(document, answer, choices)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + answer + "\"?";

    for ( var i = 0; i <= 3; i ++ )
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

    choiceEntries = [];
    for (let i = 0; i < 4 && indices.length > 0; i++) 
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

function generateHardQuestionFromIndices(dictionary, indices)
{    
    currentDictionary = dictionary;
    reset();

    choiceEntries = [];
    const index = indices.splice(getRandomInt(indices.length), 1);
    choiceEntries.push([index]);

    answerIndex = 0;

    fillHardQuestionTypeFrenchToAbenaki(document, dictionary);  
}

function onCategoryChanged()
{
    generateQuestionFromCategory(dictionary, document.getElementById("categories").value);
}