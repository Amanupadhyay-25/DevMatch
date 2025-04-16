const validator = require("validator");

const validateSignUpdata = (req) => {
    const { firstName, lastName, emailId, password, age } = req.body;

    if (!firstName || firstName.length < 2 || firstName.length > 50) {
        throw new Error("First name must be between 2 and 50 characters.");
    }

    if (!lastName || lastName.length < 2 || lastName.length > 50) {
        throw new Error("Last name must be between 2 and 50 characters.");
    }

    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email is not valid.");
    }

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
    }

    if (!age || typeof age !== "number" || age < 18 || age > 65) {
        throw new Error("Age must be a number between 18 and 65.");
    }
};

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "age"]

const isEditAllowed =Object.keys(req.body).every(field=>
   allowedEditFields.includes(field)
);
return isEditAllowed;
}

module.exports = { validateSignUpdata,
   validateEditProfileData
};
