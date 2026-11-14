import { nthToken } from "./string.js";

export function isVerb(typeString)
{
    let type = nthToken(typeString, ';', 0);
    return type == 'VAI' || type == 'VII' || type == 'VTA' || type == 'VTI';
}