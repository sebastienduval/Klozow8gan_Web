
var choiceEntries = [];
var answerIndex = 0;
var currentDictionary;
var isQuestionPlural = false;
var validated = false;

const DIFFICULTY_PLURAL = 'Pluriels';

class Game
{
    static difficulties = ['Très facile', 'Facile', 'Moyen', 'Difficile', 'Très difficile'];
    static learningSteps = [1, 3, 2, 2, 2];
    static learnedScore =  Game.learningSteps.reduce((sum, v) => sum + v, 0);
    static veryHardScore =  Game.learningSteps.slice(0, -1).reduce((sum, v) => sum + v, 0);    
    static wordClusterSize = 32;   
    static generateDifficultyFromScore(score)
    {
        let learningStep = Game.learningSteps;
        if ( learningStep < 0 )
        {
            learningStep = 3;
        }
        
        let difficultyIndex = 0;
        let currentDifficulty = 0;
        for ( let i = 0; i < Game.learningSteps.length; i ++ )
        {
            currentDifficulty += Game.learningSteps[i];
            if ( score < currentDifficulty )
            {
                difficultyIndex = i;
                break;
            }
        }

        let difficulty = Game.difficulties[difficultyIndex];
        return difficulty;
    }
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function validate(index) 
{
    if ( !validated )
    {
        const good = index == answerIndex;

        if ( good )
        {
            Learning.updateWordScore(currentDictionary[choiceEntries[answerIndex]].Abenaki, 1);
        }

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
        validated = true;
    }
}

function generateHardAnswer()
{
    const answerEntry = currentDictionary[choiceEntries[answerIndex]];
    var answer = answerEntry.Abenaki.toLowerCase();
    if ( isQuestionPlural )
    {
        const animate = isAnimate(answerEntry);
        // For now, words are all considered independant as it won't affect plural.
        answer = GenerateNoun(answer, animate, true, false, false, false);
    }
    return answer;    
}

function validateHard()
{
    if ( !validated )
    {    
        console.log('validateHard');
        const value = document.getElementById("hardQuestionInput").value.toLowerCase();
        const hardQuestionAnswer = generateHardAnswer()

        const good = value == hardQuestionAnswer;
        if ( good )
        {
            Learning.updateWordScore(currentDictionary[choiceEntries[answerIndex]].Abenaki, 1);
        }    

        document.getElementById("hardQuestionAnswer").innerHTML = hardQuestionAnswer;
        document.getElementById("hardQuestionAnswer").hidden = false;
        if ( good )
        {        
            document.getElementById("hardQuestionAnswer").style = "color:green";
        }
        else
        {
            document.getElementById("hardQuestionAnswer").style = "color:red";
        }
        document.getElementById("next").hidden = false;
        validated = true;
    }
}

function reset()
{
    isQuestionPlural = false;
    validated = false;
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
    if ( isQuestionPlural )
    {
        document.getElementById("question").textContent = "Écrire le mot en abénaki AU PLURIEL qui correspond le mieux à cette définition: \"" + dictionary[choiceEntries[answerIndex]].French + " (Pluriel) \"?";
    }
    else
    {
        document.getElementById("question").textContent = "Écrire le mot en abénaki qui correspond le mieux à cette définition: \"" + dictionary[choiceEntries[answerIndex]].French + "\"?";
    }
    document.getElementById("hardQuestion").hidden = false;
    if ( hintLettersCount > 0 )
    { 
        document.getElementById("hardQuestionInput").placeholder = generateHardAnswer().substring(0,3) + "...";     
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
    // Lowercase the input.
    wordList = wordList.map(word => word.toLowerCase());
    wordList = removeDuplicates(wordList);
 
    // Get the user score for every word.
    let scoredWords = [];
    for ( const word of wordList )
    {
        if ( word )
        {
            scoredWords.push({ word: word, score: Learning.getWordScore(word)});
        }
        else
        {
            console.log("Invalid word!");
        }
    }

    // Sort them by score.
    scoredWords.sort((a, b) => { return a.score < b.score; });

    let finalWordList = [];
    for ( const scoredWord of scoredWords )
    {
        if ( finalWordList.length > Game.wordClusterSize )
        {
            break;
        }
        if ( scoredWord.score < Game.learnedScore )
        {
            finalWordList.push(scoredWord.word);
        }
    }

    generateQuestionFromIndices(dictionary, DictionaryUtils.convertAbenakiWordListToIndices(dictionary, finalWordList));    
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
    for (let i = 0; i < 6 && indices.length > 0; i++) 
    {
        const index = indices.splice(getRandomInt(indices.length), 1)[0];
        choiceEntries.push(index);
    }

    if ( choiceEntries.length > 0 )
    {
        let chosenIndex = choiceEntries[0];
        let chosenWord = currentDictionary[chosenIndex].Abenaki; 
        let chosenWordScore = Learning.getWordScore(chosenWord);
        let difficulty = Game.generateDifficultyFromScore(chosenWordScore);

        var generateMultipleChoiceQuestion = false;
        var generatePluralQuestions = false;

        var choiceCount = 1;
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
        else if ( difficulty == DIFFICULTY_PLURAL )
        {
            hintLettersCount = 0;
            generatePluralQuestions = true;
        }

        console.log('choiceCount: ' + choiceCount);        
        choiceEntries = choiceEntries.splice(0, choiceCount);
        answerIndex = getRandomInt(choiceEntries.length);

        if ( generateMultipleChoiceQuestion )
        {        
            let temp = choiceEntries[0];
            choiceEntries[0] = choiceEntries[answerIndex];
            choiceEntries[answerIndex] = temp;

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
            generateHardQuestionFromIndices(dictionary, hintLettersCount, generatePluralQuestions);
        }

        console.log(choiceEntries);
    }
}

function generateHardQuestionFromIndices(dictionary, hintLettersCount, generatePluralQuestions=false)
{    
    currentDictionary = dictionary;
    reset();

    answerIndex = 0;
    isQuestionPlural = generatePluralQuestions && isNoun(currentDictionary[choiceEntries[answerIndex]]);    
    fillHardQuestionTypeFrenchToAbenaki(document, dictionary, hintLettersCount);  
}

function onCategoryChanged()
{
    generateQuestionFromCategory(dictionary, document.getElementById("categories").value);
}

function formatDifficulties(data, selectName, supportPlural = false)
{
    const defaultSelected = 'Facile';
    var select = document.getElementById(selectName);
    const difficulties = Game.difficulties;
    if ( supportPlural )
    {
        Game.difficulties.push(DIFFICULTY_PLURAL);
    }
    var innerHTML = "";
    for ( const difficulty of difficulties )
    {
        var extra = difficulty == defaultSelected ? 'selected' : '';
        innerHTML += '<option value="' + difficulty + '" ' + extra + '>' + difficulty + '</option>';
    }
    select.innerHTML += innerHTML;
}

function revision()
{
    for ( let word of getWordList() )
    {
        let score = Learning.getWordScore(word);
        if ( score > Game.veryHardScore )
        {
            Learning.setWordScore(word, Game.veryHardScore);
        }
    }
}

/// Add the necessary View code to support questions.
function addGameHtmlTo(elementId, updateQuestion)
{
    var element = document.getElementById(elementId);

    var innerHTML = "";

    innerHTML += '<br>';
    innerHTML += '<select name="difficulties" id="difficulties" hidden=true onchange="' + updateQuestion + '">'
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
    innerHTML += '</br>';
    innerHTML += '<input type="button" name="revision" value="Révision" title="Tous les mots appris seront re-suggérés comme questions difficiles." onclick="revision()"/>';

    element.innerHTML += innerHTML;
}
