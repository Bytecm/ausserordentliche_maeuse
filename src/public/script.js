var postTest = document.getElementById("postButton");
postTest.addEventListener("click", function(){
    var commentBoxValue= document.getElementById("comment-box").value;

    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);
// Seite 73 Foliensatz
// post oder put
// index.js kommentare holen und schicken
// navigations attribute localhost:8080/mausdetails?id=123456
// app.get("/mausdetails")
});