var choices = [];
var answer = 0;

function GetRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function Validate(index) 
{
    var good = false;
    if ( index == answer )
    {
        document.getElementById("myresults").innerHTML = "Bon";
        good = true;
    }
    else
    {
        document.getElementById("myresults").innerHTML = "Mauvais";
        document.getElementById("answer"+ index).style = "color:red";    
        good = false;     
    }

    document.getElementById("answer"+ answer).style = "color:green";

    for ( var i = 0; i <= 3; i ++ )
    {
        document.getElementById("choice"+ i).hidden = true;        
        document.getElementById("answer"+ i).innerHTML = dictionary[choices[i]].French + " \"" + dictionary[choices[i]].Abenaki + "\"";
        document.getElementById("answer"+ i).hidden = false;
    }
}

function GenerateQuestion()
{    
    for (let i = 0; i < 4; i++) 
    {
        choices.push(GetRandomInt(dictionary.length));
    }

    answer = GetRandomInt(4);

    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choices[answer]].Abenaki + "\".";
    document.getElementById("choice0").value = dictionary[choices[0]].French;
    document.getElementById("choice1").value = dictionary[choices[1]].French;
    document.getElementById("choice2").value = dictionary[choices[2]].French;
    document.getElementById("choice3").value = dictionary[choices[3]].French;
    
}