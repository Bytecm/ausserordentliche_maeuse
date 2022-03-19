console.log("Hello");

getMouses();

async function getMouses() {
    let allMouseResponse = await fetch('/getmaeuse')
    let allMouse = JSON.parse(await allMouseResponse.text());
    let favMouseResponse = await fetch('/getfavmaeuse');
    let favMouse = JSON.parse(await favMouseResponse.text());
    let mostVistedMouseResponse = await fetch('/mostvisitedmause');
    let mostVistedMouse = JSON.parse(await mostVistedMouseResponse.text());

    setMouses(allMouse, favMouse, mostVistedMouse);
}


function setMouses(allMouse, favMouse, mostVistedMouse) {
    setAllMouses(allMouse);
    setFavMouse(favMouse);
    setMostVistedMouse(mostVistedMouse);
}

function setAllMouses(allMouse) {
    let allMouseContainer = document.getElementById("all-flex");
    let html = "";
    console.log("All Mouses:");
    for (var i = 0; i < allMouse.length; i++) {
        console.log(allMouse[i]);
        html += jsonToHTML(allMouse[i]);
    }
    console.log(html);
    allMouseContainer.innerHTML = html;
}

function setFavMouse(favMouse) {
    console.log("fav Mouses: " + favMouse);
}

function setMostVistedMouse(mostVistedMouse) {
    console.log("most visited: " + mostVistedMouse);
}

function jsonToHTML(mouse) {
    let html = "<div class=\"mouse\">\n";
    html += "<div class=\"favorite-mouse-name\">\n";
    html += "<a href=\"/details?id=" + mouse.id + "\">" + mouse.Mausname + "</a>\n";
    html += "<button type=\"button\" class=\"favorite-button\">Favorisieren</button>\n";
    html += "</div>\n";
    html += "<div>\n";
    html += "<img class=\"mouse-image\" src=\"" + mouse.Bild +" \">\n";
    html += "</div>\n";
    html += "</div>\n";
    html += "\n";
    return html;
}