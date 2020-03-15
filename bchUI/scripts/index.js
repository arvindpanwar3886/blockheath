var aboutUs;

window.onload = function() {
  aboutUs = document.getElementById("aboutUs");
};

function infoClicked() {
  if (!infoClicked.clicked) {
    aboutUs.style.display = "block";
    infoClicked.clicked = true;
  } else {
    aboutUs.style.display = "none";
    infoClicked.clicked = false;
  }
}

function closeAboutUs() {
  aboutUs.style.display = "none";
}
