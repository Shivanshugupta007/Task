import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index");
});

app.post("/back", function(req, res){
    res.redirect("/");
});

app.post("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.cityName + "&appid=928a0327b19ffd223744ffa2ad860da6&units=metric";
    
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const exp = JSON.parse(data);
            console.log(exp.main.temp);
            console.log(req.body.cityName);
            res.render("result", {temp: exp.main.temp, place: req.body.cityName});
        })
    })
});

app.listen(3000, () => {
    console.log("Server Run At 3000");
});