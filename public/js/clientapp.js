console.log("Client side")
const weatherForm=document.querySelector('form')
const search=document.querySelector('input') 
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
   
    try{
        const location=search.value;
         messageOne.textContent="Loading"
        const res=await fetch('/weather?address='+location)
        const data=await res.json()
        console.log(data)
        if(data.error){
            messageOne.textContent="Enter a query"
        }else{
                  messageOne.textContent=`Temperature in ${data.location} is ${data.temperature}°C. It is mostly ${data.weather.description} with humidity of ${data.humidity}% and wind speed of ${data.wind.speed} m/s`;
        }
    }catch(e){
        console.log(e)
        messageOne.textContent="Please enter a correct city name";
    }
})

// // fetch('http://localhost:3000/weather?address='+location)
//     // .then((response)=>{
//     // response.json().then((response)=>{
//     //     if(response.error){
//     //         console.log("error")
//     //     }
//     //     else{
//     //         console.log(response)
//     //     }
//     // })
