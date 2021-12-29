"use strict";

const feedURL = 'https://www.bishopmoore.org/pro/events_rss.cfm?detailid=315833&categoryid=bishopmoore%2Eorg%5F4n0bh8ml5l41q764ael5s4rkok%40group%2Ecalendar%2Egoogle%2Ecom%2CGENERAL%2CLiturgy%2CNo%20School';
const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=28.587340058232893&lon=-81.39051297317081&APPID=5a0c0f77c41cee987f71f3812135ca43&exclude=minutely&units=imperial';
const rss2json = 'https://api.rss2json.com/v1/api.json?rss_url=';
const reg = '^([\w\d\s\W\D]+) - (?:(\w+ \d+, 20\d\d) to (\w+ \d+, 20\d\d)||(\w+ \d+, 20\d\d))$'

const weatherIcon = {
    '01d': 'sun',
    '02d': 'cloud-sun',
    '03d': 'cloud',
    '04d': 'cloud',
    '09d': 'cloud-rain',
    '10d': 'cloud-moon-rain',
    '11d': 'cloud-showers-heavy',
    '13d': 'snowflake',
    '50d': 'smog',
    '01n': 'moon',
    '02n': 'cloud-moon',
    '03n': 'cloud',
    '04n': 'cloud',
    '09n': 'cloud-rain',
    '10n': 'cloud-moon-rain',
    '11n': 'cloud-showers-heavy',
    '13n': 'snowflake',
    '50n': 'smog',
};

const days = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT'
}

var calFeed = $.parseJSON($.ajax({
    url: rss2json + feedURL,
    async: false
}).responseText);

var weatherFeed = $.parseJSON($.ajax({
    url: weatherURL,
    async: false
}).responseText);

console.log(weatherFeed);

var titles = "";
calFeed.items.forEach(item => {
    titles += `<li><p>${item.title}</p></li>`;
});

$('#rss-feed').append(titles);

// var item = $("li")
// var tl = new TimelineMax({delay:i*1});
// for (var i=0; i<item.length; i++) {           
//     tl.from(item[i], 2, {y:50, autoAlpha:0})
//     tl.to(item[i], 2, {y:-50, autoAlpha:0, delay: 5}, "+=1");
// }


$('.now.temp').text(`${weatherFeed.current.temp.toFixed(0)}\xB0`);
$('.now.icon > i').addClass('fa-' + weatherIcon[weatherFeed.current.weather[0].icon]);
$('.now.desc').text(`${weatherFeed.current.weather[0].description}`);

for(var i = 1; i < 10; i++) {
    $('#hourly').append(`<tr>`+
    `<td>${(new Date(weatherFeed.hourly[i].dt * 1000).getHours() % 12 || 12) + ':00'}</td>` +
    `<td>${weatherFeed.hourly[i].temp.toFixed(0)}\xB0</td>` +
    `<td class="fa fa-2x fa-${weatherIcon[weatherFeed.hourly[i].weather[0].icon]}"></td>` +
    `<td>${weatherFeed.hourly[i].weather[0].description}</td>` +
    `</tr>`);
}

for(var i = 1; i < 8; i++) {
    $('#sevenDay').append(`<tr>`+
    `<td>${days[new Date(weatherFeed.daily[i].dt * 1000).getDay()]}</td>` +
    `<td>${weatherFeed.daily[i].temp['min'].toFixed(0)}\xB0</td>` +
    `<td>${weatherFeed.daily[i].temp['max'].toFixed(0)}\xB0</td>` +
    `<td class="fa fa-2x fa-${weatherIcon[weatherFeed.daily[i].weather[0].icon]}"></td>` +
    `<td class="text-capitalize">${weatherFeed.daily[i].weather[0].description}</td>` +
    `</tr>`);
}

$('#weatherCarousel').carousel({
    interval: 15000
})
