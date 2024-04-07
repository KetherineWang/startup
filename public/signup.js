async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser(event) {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const newUsername = document.querySelector("#newUsername")?.value;
  const newPassword = document.querySelector("#newPassword")?.value;
  const response = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify({ email: newUsername, password: newPassword }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    localStorage.setItem("newUsername", newUsername);
    window.location.href = "login.html";
  } else {
    const body = await response.json();
    const modalEl = document.querySelector("#msgModal");
    modalEl.querySelector(".modal-body").textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}

function logout() {
  localStorage.removeItem("newUsername");
  fetch(`/api/auth/logout`, {
    method: "delete",
  }).then(() => (window.location.href = "/"));
}

async function getUser(email) {
  const response = await fetch(`/api/user/${email}`);
  if (response.status === 200) {
    return response.json();
  }

  return null;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}
