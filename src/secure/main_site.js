console.log("Hello");

getMouses();

async function getMouses() {
    let allMouseResponse = await fetch('/getmaeuse')
    let allMouse = JSON.parse(await allMouseResponse.text());
    let favMouseResponse = await fetch('/getfavmaeuse');
    let favMouse = JSON.parse(await favMouseResponse.text());
    setMouses(allMouse, favMouse);
}


function setMouses(allMouse, favMouse) {
    setAllMouses(allMouse);
    setFavMouse(favMouse);
}

function setAllMouses(allMouse) {
    let allMouseContainer = document.getElementById("all-flex");
    let html = "";
    console.log("All Mouses:");
    for (let i = 0; i < allMouse.length; i++) {
        console.log(allMouse[i]);
        html += jsonToHTML(allMouse[i]);
    }
    allMouseContainer.innerHTML = html;
}

function setFavMouse(favMouse) {
    let favMouseContainer = document.getElementById("fav-flex");
    let html = "";
    if (favMouse.length < 1) {
        return;
    }
    for (let i = 0; i < favMouse.length; i++) {
        console.log(favMouse[i]);
        html += jsonFavToHTML(favMouse[i]);
    }
    favMouseContainer.innerHTML = html;
}

function jsonFavToHTML(mouse) {
    let html = "<div class=\"mouse\">\n";
    html += "<div class=\"favorite-mouse-name\">\n";
    html += "<a href=\"/details?id=" + mouse.id + "\">" + mouse.Mausname + "</a>\n";
    html += "</div>\n";
    html += "<div>\n";
    html += "<img class=\"mouse-image\" src=\"" + mouse.Bild + " \">\n";
    html += "</div>\n";
    html += "</div>\n";
    html += "\n";
    return html;
}

function jsonToHTML(mouse) {
    let html = "<div class=\"mouse\">\n";
    html += "<div class=\"favorite-mouse-name\">\n";
    html += "<a href=\"/details?id=" + mouse.id + "\">" + mouse.Mausname + "</a>\n";
    html += "<a href=\"/fav-mouse?id=" + mouse.id + "\">Favorisieren</a>\n";
    html += "</div>\n";
    html += "<div>\n";
    html += "<img class=\"mouse-image\" src=\"" + mouse.Bild + " \">\n";
    html += "</div>\n";
    html += "</div>\n";
    html += "\n";
    return html;
}