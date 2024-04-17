var choices = [];
var answer = 0;

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function getCheckedIndex() 
{
    var radios = document.getElementsByName("question0");
    for (var y = 0; y < radios.length; y++)
        if (radios[y].checked) return radios[y].value;
}

function returnScore() 
{
    if ( getCheckedIndex() == answer )
    {
        document.getElementById("myresults").innerHTML = "Bon";
    }
    else
    {
        document.getElementById("myresults").innerHTML = "Mauvais";        
    }

    //document.getElementById("myresults").innerHTML = getCheckedIndex() + " " + answer;
}

function GenerateQuestion()
{    
    for (let i = 0; i < 4; i++) 
    {
        choices.push(getRandomInt(dictionary.length));
    }

    answer = getRandomInt(4);

    document.getElementById("question").textContent = "Quel est la meilleur définition pour \"" + dictionary[choices[answer]].Abenaki + "\".";
    document.getElementById("choice0").innerHTML = dictionary[choices[0]].French;
    document.getElementById("choice1").innerHTML = dictionary[choices[1]].French;
    document.getElementById("choice2").innerHTML = dictionary[choices[2]].French;
    document.getElementById("choice3").innerHTML = dictionary[choices[3]].French;
    
}