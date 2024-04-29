const vowelSet = new Set(['a','i','o','8']);

function GetFirstLetterUpperCase(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function StartsWithVowel(string) 
{
  return vowelSet.has(string[0]);
}

function EndsWithVowel(string)
{ 
  return vowelSet.has(string[string.length-1]);
}

function startsWithIgnoreCase(string1, string2)
{
  return string1.toUpperCase().startsWith(string2.toUpperCase());
}


