function StartsWithVowel(InputString) 
{
  const VowelRegex = new RegExp('^[aio8].*', 'i');
  return VowelRegex.test(InputString);
}

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

    var TerminationsMap = new Map();
    TerminationsMap.set("a", ["a", "a", "a", "abna", "abna", "aba", "ak"]);
    TerminationsMap.set("i", ["i", "i", "o", "ibna", "ibna", "iba", "oak"]);
    TerminationsMap.set("8", ["8", "8", "a", "8bna", "8bna", "8ba", "ak"]);
    TerminationsMap.set("o", ["o", "o", "o", "obna", "obna", "oba", "oak"]);
    TerminationsMap.set("m", ["m", "m", "m", "mobna", "mobna", "moba", "mok"]);

    const Terminations_i = ["i", "i", "o", "ibna", "ibna", "iba", "oak"];

    const LastChar = VerbRoot.substr(VerbRoot.length - 1);    
    const Terminations = TerminationsMap.get(LastChar);

    document.getElementById("demo").innerHTML = "";
    for ( let i = 0; i < Terminations.length; i++ )
    {
        var Pronoun = GetPronoun(i, VerbRoot, false);    
        document.getElementById("demo").innerHTML += Pronoun;
        document.getElementById("demo").innerHTML += VerbRoot.slice(0, -1) + Terminations[i];
        document.getElementById("demo").innerHTML +="<br>";
    }  
}