// Modes
const imperativeMode = 'Impératif';
const independantMode = 'Indépendant';
const conjunctiveMode = 'Conjonctif';
const modes = [imperativeMode, independantMode, conjunctiveMode];

// Tenses
const tempsPresent = "Présent";
const tempsFuture = "Future";
const tempsConditionnel = "Conditionnel";
const tempsPasseCompose = "Passé Composé";
const tempsImparfait = "Imparfait";
const tempsImperatif = "Impératif";
const tempsDeConjugaison = [tempsPresent, tempsFuture, tempsConditionnel, tempsPasseCompose, tempsImparfait, tempsImperatif];

const descriptionDeTempsDeConjugaison = new Map()
descriptionDeTempsDeConjugaison
    .set(tempsPresent,  "au présent")
    .set(tempsFuture, "au future")
    .set(tempsConditionnel, "au conditionnel")
    .set(tempsPasseCompose, "au passé composé")
    .set(tempsImparfait, "à l'imparfait")
    .set(tempsImperatif, "à l'impératif présent");       
    
const personsDescription = [
    "1re personne du singulier", 
    "2e personne du singulier",
    "3e personne du singulier",
    "1re personne du pluriel (ex)",
    "1re personne du pluriel (in)",
    "2e personne du pluriel",
    "3e personne du pluriel"];    

function GetPronoun(Index, Root, Definite, VerbTense)
{
    if ( VerbTense == tempsImperatif )
    {
        return "";
    }

    const Pronouns = [ "n", "k", "w", "n", "k", "k", "w" ];
    var Pronoun = Pronouns[Index];
    if ( !Definite && (Index == 2 || Index ==6) )
    {
        Pronoun = "";
    }
    else
    {
        if ( StartsWithVowel(Root) )
        {
            Pronoun += "d";
        }
        Pronoun += "'";        
    }
    return Pronoun;
}

function GetExtraTenseVerbEndings(VerbTense)
{
    var ExtraTenseEnding = "";
    if ( VerbTense == tempsFuture )
    {
        ExtraTenseEnding = "ji";
    }
    else if ( VerbTense == tempsConditionnel )
    {
        ExtraTenseEnding = "ba";
    }
    return ExtraTenseEnding;
}

function GetConjugationIndices(VerbTense, LastChar)
{
    if ( VerbTense == tempsImperatif )
    {
        return [1, 4, 5];
    }
    return [0, 1, 2, 3,4, 5, 6];
}

function GetVerbEndings(VerbTense, LastChar)
{
    var EffectiveVerbTense = VerbTense;
    if ( VerbTense == tempsPasseCompose || VerbTense == tempsFuture || VerbTense == tempsConditionnel)
    {
        EffectiveVerbTense = tempsPresent;
    }

    var TenseMap = new Map();

    var PresentMap = new Map();
    PresentMap.set("a", ["a", "a", "a", "abna", "abna", "aba", "ak"]);
    PresentMap.set("i", ["i", "i", "o", "ibna", "ibna", "iba", "oak"]);
    PresentMap.set("8", ["8", "8", "a", "8bna", "8bna", "8ba", "ak"]);
    PresentMap.set("o", ["o", "o", "o", "obna", "obna", "oba", "oak"]);
    PresentMap.set("m", ["m", "m", "m", "mobna", "mobna", "moba", "mok"]);

    var PastMap = new Map();
    PastMap.set("a", ["ab", "ab", "ab", "abnob", "abnob", "ab8b", "abanik"]);
    PastMap.set("i", ["ib", "ib", "ob", "ibnob", "ibnob", "ib8b", "obanik"]);
    PastMap.set("8", ["8b", "8b", "ab", "8bnob", "8bnob", "8b8b", "abanik"]);
    PastMap.set("o", ["ob", "ob", "ob", "obnob", "obnob", "ob8b", "obanik"]);
    PastMap.set("m", ["mob", "mob", "mob", "mobnob", "mobnob", "mob8b", "mobanki"]);  
    
    TenseMap.set(tempsPresent, PresentMap);
    TenseMap.set(tempsImparfait, PastMap);

    var ImperativeMap = new Map();    
    ImperativeMap.set("a", ["", "a", "aj", "ada", "ada", "akw", "adij"]);
    ImperativeMap.set("i", ["", "i", "ij", "ida", "ida", "ikw", "idij"]);
    ImperativeMap.set("8", ["", "a", "8j", "8da", "8da", "okw", "8dij"]);
    ImperativeMap.set("o", ["", "o", "oj", "oda", "oda", "okw", "odij"]);
    ImperativeMap.set("m", ["", "a", "ej", "moda", "moda", "mokw", "moodij"]);
    TenseMap.set(tempsImperatif, ImperativeMap);

    const EndingMap = TenseMap.get(EffectiveVerbTense);
    return EndingMap.get(LastChar);
}

// Given a verb root, slice the ending to be conjugated.
function SliceVerbRootEnding(Index, VerbRoot, VerbTense)
{
    // Special case at the imperative order where K'waj8nem (you own something inanimate) 
    // becomes Waj8na (own something inanimate).
    if ( VerbTense == tempsImperatif && Index == 1 && VerbRoot.endsWith("m") )
    {
        return VerbRoot.slice(0, -2);
    }
    return VerbRoot.slice(0, -1);
}

function GetIntro(VerbTense)
{
    if ( VerbTense == tempsPasseCompose )
    {
        return "Kizi ";
    }
    return "";
}

function Conjugate(VerbRoot, VerbTense) 
{
    var Conjugations = [];

    // Slice the pronoun.
    if ( startsWithIgnoreCase(VerbRoot, "n'") )
    {
        VerbRoot = VerbRoot.slice(2);
    }
    if ( startsWithIgnoreCase(VerbRoot, "nd'") )
    {
        VerbRoot = VerbRoot.slice(3);
    }    

    const LastChar = VerbRoot.substr(VerbRoot.length - 1);
    const LastTwoChar = VerbRoot.substr(VerbRoot.length - 2);
    const Endings = GetVerbEndings(VerbTense, LastChar);
    const ExtraTenseVerbEnding = GetExtraTenseVerbEndings(VerbTense);

    const Indices = GetConjugationIndices(VerbTense);

    Indices.forEach(i => 
    {
        var Pronoun = GetPronoun(i, VerbRoot, false, VerbTense);


        var Conjugation = GetIntro(VerbTense) + Pronoun + SliceVerbRootEnding(i, VerbRoot, VerbTense) + Endings[i];
        if ( VerbTense == tempsImperatif && i == 1 && LastTwoChar == "am" )
        {
            Conjugation += "a";
        }

        Conjugation = GetFirstLetterUpperCase(Conjugation + ExtraTenseVerbEnding);

        Conjugations.push({ "Spelling" : Conjugation, "Index" : i});
    } 
    ); 

    return Conjugations;
}

function ConjugateToHtmlElement(elementName) 
{

    var VerbRoot = document.getElementById("VerbRoot").value;
    var VerbTense = document.getElementById("Tense").value;   

    const Conjugations = Conjugate(VerbRoot, VerbTense);

    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo").innerHTML += VerbTense + "<br><br>";

    Conjugations.forEach(Conjugation => 
    {
        document.getElementById(elementName).innerHTML += Conjugation.Spelling + "<br>";
    } 
    ); 
}
