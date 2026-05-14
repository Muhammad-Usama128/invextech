import api from "./lib/api.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await api.get("/check-auth");
    window.location.href = "/";
    return;
  } catch (error) {
    console.log("Please log in.");
  }

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (email !== "" && password !== "") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(email)) {
        if (password.length >= 6) {
          console.log("login successfully");
          const res = await api.post("/login", { email, password });
          console.log(res.data);
          window.location.href = "/";
        } else {
          alert("Password must be at least 6 characters long.");
        }
      } else {
        alert("Please enter a valid email address.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  });
});
