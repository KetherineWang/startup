function signup() {
  const newUsernameEl = document.querySelector("#newUsername");
  const newPasswordEl = document.querySelector("#newPassword");
  const emailEl = document.querySelector("#email");
  localStorage.setItem("newUsername", newUsernameEl.value);
  localStorage.setItem("newPassword", newPasswordEl.value);
  localStorage.setItem("email", emailEl.value);
  window.location.href = "index.html";
}
