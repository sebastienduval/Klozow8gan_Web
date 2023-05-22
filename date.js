function GenerateDate(date)
{
    const DaysOfWeek = ["sanda", "kizsanda", "nisda alokan", "nasda alokan", "iawda alokan", "skawategwikizgat", "kadaw sanda"];
    const Months = ["alamikos", "pia8dagos", "mozokas", "sogalikas", "kikas", "nokahigas", "tmaskikos", "tmez8was", "skamonkas", "pnibagos", "mzatanos", "pbonkas"];

    const DayOfWeek = DaysOfWeek[date.getDay()];
    const Month = Months[date.getMonth()];

    return GetFirstLetterUpperCase(DayOfWeek) + ", " + GenerateNumber(date.getDate()) + " " + Month + ", " + GenerateNumber(date.getFullYear()) + " kasigaden.";
}

function GenerateTime(date)
{
    const minutes = date.getMinutes();
    var result = GetFirstLetterUpperCase(GenerateNumber(date.getHours(), NumberType.Inanimate)) + " kas8mkipoda";
    if ( minutes > 0 )
    {
        result += " " + GenerateNumber(date.getMinutes(), NumberType.Inanimate) + " ";
        if ( minutes == 1 )
        {
            result += "minit"; 
        }
        else
        {
            result += "minital";            
        }
    }
    result += ".";
    return result;
}