import api from "./lib/api.js";
const getData = async () => {
  try {
    const res = await api.get("/");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
getData();

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await api.post("/logout");
        window.location.href = "/login.html";
      } catch (error) {
        console.log("Logout failed", error);
      }
    });
  }
});
