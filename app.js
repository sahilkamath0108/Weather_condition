const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query = req.body.cityName;
  const un = req.body.units;
  const apiKey = "ad1080b2f21dd2b18f67279e35b447f6";



  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+un;
  https.get(url,function(response){
    console.log(response.statusCode);

  var uni= "hi";
  if(un==="metric"){
    uni = "deg-celcius";
  }
  else if(un==="standard"){
    uni = "deg-Kelvin";
  }
  else if(un==="imperial"){
    uni = "deg-F";
  }

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const desc = weatherData.weather[0].description;
      console.log(desc);
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+ "@2x.png"
      res.write("<p>Weather in "+query+" is "+temp+" "+uni+"</p>");
      res.write("<h1>The weather is currently "+desc+".</h1>");
      res.write("<img src="+imageURL+">");
    })
  });
})





app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
