/**
 * CODES:
 * 0-9 = [48,57]
 * () = 40,41 | valid at index {(0,4)}
 * "_" = 32 | valid at {(1,5,9),(3,7),5}
 * - = 45 | valid @ {(3,7),8,9}
 *
 * VALID:
 * 555-555-5555 -(3,7) | NUMBERS
 (555)555-5555 P(0,4) * -(8) * NUMBERS{1,%,12}
 (555) 555-5555 P(0,4) * s(5) * -(9) * NUM{1,%,13}
 555 555 5555 S(3,7) * NUM{0,%,11}
 5555555555 NUM{0,9}
 1 555 555 5555 S(1,5,9) * NUM{0,%,13}
 */



main();

function main() {
	console.log(telephoneCheck("1 555 555 5555"));
}

function telephoneCheck(str){
	console.log("checking number: " + str);
	//LOGICAL CASE VARIABLES
	//let a = isSpace(str, 3) && isSpace(str, 7);
	let b = isP(str, 0) && isP(str, 4);
	let c = isP(str, 8);
	let d = isSpace(str, 5);
	let e = isP(str, 9);
	/* let f = isSpace(str, 3) && isSpace(str, 7);
	let g = areDigits(str,0,9);
	let h = isSpace(str,1) && isSpace(str,5) && isSpace(str, 9); */
	
	
	if(((isDash(str,3) && isDash(str,7)) || (isSpace(str,3) && isSpace(str,7)))
		&& remainingDigits(str, [3,7],11)) {
		console.log("check 1: ");
		return true;
	}
	
	if(((isDash(str, 8) && remainingDigits(str,[0,4,8],12)) || (isSpace(str,5) && isDash(str, 9) && remainingDigits(str, [0,4,5,9], 13))) && isP(str,0) && isP(str,4))
		return true;
	
	if(areDigits(str,0,9))
		return true;
	
	if(isSpace(str, 1) && isSpace(str, 5) && isSpace(str, 9) && remainingDigits(str,[1,5,9],13))
		return true;
	
	return false;
}

function isP(str, pos) {
	return str.charCodeAt(pos) === 40 || str.charCodeAt(pos) === 41;
}

function isDash(str, pos) {
	return str.charCodeAt(pos) === 45;
}

function isSpace(str, pos) {
	return str.charCodeAt(pos) === 32;
}

function isDigit(str, pos) {
	let code = str.charCodeAt(pos);
	return code >= 48 && code <= 57
}

function areDigits(str, x, y) {
	let result = true;
	for(x; x <=y; x++){
		if(!isDigit(str, x))
			result = false;
	}
	return result;
}

/**
 *
 * @param str The String to be checked.
 * @param chkd  An int[] of indexes that have been checked.
 * @param max The max length for this case.
 * @return true if all unchecked indexes within the range are digits.
 */
function remainingDigits(str, chkd, max){
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
	console.log("c: " + chkd);
	console.log("unch: " + unChkd);
	return result;
}
