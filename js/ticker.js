"use strict";

const feedURL = "https://www.bishopmoore.org/pro/events_rss.cfm?detailid=315833&categoryid=bishopmoore%2Eorg%5F4n0bh8ml5l41q764ael5s4rkok%40group%2Ecalendar%2Egoogle%2Ecom%2CGENERAL%2CLiturgy%2CNo%20School";

var response = $.parseJSON($.ajax({
    url: 'https://api.rss2json.com/v1/api.json?rss_url=' + feedURL,
    async: false
}).responseText);

var titles = "";
response.items.forEach(item => {
    titles += `<li><p>${item.title}</p></li>`;
});

$("#rss-feed").append(titles);
$("#rss-feed").webTicker({
    speed: 100,
    startEmpty: true,
    hoverpause: false,
    height: '250px',
});