var postTest = document.getElementById("post");
postTest.addEventListener("click", function(){
    console.log("test")
    var commentBoxValue= document.getElementById("comment-box").value;

    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("unordered").appendChild(li);
    console.log(li.toString())
    console.log("test")
});