document.querySelector("#login-btn").addEventListener("click", function () {
  document.querySelector(".modal").classList.add("active");
});
document
  .querySelector(".modal close-btn")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("active");
  });
