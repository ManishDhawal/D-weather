const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // destructuring the initials

    //const cityDets = data.cityDets;
    //const weather = data.weather;

    const { cityDets, weather} = data;

    //update details template

    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
     <h5 class="my-3">${cityDets.EnglishName}</h5>
     <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
     </div> 
    </div>
    `;
    //update night and day

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);

    //ternary operators demo***
     let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
     time.setAttribute('src', timeSrc);
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }
    // else{
    //     timeSrc = 'img/night.svg';
    // }



    //remove the d-none class

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}



cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();
    
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city).then((data) => {
        updateUI(data);
        //console.log(data);
    }).catch((err) => {
        console.log(err);
    });

    //setting local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city')).
    then((data) => {
        updateUI(data)
    }).catch((err) => {
        console.log(err);
    });
}