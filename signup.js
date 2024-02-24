function signup() {
    const newNameEl = document.querySelector("#newName");
    const newPasswordEl = document.querySelector("#newPassword")
    const emailEl = document.querySelector("#email")
    localStorage.setItem("newUserame", newNameEl.value);
    localStorage.setItem("newPassword", newPasswordEl.value);
    localStorage.setItem("email", emailEl.value)
    window.location.href = "index.html";
  }