const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const form = document.querySelector("#signup");

const checkUsername = () => {
  let valid = false;

  const min = 3,
    max = 25;

  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "The password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

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

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  // validate fields
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);

// // 1. form validation

// const firstName = document.getElementById("fname");
// const lastName = document.getElementById("lname");
// const password = document.getElementById("password");
// const email = document.getElementById("email");
// const form = document.getElementById("myForm");

// form.addEventlistener("submit", function (e) {
//   //prevents form from submitting once submit button is clicked.
//   e.preventDefault();

//   //validate forms
//   let isUsernameValid = checkUsername(),
//     isEmailValid = checkEmail(),
//     isPasswordValid = checkPassword(),
//     isConfirmPasswordValid = checkConfirmPassword();

//   let isFormValid =
//     isUsernameValid &&
//     isEmailValid &&
//     isPasswordValid &&
//     isConfirmPasswordValid;

//   // submit to the server if the form is valid
//   if (isFormValid) {
//   }
// });

// //2. resuable utility functions to check required fields/lenght/validity

// const isRequired = (value) => (value === "" ? false : true);

// //checks length argument is btwen min&max

// const isBetween = (length, min, max) =>
//   length < min || length > max ? false : true;

// //checking valid email

// const isEmailValid = (email) => {
//   const re =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email);
// };

// //check if password is strong/specified pattern using regex

// const isPasswordSecure = (password) => {
//   const re = new RegExp(
//     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
//   );
//   return re.test(password);
// };

// //3.functions that show error/success

// const showError = (input, message) => {
//   //get form-field element
//   const formField = input.parentElement;
//   //add error class
//   formField.classList.remove("success");
//   formField.classList.add("error");

//   //show error message
//   const error = formField.querySelector("small");
//   error.textContent = message;
// };

// //Unlike the showError() function, the showSuccess() function removes the error class,
// //adds the success class, and set the error message to blank.

// const showSuccess = (input) => {
//   // get the form-field element
//   const formField = input.parentElement;

//   // remove the error class
//   formField.classList.remove("error");
//   formField.classList.add("success");

//   // hide the error message
//   const error = formField.querySelector("small");
//   error.textContent = "";
// };

// //4. validate username field/ functions returns true if field passes the checks

// const checkUsername = () => {
//   let valid = false;
//   const min = 3;
//   const max = 25;
//   const username = fname1.value.trim();

//   if (!isRequired(username)) {
//     showError(fname1, "first name cannot be blank.");
//   } else if (!isBetween(username.length, min, max)) {
//     showError(
//       fname1,
//       `first name must be between ${min} and ${max} characters`
//     );
//   } else {
//     showSuccess(fname1);
//     valid = true;
//   }
//   return valid;
// };

// //5. validate email field/ returns true if email provided and valid

// const checkEmail = () => {
//   let valid = false;
//   const email = email.value.trim();

//   if (!isRequired(email)) {
//     showError(email, "Email cannot be blank.");
//   } else if (!isEmailValid(email)) {
//     showError(email, "Email is not valid.");
//   } else {
//     showSuccess(email);
//     valid = true;
//   }
//   return valid;
// };

// //6. validate password field

// const checkPassword = () => {
//   let valid = false;

//   const password = password.value.trim();

//   if (!isRequired(password)) {
//     showError(password, "Password cannot be blank.");
//   } else if (!isPasswordSecure(password)) {
//     showError(
//       password,
//       "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
//     );
//   } else {
//     showSuccess(password);
//     valid = true;
//   }

//   return valid;
// };

// //7. validate confirm password field

// const checkConfirmPassword = () => {
//   let valid = false;
//   // check confirm password
//   const confirmPassword = confirmPasswordEl.value.trim();
//   const password = passwordEl.value.trim();

//   if (!isRequired(confirmPassword)) {
//     showError(confirmPasswordEl, "Please enter the password again");
//   } else if (password !== confirmPassword) {
//     showError(confirmPasswordEl, "Confirm password does not match");
//   } else {
//     showSuccess(confirmPasswordEl);
//     valid = true;
//   }

//   return valid;
// };

// //8.Instant feedback feature for the form submit
// //using event delegation to attach event listener to form &
// //validate each field based on the current field id:

// form.addEventlistener("submit", function (e) {
//   switch (e.target.id) {
//     case "username":
//       checkUsername();
//       break;
//     case "email":
//       checkEmail();
//       break;
//     case "password":
//       checkPassword();
//       break;
//     case "confirm-password":
//       checkConfirmPassword();
//       break;
//   }
// });
