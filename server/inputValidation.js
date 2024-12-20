function checkNewAccountInputValidation(newAccountFirstName, newAccountLastName, newAccountUserName){
    var missing = false;
    var missingFields = [];

    if (newAccountFirstName === "" || newAccountFirstName === undefined) {
        missing = true;
        missingFields.push("first name");
    }
    if (newAccountLastName === "" || newAccountLastName === undefined) {
        missing = true;
        missingFields.push("last name");
    }
    if (newAccountUserName === "" || newAccountUserName === undefined) {
        missing = true;
        missingFields.push("username");
    }

    if (missing) {
        let missingText = "Missing: "

        if (missingFields.length > 1) {
            // Add "and" before the last missing field
            missingText += missingFields.slice(0, -1).join(", ") + " and " + missingFields[missingFields.length - 1];
        } else {
            // Only one missing field
            missingText += missingFields[0];
        }
        return ({missing: true, message: missingText});
    }

    return ({missing: false});
}

function checkForIllegalChars(newAccountFirstName, newAccountLastName, newAccountUserName){
    var illegalCharInFields = [];
    var illegal = false;
    const illegalChar = /^[a-zA-Z]+$/;
    const illegalCharInUserName = /[^a-zA-Z0-9_]/

    if (!illegalChar.test(newAccountFirstName)){
        illegal = true;
        illegalCharInFields.push("first name");
    }
    if (!illegalChar.test(newAccountLastName)){
        illegal = true;
        illegalCharInFields.push("last name");
    }
    if (illegalCharInUserName.test(newAccountUserName)){
        illegal = true;
        illegalCharInFields.push("username");
    }

    if (illegal){
        var invalidCharsText = "Illegal characters in ";
        if (illegalCharInFields.length > 1){
            invalidCharsText += illegalCharInFields.slice(0,-1).join(", ") + " and " + illegalCharInFields[illegalCharInFields.length-1];
        }
        else {
            invalidCharsText += illegalCharInFields[0];
        }
        return ({invalid: true, message: invalidCharsText});
    }
    return ({invalid: false})
}

export { checkNewAccountInputValidation, checkForIllegalChars }