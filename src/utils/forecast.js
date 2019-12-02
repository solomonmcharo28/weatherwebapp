const request = require('request')
const forecast = (latitude,longitude, callback) =>{
    const url = "https://api.darksky.net/forecast/eaad3354f5cee810413dc11ed5ae8c14/" + latitude + ',' + longitude + "?units=si"
    request({url, json:true}, (error, {body})=>{
         if(error){
             callback("Unable to Connect to forecast Services", undefined)
         }
         else if(body.error){
             callback("Unable to get to location specified", undefined)
         }
         else { 
             callback(undefined, {
                 summary: body.daily.data[0].summary,
                 rainProb: Math.round(body.daily.data[0].precipProbability * 100) , 
                 temperature: "The current temperature is " + Math.round(body.currently.temperature) + " degrees celsius" ,
                 temp: Math.round(body.currently.temperature),
             })
         }

    })

}

module.exports = forecast