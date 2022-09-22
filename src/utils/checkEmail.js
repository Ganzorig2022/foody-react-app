export const checkEmail = (email) => {
  let emailRegex = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;

  if (email === '') return false;
  if (email !== '') {
    if (emailRegex.test(email.trim())) {
      return true;
    } else {
      return false;
    }
  }
};
