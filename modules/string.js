const vowelSet = new Set(['a','i','o','8']);

export function getFirstLetterUpperCase(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function startsWithVowel(string) 
{
  return vowelSet.has(string[0]);
}

export function endsWithVowel(string)
{ 
  return vowelSet.has(string[string.length-1]);
}

export function startsWithIgnoreCase(string1, string2)
{
  return string1.toUpperCase().startsWith(string2.toUpperCase());
}

export function endsWithIgnoreCase(string1, string2)
{
  return string1.toUpperCase().endsWith(string2.toUpperCase());
}

export function containsIgnoreCase(string1, string2)
{
  return string1.toUpperCase().includes(string2.toUpperCase());
}

export function normalizeString(string) 
{
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sliceEnd(string, length) 
{
  if ( length > 0)
  {
    return string.slice(0, -length);
  }
  return string;
}

export function removeDuplicates(strings) 
{
  return Array.from(new Set(strings));
}

export function findDuplicates(strings) 
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
