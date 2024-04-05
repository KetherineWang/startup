function login() {
  const usernameEl = document.querySelector("#username");
  const passwordEl = document.querySelector("#password");

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      window.location.href = "play.html";
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
}
