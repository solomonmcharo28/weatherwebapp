const request = require('request')
const geocode = (address, callback) =>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoic29sb21hbjEwIiwiYSI6ImNrM210amZzaTE1bGIzcm1pZzJ5MXF4OWkifQ.ue8nrxMuAOVTpHfeR-Z8jw"
    request({ url: url,json: true}, (error, response)=>{
        if(error){
           callback('Unable to Connect to Location Services!', undefined)
        }
        else if(response.body.features.length === 0){
           callback("Unable to find Location. Try Another Search")
        }
        else{
           const longitude = response.body.features[0].center[0]
           const latitude = response.body.features[0].center[1]
           callback(undefined,{
               latitude:latitude, 
               longitude: longitude,
               location: response.body.features[0].place_name
         }) }
    })
   }
   

module.exports = geocode