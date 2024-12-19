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

export { checkNewAccountInputValidation }