// 1. form validation

const firstName = document.getElementById("fname");
const lastName = document.getElementById("lname");
const password = document.getElementById("password");
const email = document.getElementById("email");
const myform = document.getElementById("myForm");

const myForm = document.getElementById("myForm");

//prevents form from submitting once submit button is clicked.
myForm.addEventlistener("submit", function (e) {
  e.preventDefault();
});

//2. resuable utility functions to check required fields/lenght/validity

const isRequired = (value) => (value === "" ? false : true);

//checks length argument is btwen min&max

const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

//checking valid email

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//check if password is strong/specified pattern using regex

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

//3.functions that show error/success

const showError = (input, message) => {
  //get form-field element
  const formField = input.parentElement;
  //add error class
  formField.classList.remove("success");
  formField.classList.add("error");

  //show error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

//Unlike the showError() function, the showSuccess() function removes the error class,
//adds the success class, and set the error message to blank.

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

//4. validate username field/ functions returns true if field passes the checks

const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 25;
  const username = fname1.value.trim();

  if (!isRequired(username)) {
    showError(fname1, "first name cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      fname1,
      `first name must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(fname1);
    valid = true;
  }
  return valid;
};

//5. validate email field/ returns true if email provided and valid

const checkEmail = () => {
  let valid = false;
  const email = email.value.trim();

  if (!isRequired(email)) {
    showError(email, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(email, "Email is not valid.");
  } else {
    showSuccess(email);
    valid = true;
  }
  return valid;
};

//6. validate password field

const checkPassword = () => {
  let valid = false;

  const password = password.value.trim();

  if (!isRequired(password)) {
    showError(password, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      password,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(password);
    valid = true;
  }

  return valid;
};
