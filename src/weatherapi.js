// https://api.openweathermap.org/data/2.5/weather?q=rajkot&appid=2672f2b65450d7b69729d62315afbfe9&units=metric
const axios = require("axios");
let url =
  "https://api.openweathermap.org/data/2.5/weather";
  let appid="3c391d42ac55891b04a6d71daf48e06e";
async function weatherData(city) {
  try {
    let response=await axios.get(url,{
      params:{
        q:city,
        appid:appid,
        units:"metric"

      }
    })
    return response.data
  } catch (e) {
    return e;
  }
}
module.exports={weatherData}