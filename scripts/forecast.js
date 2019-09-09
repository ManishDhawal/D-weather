class Forecast{
    constructor(){
        this.key = 'xpvG8pYm61v8QAkehtlA0c7tTRvyPyOA';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
    
        return { cityDets, weather }
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}

const key = 'xpvG8pYm61v8QAkehtlA0c7tTRvyPyOA';


//get weather details
//const getWeather = async(id) => {
 
//};


//get city
//const getCity = async(city) => {
  
//};

// getCity('manchester').then((data) => {
//         return getWeather(data.Key);
//     }).then((data) => {
//         console.log(data);
        
//     }).catch((err) => {
//         console.log(err);
        
//     });