function launchProject(type, location) {
  document.getElementById("frame").setAttribute("src", location);
  document.getElementById("staticBackdropLabel").innerHTML = type;
}

function clearContent() {
  document.getElementById("frame").setAttribute("src", '');
}
