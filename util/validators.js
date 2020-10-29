export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === '') errors.username = 'Username must not be empty.';

  if (email.trim() === '') {
    errors.email = 'Email must not be empty.';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be in a valid format';
    }
  }

  if (password === '') {
    errors.password = 'Password must not be empty.';
  } else if (confirmPassword == '') {
    errors.confirmPassword = 'Confirm password field is empty';
  } else if (password !== confirmPassword) {
    errors.passwordsMismatch = 'Both password and confirm password must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Please introduce your username.';
  }
  if (password === '') {
    errors.password = 'Please enter your password.';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
