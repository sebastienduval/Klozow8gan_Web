function GetPronoun(Index, Root, Definite)
{
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
    if ( VerbTense == "Futur" )
    {
        ExtraTenseEnding = "ji";
    }
    else if ( VerbTense == "Conditionnel" )
    {
        ExtraTenseEnding = "ba";
    }
    return ExtraTenseEnding;
}

function GetVerbEndings(VerbTense, LastChar)
{
    var EffectiveVerbTense = VerbTense;
    if ( VerbTense == "Passé Composé" || VerbTense == "Futur" || VerbTense == "Conditionnel")
    {
        EffectiveVerbTense = "Présent";
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
    
    TenseMap.set("Présent", PresentMap);
    TenseMap.set("Imparfait", PastMap);

    const EndingMap = TenseMap.get(EffectiveVerbTense);
    return EndingMap.get(LastChar);
}

function GetIntro(VerbTense)
{
    if ( VerbTense == "Passé Composé" )
    {
        return "Kizi ";
    }
    return "";
}

function Conjugate() 
{
    var VerbRoot = document.getElementById("VerbRoot").value;
    var VerbTense = document.getElementById("Tense").value;    

    const LastChar = VerbRoot.substr(VerbRoot.length - 1);   
    const Endings = GetVerbEndings(VerbTense, LastChar);

    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo").innerHTML += VerbTense + "<br><br>";

    const ExtraTenseVerbEnding = GetExtraTenseVerbEndings(VerbTense);

    for ( let i = 0; i < Endings.length; i++ )
    {
        var Pronoun = GetPronoun(i, VerbRoot, false);    
        const conjugation = GetFirstLetterUpperCase(GetIntro(VerbTense) + Pronoun + VerbRoot.slice(0, -1) + Endings[i] + ExtraTenseVerbEnding);
        document.getElementById("demo").innerHTML += conjugation + "<br>";
    }  
}
