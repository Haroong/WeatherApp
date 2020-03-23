window.addEventListener('load', ()=> {
    let long; // longtitude
    let lat; // latitude
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
        
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/425288710ac1760a162e3cc86d7b0558/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    // set DOM elements from the API

                    // formula for Celsius
                    let celsius = Math.floor((temperature -32) * (5 / 9));

                    temperatureDegree.textContent = celsius;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // set icon
                    setIcons(icon, document.querySelector(".icon"));
                
                    // change temperature to Celsiius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = celsius;
                        }
                    })
                    
                    // set background color
                    if (celsius < 10) {
                        document.querySelector("body").className += "blueBackground"; 
                    }
                    if (celsius > 22) {
                        document.querySelector("body").className += "redBackground";
                    }
                });
        });
    }

    // use Skycons
    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play(); // start animation
        return skycons.set(iconID, Skycons[currentIcon]);
    }

})