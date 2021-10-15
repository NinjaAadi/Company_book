const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static(__dirname + '/build'));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + 'index.html');
})

app.get("/:id", (req, res) => {
    console.log(req.params.id);
    res.redirect("/");
})


app.listen(3000, () => {
    console.log(`Server running at port 3000`);
});
