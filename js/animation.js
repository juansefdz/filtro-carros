const banner = document.querySelector(".banner");

setInterval(function () {
  banner.style.backgroundImage = "url(img/bg-light.jpg)";

  setTimeout(function () {
    banner.style.backgroundImage = "url(img/bg.jpg)";
  }, 1000);
}, 2000);
