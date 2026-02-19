class NumberType
{
    static Animate = new NumberType("animate");
    static Inanimate = new NumberType("inanimate");
    static Neutral = new NumberType("neutral");

    constructor(name)
    {
        this.name = name;
    }
}

function GenerateNumber(number, type=NumberType.Neutral)
{
    const AnimateFigures = [ "ndakagwi", "pazgo", "niswak", "nlhoak", "iawak", "n8nnoak" ];
    const InanimateFigures = [ "ndakagwi", "pazgwen", "nisnol","nhenol", "iawnol", "n8nnenol" ];
    const Figures = [ "ndakagwi", "pazokw", "nis", "nas", "iaw", "n8lan", "ngwed8s", "t8baw8s", "ns8zek", "noliwi" ];
    const Teens = [ "mdala", "ngwed8kaw", "nis8kaw", "nas8kaw", "iaw8kaw", "n8nn8kaw", "ngwed8s kas8kaw", "t8baw8s kas8kaw", "ns8zek kas8kaw", "noliwi kas8kaw" ];

    const Tens = [ "nisinska", "nasinska", "iawinska", "n8nninska", "ngwed8s kasinska", "t8baw8s kasinska", "ns8zek kasinska", "noliwi kasinska" ];
    const Hundreds = [ "ngwedatgwa", "nisatgwa", "nasatgwa", "iawatgwa", "n8nnatgwa", "ngwed8s kasatgwa", "t8baw8s kasatgwa", "ns8zek kasatgwa", "noliwi kasatgwa" ];
    const Thousands = [ "ngwed8mkwaki", "nis8mkwaki", "nas8mkwaki", "iaw8mkwaki", "n8nn8mkwaki", "ngwed8s kas8mkwaki", "ngwed8s kas8mkwaki", "t8baw8s kas8mkwaki", "ns8zek kas8mkwaki", "noliwi kas8mkwaki" ];

    let result = "";
    if (number < 10)
    {
        // Exceptions for the first five figures.
        if (type != NumberType.Neutral && Number != 0 && Number <= 5)
        {
            if ( type == NumberType.Animate )
            {
                result = AnimateFigures[Number];
            }
            else if ( type == NumberType.Inanimate )
            {
                result = InanimateFigures[Number];
            }
        }
        else
        {
            result = Figures[number];
        }
    }
    else if (number < 20)
    {
        result = Teens[number - 10];
    }
    else if (number < 100)
    {
        result += Tens[Math.floor(number / 10) - 2];
        if (number % 10 > 0)
        {
            result += " taba " + GenerateNumber(number % 10/*, Type.Neutral*/);
        }
    }
    else if (number < 1000)
    {
        result = Hundreds[Math.floor(number / 100) - 1];
        if (number % 100 != 0)
        {
            result += " taba " + GenerateNumber(number % 100/*, Type.Neutral*/);
        }
    }
    else if (number < 10000)
    {
        result = Thousands[Math.floor(number / 1000)];
        if (number % 1000 != 0)
        {
            result += " taba " + GenerateNumber(number % 1000/*, Type.Neutral*/);
        }
    }
    else if (number < 1000000)
    {
        result = GenerateNumber(Math.floor(number / 1000)) + " kas8mkwaki";
        if (number % 1000 != 0)
        {
            result += " taba " + GenerateNumber(number % 1000/*, Type.Neutral*/);
        }
    }        
    return result;
}

function GenerateNumberDictionary(maxNumber)
{
    var result = [];
    
    for (let i = 0; i <= maxNumber; i++) 
    {
        result.push({"Abenaki":GenerateNumber(i),"French":i});
    }    
    return result;
}