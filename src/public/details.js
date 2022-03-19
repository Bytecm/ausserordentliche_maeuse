console.log("poggies");
let mouseId =  getMouseID();

getMouse(mouseId);


function setMouse(mouse){
    let sizeLabel = document.getElementById("details-body-groesse");
    let weightLabel = document.getElementById("details-body-gewicht");
    let foundLabel = document.getElementById("details-body-vorkommen");
    let funfactLabel = document.getElementById("details-body-funfact");
    let authorLabel = document.getElementById("details-body-verfasser");
    let imageElement = document.getElementById("details-image");

    sizeLabel.innerHTML = "<p>" + mouse.Groesse + "</p>";
    weightLabel.innerHTML = "<p>" + mouse.Gewicht + "</p>";
    foundLabel.innerHTML = "<p>" + mouse.Vorkommen + "</p>";
    funfactLabel.innerHTML = "<p>" + mouse.Funfact + "</p>";
    authorLabel.innerHTML = "<p>" + mouse.Verfasser + "</p>";
    imageElement.src = mouse.Bild;

    let commentsSection = document.getElementById("details-posted-kommentare");
    let comments = mouse.Kommentare;
    let commentsHtml = "";

    for(let i = 0; i < comments.length; i++){
        commentsHtml += jsonCommentToHtml(comments[i]);
    }
    console.log(commentsHtml);
    commentsSection.innerHTML = commentsHtml;
}

function jsonCommentToHtml(jsonComment){
    let html = "<div id=\"details-posted-kommentare-verfasser\">" + jsonComment.Verfasser + "</div>\n";
    html += "<div id=\"details-posted-kommentare-body\">" + jsonComment.Kommentar + "</div><br>\n";
    return html;
}

async function getMouse(mouseId){
    let mouseResponse = await fetch("/getMouseById?id=" + mouseId);
    let mouse = JSON.parse(await mouseResponse.text());
    console.log(mouse);
    setMouse(mouse);
}

 function getMouseID() {
     let mouseID = "-1";
     let cookies = document.cookie;
     cookies = cookies.split(";");
     for(let i = 0; i < cookies.length; i++) {
         let tag = cookies[i].split("=")[0];
         let value = cookies[i].split("=")[1];
         if(tag.trim() === "targetMouse"){
            mouseID = parseInt(value);
            break;
         }
     }
     return mouseID;
 }