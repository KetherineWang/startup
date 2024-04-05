function signup() {
  const newUsernameEl = document.querySelector("#newUsername");
  const newPasswordEl = document.querySelector("#newPassword");
  const emailEl = document.querySelector("#email");

  fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: newUsernameEl.value,
      password: newPasswordEl.value,
      email: emailEl.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Signup failed:", error);
    });
}
