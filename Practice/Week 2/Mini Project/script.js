let error = document.querySelector(".error");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let message = document.querySelector("#message");

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "light");
}

document
  .querySelector("body")
  .setAttribute("data-theme", localStorage.getItem("theme"));
document.querySelector(".burglar").addEventListener("click", () => {
  document.querySelector(".navlink").classList.toggle("active");
});

document.querySelector(".themebtn").addEventListener("click", () => {
  const body = document.querySelector("body");
  const currentTheme = localStorage.getItem("theme");
  currentTheme === "light"
    ? body.setAttribute("data-theme", "dark")
    : body.setAttribute("data-theme", "light");
  localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
});

document.querySelector("form").addEventListener("input", () => {
  name.style.border = "1px solid var(--text)";
  message.style.border = "1px solid var(--text)";
  email.style.border = "1px solid var(--text)";
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (message.value === "" || message.value === null) {
    message.focus();
    message.style.border = "1px solid red";
  }
  if (email.value === "" || email.value === null) {
    email.style.border = "1px solid red";
    email.focus();
  }
  if (name.value === "" || name.value === null) {
    name.focus();
    name.style.border = "1px solid red";
  }
  if (name.value && email.value && message.value) {
    error.textContent = " Thank you for contacting me!";
    name.value = "";
    email.value = "";
    message.value = "";
    setTimeout(() => {
      error.textContent = "";
    }, 3000);
  }
});
