/// Given the name of a url parameter, return its value.
/// Example: http://dummy.com/?technology=jquery&blog=jquerybyexample
/// var tech = GetURLParameter('technology');
/// var blog = GetURLParameter('blog');
function GetURLParameter(param)
{
    console.log(param);
    var pageUrl = window.location.search.substring(1);
    var URLVariables = pageUrl.split('&');
    for (var i = 0; i < URLVariables.length; i++)
    {
        var parameterName = URLVariables[i].split('=');
        if (parameterName[0] == param)
        {
            return parameterName[1];
        }
    }
}