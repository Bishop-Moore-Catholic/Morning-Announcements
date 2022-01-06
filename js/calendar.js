"use strict";

const feedURL = 'https%3A%2F%2Fwww.bishopmoore.org%2Fpro%2Fevents_rss.cfm%3Fdetailid%3D315833%26categoryid%3Dbishopmoore%252Eorg%255F4n0bh8ml5l41q764ael5s4rkok%2540group%252Ecalendar%252Egoogle%252Ecom%252CGENERAL%252CLiturgy%252CNo%2520School';
const athleticsURL = 'https%3A%2F%2Fwww.bishopmoore.org%2Fpro%2Fevents_rss.cfm%3Fcategoryid%3Dpc22muclr8j8mneinu2nkmvkm896d8a5%2540import%252Ecalendar%252Egoogle%252Ecom%252CGENERAL%252CLiturgy%252CNo%2520School%26detailid%3D425234';
const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=28.587340058232893&lon=-81.39051297317081&APPID=5a0c0f77c41cee987f71f3812135ca43&exclude=minutely&units=imperial';
const rss2json = 'https://api.rss2json.com/v1/api.json?api_key=alol7v92upbqimssjyhlglsm4ejqvlh5m9smvkdm&rss_url=';
const reg = /^([\w\d\s\W\D]+) - (?:(\w+ \d+, 20\d\d) to (\w+ \d+, 20\d\d)||(\w+ \d+, 20\d\d))$/;

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

// Parse Feeds
var calFeed = $.parseJSON($.ajax({
    url: rss2json + feedURL,
    async: false
}).responseText);

var athleticFeed = $.parseJSON($.ajax({
    url: rss2json + athleticsURL,
    async: false
}).responseText);

var weatherFeed = $.parseJSON($.ajax({
    url: weatherURL,
    async: false
}).responseText);

// Calendar
var titles = [];
calFeed.items.forEach(item => {
    var split = item.title.match(reg);

    if (split[4] != undefined) {
        titles.push(`<li><p class="feed-title">${split[1]}</p>` +
        `<p class="feed-date">${split[4]}</p></li>`);
    } else {
        titles.push(`<li><p class="feed-title">${split[1]}</p>` +
        `<p class="feed-date">${split[2]}</p></li>`);
    }
});

for(var i = 0; i < titles.length; i++) {
    if (i < 5) $('.feed1').append(titles[i]) 
    else if (i >= 5 && i < 10) $('.feed2').append(titles[i]) 
    else break;
}

titles.length = 0;
athleticFeed.items.forEach(item => {
    var split = item.title.match(reg);

    if (split[4] != undefined) {
        titles.push(`<li><p class="feed-title">${split[1]}</p>` +
        `<p class="feed-date">${split[4]}</p></li>`);
    } else {
        titles.push(`<li><p class="feed-title">${split[1]}</p>` +
        `<p class="feed-date">${split[2]}</p></li>`);
    }
});

for(var i = 0; i < titles.length; i++) {
    if (i < 5) $('.feed3').append(titles[i]) 
    else if (i >= 5 && i < 10) $('.feed4').append(titles[i]) 
    else break;
}

// Weather
$('.now.temp').text(`${weatherFeed.current.temp.toFixed(0)}\xB0`);
$('.now.icon > i').addClass('fa-' + weatherIcon[weatherFeed.current.weather[0].icon]);
$('.now.desc').text(`${weatherFeed.current.weather[0].description}`);

for(var i = 1; i < 10; i++) {
    $('#hourly').append(`<tr>`+
    `<td>${(new Date(weatherFeed.hourly[i].dt * 1000).getHours() % 12 || 12) + ':00'}</td>` +
    `<td>${weatherFeed.hourly[i].temp.toFixed(0)}\xB0</td>` +
    `<td class="fa fa-2x fa-${weatherIcon[weatherFeed.hourly[i].weather[0].icon]}"></td>` +
    `<td class="text-capitalize">${weatherFeed.hourly[i].weather[0].description}</td>` +
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
