function GenerateDate(date)
{
    const DaysOfWeek = ["sanda", "kizsanda", "nisda alokan", "nasda alokan", "iawda alokan", "skawategwikizgat", "kadaw sanda"];
    const Months = ["alamikos", "pia8dagos", "mozokas", "sogalikas", "kikas", "nokahigas", "tmaskikos", "tmez8was", "skamonkas", "pnibagos", "mzatanos", "pbonkas"];

    const DayOfWeek = DaysOfWeek[date.getDay()];
    const Month = Months[date.getMonth()];

    return DayOfWeek + ", " + GenerateNumber(date.getDate()) + " " + Month + ", " + GenerateNumber(date.getFullYear()) + " kasigaden.";
}