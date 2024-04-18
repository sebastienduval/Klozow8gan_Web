var choices = [];
var answer = 0;

function GetRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function Validate(index) 
{
    var good = index == answer;
    if ( !good )
    {
        document.getElementById("answer"+ index).style = "color:red";
    }

    document.getElementById("answer"+ answer).style = "color:green";

    for ( var i = 0; i <= 3; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        var choiceElement = document.getElementById("choice"+ i);

        choiceElement.hidden = true;        
        answerElement.innerHTML = dictionary[choices[i]].French + " \"" + dictionary[choices[i]].Abenaki + "\"";
        answerElement.hidden = false;
    }

    document.getElementById("next").hidden = false;
}

function Reset()
{
    document.getElementById("next").hidden = true;
    for ( var i = 0; i <= 3; i ++ )
    {
        var answerElement = document.getElementById("answer"+ i);
        answerElement.style = "color:black";
        document.getElementById("answer" + i).hidden = true;
    }    
}

function GenerateQuestion()
{    
    Reset();

    choices = [];
    for (let i = 0; i < 4; i++) 
    {
        choices.push(GetRandomInt(dictionary.length));
    }

    answer = GetRandomInt(4);

    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choices[answer]].Abenaki + "\".";

    for ( var i = 0; i <= 3; i ++ )
    {
        document.getElementById("choice" + i).hidden = false;        
        document.getElementById("choice" + i).value = dictionary[choices[i]].French;
    }    
}