const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')


const app = express();

const apikey = "ddb941a44c17a7870610a8d776a0fbe6";

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')//extended template design for js to use

app.get('/',function(req,res){
    res.render('index',{weather: null,error: null})
})

app.post('/',function(req,res){
    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    console.log(req.body.city);

    request(url,function(err,response,body){
        if(err){
            res.sender('index',{weather: null,error:"please try again"})
        }
        else {
            let weather = JSON.parse(body)
            if(weather.main == undefined) {
                res.render('index',{
                    weather:null,
                    error:"Error, please try again"
                })
            }
            else {
                var we = weather.main.temp - 273.15
                we = Math.round(we)
                let weatherText  = `${we} degress celsius with ${weather.weather[0].main} in ${weather.name}`

                res.render('index',{weather: weatherText, error :null})
                console.log("body:",body);
            }
        }
    })
})
app.listen(3000,function(){
    console.log('weatherly app listening on port 3000');
})

