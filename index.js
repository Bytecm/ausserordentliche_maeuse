const url = require("url");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const {response} = require("express");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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

function createCredentials(body) {
    return body.user.toLowerCase() + ":" + hash(body.pass);
}

const accounts = [];

app.post("/signup", inputValidity, (req, res) => {
    const credentials = createCredentials(req.body);
    if (!accounts.includes(credentials)) {
        accounts.push(credentials);
        console.debug("Added new credentials: " + credentials);
    }

    res.redirect("/");
});

app.post("/login", inputValidity, (req, res) => {
    const credentials = createCredentials(req.body);
    if (accounts.includes(credentials)) {
        res.cookie(
            "testSession",
            { user: req.body.user.toLowerCase(), loggedIn: true },
            { maxAge: 1000 * 60 * 15 }
        );
        res.redirect("/secure");
    } else {
        window.alert("bitte registrieren.")
        res.redirect("/");
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
app.use("/secure", cookieSecurity, express.static("./src/secure"));

const port = 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});