const checkPassword = (password) => {
  if (password === '') return false;
  if (password !== '') {
    if (password.trim().length >= 6) {
      return true;
    } else {
      return false;
    }
  }
};

export default checkPassword;
