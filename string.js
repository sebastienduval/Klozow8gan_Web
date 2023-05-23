function GetFirstLetterUpperCase(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function StartsWithVowel(string) 
{
  const vowelRegex = new RegExp('^[aio8].*', 'i');
  return vowelRegex.test(string);
}

function EndsWithVowel(string) 
{
  const vowelRegex = new RegExp('^*.[aio8]', 'i');
  return vowelRegex.test(string);
}

