const container = document.querySelector('.container');
const search = document.querySelector('.search');
const box = document.querySelector('.weather-box');
const details = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const dest = document.querySelector('.search-box2');
const city = document.querySelector('.search-box input').value;

search.addEventListener('click', () =>{

    const APIKey = '052f3e60b8aee990c5afdc984c18146b'
    const city = document.querySelector('.search-box input').value;
    

    if (city=='')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        
     if (json.cod == '404'){
          
          container.style.height = '400px';
          box.classList.remove('active');
          details.classList.remove('active');
          error404.classList.add('active');
          return;
     }
          container.style.height = '555px';
          box.classList.add('active');
          details.classList.add('active');
          error404.classList.remove('active');
          dest.classList.add('active');
     
     
          const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span'); 
        switch(json.weather[0].main){
            case 'Clear':
                 image.src = 'css/clear.png';
            break;

            case 'Rain':
                 image.src = 'css/rain.png';
            break;

            case 'Snow':
                 image.src = 'css/snow.png';
            break;
            
            case 'Clouds':
                 image.src = 'css/partly.png';
            break;

            case 'Mist':
                 image.src = 'css/mist.png';
            break;

            case 'Haze':
                 image.src = 'css/haze.png';
            break;

            default:
                image.src='';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}°C<span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});

