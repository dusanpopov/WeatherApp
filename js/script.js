window.addEventListener("load", () => {

    let long;
    let lat;

    let temperatureDescription = document.querySelector(".temperature__description");
    let temperatureDegree = document.querySelector(".temperature__degree");
    let locationTimezone = document.querySelector(".location__timezone");
    let temperatureSection = document.querySelector(".temperature--section");
    let temperatureUnit = document.querySelector(".temperature__degree--unit");
    let pressureValue = document.querySelector(".pressure");
    let precipitation = document.querySelector(".precipitation");

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/ee4eaca14d25a5062959250e9e8f03c7/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {

                console.log(data);

                const {temperature, pressure, precipProbability, summary} = data.currently;

                //Set DOM elements from the API

                temperatureDegree.textContent = temperature;
                pressureValue.textContent = `Pressure: ${pressure} Mbar`;
                precipitation.textContent = `Precipitation: ${precipProbability*100} %`
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Convert to celsius

                let celsius = (temperature - 32) * (5/9);

                // Change temperature to sections

                function toggleTemps(){

                    if (temperatureUnit.textContent === "F"){
            
                        temperatureUnit.textContent = "C";
                        temperatureDegree.textContent = celsius.toFixed(1);
            
                    } else {
                        temperatureUnit.textContent = "F";
                        temperatureDegree.textContent = temperature;
                        
                    }
                }

                temperatureSection.addEventListener("click", toggleTemps); 
                
            });
        
    });

    }

    

});