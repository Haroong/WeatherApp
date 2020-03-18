window.addEventListener('load', ()=> {
    let long; // longtitude
    let lat; // latitude

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://api.darksky.net/forecast/425288710ac1760a162e3cc86d7b0558/${lat},${long}`;
            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                });
        });
        
    }
});