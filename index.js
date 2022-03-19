const url = require("url");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const {response} = require("express");
const path = require('path');
const Console = require("console");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//app.use("/", express.static("./src/public"));

function inputValid(body) {
    if (body.user && body.pass) {
        if (body.user.length >= 4 && body.pass.length >= 4) {
            if (
                body.user.match(/[a-zA-Z.@]+/) &&
                body.pass.match(/[a-zA-Z0-9!.+#<>]+/)
            ) {
                return true;
            } else {
                console.debug("password didn't match requirements");
            }
        }
    }

    return false;
}

function inputValidity(req, res, next) {
    if (inputValid(req.body)) {
        next();
    } else {
        if (req.headers.referer) {
            const refererPath = url.parse(req.headers.referer).pathname;
            res.redirect(refererPath);
        } else {
            res.redirect("/");
        }
    }
}

function hash(password) {
    return crypto.createHash("sha256").update(password).digest("base64");
}

var maeuse = [
    {
        "id": 1,
        "Mausname": "Computermaus",
        "Bild": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Razer_Naga_2014_MMO_Gaming_Mouse_%2814714867599%29.jpg",
        "Groesse": "ca. 10cm-13cm",
        "Gewicht": "ca. 120 g",
        "Vorkommen": "Meistens auf Schreibtisch",
        "Funfact": "Blinkt gerne!",
        "Verfasser": "Chris",
        "Kommentare": [
            {
                "Verfasser": "Poggers",
                "Kommentar": "Poggies!"
            },
            {
                "Verfasser": "Random Guy",
                "Kommentar": "INVEST!!"
            }
        ]
    },
    {
        "id": 2,
        "Mausname": "Ostschermaus",
        "Bild": "https://kleinsaeuger.at/files/content/foto/wuehlmaeuse/Arvicola_amphibius%281%29_GrahamC57_flickr.jpg",
        "Groesse": "ca. 13cm-24cm",
        "Gewicht": "ca. 65 bis 320 g",
        "Vorkommen": "Großen Teilen der Paläarktis",
        "Funfact": "Sehr groß!",
        "Verfasser": "Oliver",
        "Kommentare": [
            {
                "Verfasser": "...",
                "Kommentar": "He is THICC!"
            }
        ]
    },
    {
        "id": 3,
        "Mausname": "Sumpfspitzmaus",
        "Bild": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Neomys_anomalus.jpg/600px-Neomys_anomalus.jpg",
        "Groesse": "ca. 7cm",
        "Gewicht": "ca. 6 bis 16 g",
        "Vorkommen": "Europa",
        "Funfact": "spitze Schnauze!",
        "Verfasser": "...",
        "Kommentare": [
            {
                "Verfasser": "...",
                "Kommentar": "Maulwurf-Maus XD"
            }
        ]
    },
    {
        "id": 4,
        "Mausname": "Elefantenspitzmaus",
        "Bild": "https://upload.wikimedia.org/wikipedia/commons/b/bc/Bushveld-elephant-shrew.jpg",
        "Groesse": "ca. 20cm",
        "Gewicht": "ca. 35 bis 70 g",
        "Vorkommen": "Ost- und Südafrika",
        "Funfact": "Nase sieht wie ein Rüssel aus!",
        "Verfasser": "...",
        "Kommentare": [
            {
                "Verfasser": "...",
                "Kommentar": "Elefanten-Maus XD"
            }
        ]
    }
];

let users = [
    {
        "name": "a",
        "password": "secure",
        "favoriten": [
            {"id": 1}
        ]
    }
];

app.post("/postComment", cookieSecurity, (req, res) => {
    let comment = req.body.comment;
    let author = req.cookies.username;
    let mouseID = req.cookies.targetMouse;

    maeuse[mouseID - 1].Kommentare.push({"Verfasser": author, "Kommentar": comment});

    res.redirect("/details?id=" + req.cookies.targetMouse);
});

app.post("/signup", inputValidity, (req, res) => {
    let user = {name: req.body.user, password: hash(req.body.pass), favoriten: [{"id": -1}]}

    if (!users.includes(user)) {
        users.push(user);
        let userName = user.name;
        console.debug("Added new credentials: " + userName + " " + user.password);
    } else {
        return response.statusText('Das Konto existiert schon, bitte einloggen.');
    }

    res.redirect("/login-page");
});

app.post("/login", inputValidity, (req, res) => {
    const user = users.find(user => user.name === req.body.user);
    console.debug("Logging in User: " + req.body.user);

    if (user.password === hash(req.body.pass)) {
        res.cookie(
            "testSession",
            {user: req.body.user.toLowerCase(), loggedIn: true},
            {maxAge: 1000 * 60 * 15}
        );
        res.cookie(
            "username",
            user.name,
            {maxAge: 1000 * 60 * 15}
        );
        res.redirect("/");
    } else {
        return response.statusMessage
        //res.redirect("/");
    }
});

app.get("/logout", (_, res) => {
    res.clearCookie("testSession");
    res.redirect("/");
});

function cookieSecurity(req, res, next) {
    if (!req.cookies.testSession) {
        res.status(401).send("Unauthorized");
    } else {
        next();
    }
}

app.get("/", (req, res) => {
    if (!req.cookies.testSession) {
        //not logged in
        res.sendFile(path.join(__dirname, './src/public/main_site.html'));
    } else {
        //logged in
        res.sendFile(path.join(__dirname, './src/secure/main_site.html'));
    }
});

app.get("/style.css", (_, res) => {
    res.sendFile(path.join(__dirname, './src/public/style.css'));
});

app.get("/main_site.js", (req, res) => {
    if (!req.cookies.testSession) {
        //not logged in
        res.sendFile(path.join(__dirname, './src/public/main_site.js'));
    } else {
        //logged in
        res.sendFile(path.join(__dirname, './src/secure/main_site.js'));
    }
});

app.get("/details", (req, res) => {
    let mouseId = parseInt(req.query.id);
    res.cookie('targetMouse', mouseId);
    res.sendFile(path.join(__dirname, './src/public/details.html'));
});

app.get("/login-page", (_, res) => {
    res.sendFile(path.join(__dirname, './src/public/login.html'));
});

app.get("/signup-page", (_, res) => {
    res.sendFile(path.join(__dirname, './src/public/signup.html'));
});

app.get("/post_comment.js", (_, res) => {
    res.sendFile(path.join(__dirname, './src/public/post_comment.js'));
});

app.get("/details.js", (_, res) => {
    res.sendFile(path.join(__dirname, './src/public/details.js'));
});

app.get("/getmaeuse", (_, res) => {
    res.json(maeuse);
});

app.get("/getfavmaeuse", (req, res) => {
    let userName = req.cookies.username;
    let user = users.find(user => user.name === userName);
    let favMouses = [];
    let favs = user.favoriten;
    for (let i = 0; i < favs.length; i++) {
        let mouseId = favs[i].id;
        if (mouseId > 0) {
            let mouse = maeuse.find(mouse => mouse.id === mouseId);
            favMouses.push(mouse);
        }
    }
    res.json(favMouses);
});

app.get("/fav-mouse", cookieSecurity, (req, res) => {
    let mouseId = parseInt(req.query.id);
    let userName = req.cookies.username;
    let user = users.find(user => user.name === userName);

    user.favoriten.push({"id": mouseId});
    res.redirect("/");
});

app.get("/getMouseById", (req, res) => {
    let mouseId = parseInt(req.query.id) - 1;
    let maus = maeuse[mouseId];
    res.json(maus);
});

const port = 8080;

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});