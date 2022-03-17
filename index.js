const url = require("url");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static("./src/public"));

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

const maeuse = [
    {
        "id":1,
        "Mausname":"Computermaus",
        "Groesse":"ca. 10cm-13cm",
        "Vorkommen":"Meistens auf Schreibtisch",
        "Funfact":"Blinkt gerne!",
        "Verfasser":"Chris",
        "Kommentare":[
            // Post oder Put bauen
            {"Verfasser":"...", "Kommentar":"Poggies!"}
        ]
    },
    {
        "id":2,
        "Mausname":"Ostschermaus",
        "Groesse":"ca. 13cm-24cm",
        "Vorkommen":"Großen Teilen der Paläarktis",
        "Funfact":"Sehr groß!",
        "Verfasser":"Oliver",
        "Kommentare":[
            // Post oder Put bauen
            {"Verfasser":"...", "Kommentar":"He is THICC!"}
        ]
    },
    {
        "id":3,
        "Mausname":"Sumpfspitzmaus",
        "Groesse":"ca. 7cm",
        "Vorkommen":"Europa",
        "Funfact":"spitze Schnauze!",
        "Verfasser":"...",
        "Kommentare":[
            // Post oder Put bauen
            {"Verfasser":"...", "Kommentar":"Maulwurf-Maus XD"}
        ]
    },
    {
        "id":4,
        "Mausname":"Elefantenspitzmaus",
        "Groesse":"ca. 20cm",
        "Vorkommen":"Ost- und Südafrika",
        "Funfact":"Nase sieht wie ein Rüssel aus!",
        "Verfasser":"...",
        "Kommentare":[
            // Post oder Put bauen
            {"Verfasser":"...", "Kommentar":"Elefanten-Maus XD"}
        ]
    }
];




const users = [];

app.post("/signup", inputValidity, (req, res) => {
    const user = {name: req.body.user, password: hash(req.body.pass), favorites: []}

    if (!users.includes(user)) {
        users.push(user);
        const userName = user.name;
        console.debug("Added new credentials: " + userName + " " + user.password);
    }

    res.redirect("/login");
});

app.post("/login", inputValidity, (req, res) => {
    const user = users.find(user => user.name === req.body.user);
    if (user) {
        res.cookie(
            "testSession",
            {user: req.body.user.toLowerCase(), loggedIn: true},
            {maxAge: 1000 * 60 * 15}
        );
        res.redirect("/public/index.html");
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
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

app.use("/public", cookieSecurity, express.static("./src/public/index.html"));

const port = 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});