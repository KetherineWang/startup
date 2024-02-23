function signup() {
    const newNameEl = document.querySelector("#new_name");
    const newPasswordEl = document.querySelector("#new_password")
    const emailEl = document.querySelector("#email")
    localStorage.setItem("newUserame", newNameEl.value);
    localStorage.setItem("newPassword", newPasswordEl.value);
    localStorage.setItem("email", emailEl.value)
    window.location.href = "index.html";
  }