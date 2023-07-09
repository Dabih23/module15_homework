function changeIcon() {
  var icon = document.getElementById("myIcon");
  if (icon.classList.contains("icon_01")) {
    icon.classList.remove("icon_01");
    icon.classList.add("icon_02");
  } else {
    icon.classList.remove("icon_02");
    icon.classList.add("icon_01");
  }
}