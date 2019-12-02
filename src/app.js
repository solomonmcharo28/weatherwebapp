const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'./template/views')
const partialsPath = path.join(__dirname, './template/partials')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Solomon Mcharo"
    })
})


app.get('/Weather', (req, res) =>{ 
    if(!req.query.address){
        return res.send({
            error:  "You must provide an address"
          })
    }
    geocode(req.query.address, (error, data)=>{
        const data1 = data;
        forecast(data1.latitude, data1.longitude, (error, forecastData = {})=>{
            if(error){
               console.log(error)
            }
            const forecasting = forecastData 
            res.send({
                forecast: forecasting,
                location:data1.location,
                address: data1,
            })
        })
       
    })
    
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:"404 Error",
        name:"Solomon Mcharo",
        errorMessage: "Page was not Found"
    })
})


//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{

    console.log("Server is up on port 3000")
})