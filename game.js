var choices = [];
var answer = 0;

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function validate(index) 
{
    var good = index == answer;
    if ( !good )
    {
        document.getElementById("answer"+ index).style = "color:red";
    }

    document.getElementById("answer"+ answer).style = "color:green";

    for ( var i = 0; i < choices.length; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        var choiceElement = document.getElementById("choice"+ i);

        choiceElement.hidden = true;        
        answerElement.innerHTML = dictionary[choices[i]].French + " \"" + dictionary[choices[i]].Abenaki + "\"";
        answerElement.hidden = false;
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
    }    
}

function fillQuestionTypeAbenakiToFrench(document, dictionary)
{
    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choices[answer]].Abenaki + "\"?";

    for ( var i = 0; i <= 3; i ++ )
    {
        if ( i < choices.length )
        {
            document.getElementById("choice" + i).hidden = false;        
            document.getElementById("choice" + i).value = dictionary[choices[i]].French;
        }
        else
        {
            document.getElementById("choice" + i).hidden = true;       
        }
    }    
}

function fillQuestionTypeFrenchToAbenaki(document, dictionary)
{
    document.getElementById("question").textContent = "Quel mot abénaki correspond le mieux à cette définition: \"" + dictionary[choices[answer]].French + "\"?";

    for ( var i = 0; i <= 3; i ++ )
    {
        if ( i < choices.length )
        {
            document.getElementById("choice" + i).hidden = false;        
            document.getElementById("choice" + i).value = dictionary[choices[i]].Abenaki;
        }
        else
        {
            document.getElementById("choice" + i).hidden = true;       
        }
    }    
}

function generateQuestion(dictionary, category)
{    
    reset();

    let wordsIndicesInCategory = generateWordIndices(dictionary, category);

    choices = [];
    for (let i = 0; i < 4 && wordsIndicesInCategory.length > 0; i++) 
    {
        const index = wordsIndicesInCategory.splice(getRandomInt(wordsIndicesInCategory.length), 1);
        choices.push([index]);
    }

    answer = getRandomInt(choices.length);

    if ( getRandomInt(2) == 0 )
    {
        fillQuestionTypeAbenakiToFrench(document, dictionary);   
    }
    else
    {
        fillQuestionTypeFrenchToAbenaki(document, dictionary);  
    }
}

function onCategoryChanged()
{
    generateQuestion(dictionary, document.getElementById("categories").value);
}