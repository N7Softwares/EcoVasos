var html = document.querySelector("link[rel='import']").import;
var text = html.getElementById("text");

document.body.appendChild(text.cloneNode(true));