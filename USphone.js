
main();

function main() {
	let testCases = [
		["555-555-5555","true"],
		["(555)555-5555","true"],
		["(555) 555-5555","true"],
		["555 555 5555","true"],
		["5555555555","true"],
		["1 555 555 5555","true"],
		["1 555)555-5555","false"],
		["555)555-5555","false"]
	];

	testCases.forEach(function(value){
		console.log(value);
		console.log("\n" + telephoneCheck(value[0]) + "\n\n");
	});
}

/**
 * Checks to see if a string is a valid US Phone Number.
 * @author Johnny Chavez
 * @param {String} phone 
 */
function telephoneCheck(phone){
	console.log("checking number: " + phone);

	//Get rid of US international code +1
	let str = checkForOne(phone);
	
	//Cases when the phone number contains '-' or '_'.
	if(((isDash(str,3) && isDash(str,7)) || (isSpace(str,3) && isSpace(str,7))) && remainingDigits(str, [3,7],11)) 
		return true;
	//Cases for when the phone number contains '-' or '_' or '(',')'
	if(((isDash(str, 8) && remainingDigits(str,[0,4,8],12)) || (isSpace(str,5) && isDash(str, 9) && remainingDigits(str, [0,4,5,9], 13))) && isP(str,0) && isP(str,4))
		return true;

	//Cases for when the phone number is only digits with no International Code.
	if(areDigits(str) && str.length === 10)
		return true;
	
	if(isSpace(str, 1) && isSpace(str, 5) && isSpace(str, 9) && remainingDigits(str,[1,5,9],13))
		return true;

	return false;
}

/**
 * Checks if a character is either an opening or closing parenthesis.
 * @param {String} str
 * @param {Number} pos
 * @returns {boolean} 
 */
function isP(str, pos) {
	return str.charCodeAt(pos) === 40 || str.charCodeAt(pos) === 41;
}

/**
 * Checks if a character is a dash '-'.
 * @param {String} str 
 * @param {number} pos 
 * @returns {boolean} true if the character is a '-'.
 */
function isDash(str, pos) {
	return str.charCodeAt(pos) === 45;
}

/**
 * Checks if a character is an empty space.
 * @param {String} str 
 * @param {number} pos 
 */
function isSpace(str, pos) {
	return str.charCodeAt(pos) === 32;
}

/**
 * Checks if the character is a digit. {0,...,9}
 * @param {String} str 
 * @param {number} pos 
 */
function isDigit(str, pos) {
	let code = str.charCodeAt(pos);
	return code >= 48 && code <= 57
}

/**
 * Checks if there is some character in str that is not a digit.
 * @param {String} str 
 */
function areDigits(str) {
	let arr = str.split("");
	return !arr.some(function(element){
		return !isDigit(element,0);
	});
}

/**
 * Checks to see if all characters in str that are not in chkd[] are digits.
 * @param {String} str The String to be checked.
 * @param {number[]} chkd  An int[] of indexes that have been checked.
 * @param {number} max The max length for this case.
 * @return {boolean} true if all unchecked indexes within the range are digits.
 */
function remainingDigits(str, chkd, max){
	//check that max is the actual max of the string.
	if(str.length !== max + 1){
		console.log("str length: " + str.length + "\nmax: " + max);
		return false;
	}

	//Get unchecked indexes of the string.
	let unChkd = [];
	for(let x = 0; x <= max; x++){
		if(!chkd.includes(x))
			unChkd.push(x);
	}
	
	//return false if unChkd are not digits
	let result = true;
	for(let x = 0; x < unChkd.length; x++){
		if(!isDigit(str,unChkd[x]))
			result = false;
	}
	
	return result;
}

function checkForOne(str){
	let code = str.charCodeAt(0);
	if(code === 49 || isSpace(str,0))
		return checkForOne(str.substring(1));
	return str;
}
