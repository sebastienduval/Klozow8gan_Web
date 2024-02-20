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

function Conjugate() 
{
    var VerbRoot = document.getElementById("VerbRoot").value;
    var VerbTense = document.getElementById("Tense").value;    

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

    const LastChar = VerbRoot.substr(VerbRoot.length - 1);   
    
    const TerminationsMap = TenseMap.get(VerbTense);
    const Terminations = TerminationsMap.get(LastChar);

    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo").innerHTML += VerbTense + "<br><br>";
    for ( let i = 0; i < Terminations.length; i++ )
    {
        var Pronoun = GetPronoun(i, VerbRoot, false);    
        const conjugation = GetFirstLetterUpperCase(Pronoun + VerbRoot.slice(0, -1) + Terminations[i]);
        document.getElementById("demo").innerHTML += conjugation + "<br>";
    }  
}
