const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const smallElement = formControl.querySelector('small');
  smallElement.innerText = message;
};

// Show success
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Get field name and make the first letter uppercase
const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check email validity
const checkEmail = input => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

// Check required fields
const checkRequired = inputArray => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check length of an input
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else showSuccess(input);
};

// Password match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords not match');
  }
};

// Event Listeners
form.addEventListener('submit', event => {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
