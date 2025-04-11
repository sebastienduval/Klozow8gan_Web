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

function containsIgnoreCase(string1, string2)
{
  return string1.toUpperCase().includes(string2.toUpperCase());
}

function normalizeString(string) 
{
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeDuplicates(strings) 
{
  return Array.from(new Set(strings));
}

function findDuplicates(strings) 
{
  const map = new Map();
  const duplicates = [];

  for (const string of strings) 
  {
    if (map.has(string)) 
    {
      map.set(string, map.get(string) + 1); // Increment count
    } 
    else 
    {
      map.set(string, 1); // Initialize count
    }
  }

  for (const [key, value] of map) 
  {
    if (value > 1) 
    {
      duplicates.push(key);
    }
  }

  return duplicates;
}
