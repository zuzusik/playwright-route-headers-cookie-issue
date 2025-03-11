const express = require('express')
const app = express()
const port = 3000

app.use(require('cookie-parser')());

app.use((req, res, next) => setTimeout(next, 500));

app.get("/", (req, res) => {
    res.send(`
        <html><body>
            <a href="/set-test-cookie">Set cookie</a>
            <a href="/clear-test-cookie">Clear cookie</a>
            <div>Cookies: <pre>${JSON.stringify(req.cookies, null, 2)}</pre></div>
        </body></html>
    `);
})

const setTestCookie = (res, value, expiryDate) => {
    res.header("Set-Cookie", `test-cookie=${value}; expires=${expiryDate.toUTCString()}; path=/`);
    res.redirect("/");
}

app.get('/set-test-cookie', (req, res) => {
    setTestCookie(res, "test-value", new Date(Date.now() + 60 * 60 * 1000));
});

app.get('/clear-test-cookie', (req, res) => {
    setTestCookie(res, "", new Date(0));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
