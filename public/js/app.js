const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')
const weatherSymbol = document.getElementById('weatherDisplay')

messageOne.textContent = ''
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    const base_url = '/weather?address='
    const url = base_url + location
    fetch(url).then((response) => {
        messageOne.textContent = "Loading..."
        
        response.json().then((data) =>{
            if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            }
            else{
            
            messageOne.textContent = ''
            console.log(data)
            messageThree.textContent = data.location
            messageTwo.textContent = (data.forecast.summary + " " + data.forecast.temperature + ". The probability of rain today is " + data.forecast.rainProb + "%.")
            if(data.forecast.rainProb > 50){
            const classy = document.getElementById('weatherDisplay').className
            weatherSymbol.classList.replace(classy, 'rainy')
            }
            else if(data.forecast.temp <=10){
            const classy = document.getElementById('weatherDisplay').className
            weatherSymbol.classList.replace(classy, 'cold')                    
            }
            else{
                const classy = document.getElementById('weatherDisplay').className
                weatherSymbol.classList.replace(classy, 'sunny')     
            }
           }
        })
      })
})