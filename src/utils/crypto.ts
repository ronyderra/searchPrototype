import bigInt from "big-integer";
import { v4 as uuidv4 } from "uuid";

export function elegantPair(x, y) {
  const p = x >= y ? x * x + x + y : y * y + x;
  const hash = uuidv4();
  return replaceLastSubstring(hash, p);
}
export function elegantUnpair(p: string) {
  const z = Number(getLastSubstringAfterDash(p));
  var sqrtz = Math.floor(Math.sqrt(z)),
    sqz = sqrtz * sqrtz;
  return z - sqz >= sqrtz ? [sqrtz, z - sqz - sqrtz] : [z - sqz, sqrtz];
}

function replaceLastSubstring(originalString, newUserInput) {
  // Find the position of the last dash in the string
  const lastDashIndex = originalString.lastIndexOf("-");

  if (lastDashIndex === -1) {
    return originalString; // No dash found, return the original string
  }

  // Create a new string with the user input replacing the substring after the last dash
  const newString =
    originalString.substring(0, lastDashIndex + 1) + newUserInput;

  return newString;
}
function getLastSubstringAfterDash(originalString) {
  // Find the position of the last dash in the string
  const lastDashIndex = originalString.lastIndexOf("-");

  // If no dash found, return an empty string or null based on your requirement
  if (lastDashIndex === -1) {
    return "";
  }

  // Extract the substring after the last dash
  const lastSubstring = originalString.substring(lastDashIndex + 1);

  return lastSubstring;
}
