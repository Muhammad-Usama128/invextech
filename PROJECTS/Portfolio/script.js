if (screen.width > 480) {
  document.querySelector(".woman").addEventListener("mouseover", () => {
    document.querySelector(".text-info").style.top = "425px";
    document.querySelector(".experience").style.top = "160px";
    document.querySelector(".rating").style.top = "160px";
  });
  document.querySelector(".woman").addEventListener("mouseout", () => {
    document.querySelector(".text-info").style.top = "78px";
    document.querySelector(".experience").style.top = "375px";
    document.querySelector(".rating").style.top = "375px";
  });
}
document.querySelector(".hire-me").addEventListener("mouseover", () => {
  document.querySelector(".hire-me").classList.add("active");
  document.querySelector(".portfolio").classList.remove("active");
});
document.querySelector(".hire-me").addEventListener("mouseout", () => {
  document.querySelector(".hire-me").classList.remove("active");
  document.querySelector(".portfolio").classList.add("active");
});
document.querySelector("#services").addEventListener("mouseout", () => {
  document.querySelector(".popcorn-left").classList.add("popleftprevstate");
});
document.querySelector("#services").addEventListener("mouseout", () => {
  document.querySelector(".popcorn-middle").classList.add("popmiddleprevstate");
});
document.querySelector("#services").addEventListener("mouseout", () => {
  document.querySelector(".popcorn-right").classList.add("poprightprevstate");
});
document.querySelector(".burger").addEventListener("click", () => {
  document.querySelector(".nav-small").style.left = "0px";
  document.querySelector("body").style.overflowY = "hidden";
});
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".nav-small").style.left = "-100%";
  document.querySelector("body").style.overflowY = "auto";
});
