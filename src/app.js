const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const api = require("./weatherapi");

//setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "soham ",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is the help page",
    title: "Help",
    name: "Soham Devani",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});
app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Enter Search query",
    });
  }
  try {
    let fetchedWeatherData = await api.weatherData(req.query.address);
    res.send({
      location: req.query.address,
      weather: fetchedWeatherData.weather[0],
      temperature: fetchedWeatherData.main.temp,
      wind: fetchedWeatherData.wind,
      humidity: fetchedWeatherData.main.humidity,
      date: fetchedWeatherData.dt,
    });
  } catch (e) {
    res.send(e);
  }

  // console.log(req.query.address)
  // res.send({
  //     address:req.query.address
  // })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Soham Devani",
    errorMessage: "Help Article not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("listening to port number 3000");
});
