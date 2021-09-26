"use strict";

const feedURL = "https://www.bishopmoore.org/pro/events_rss.cfm?detailid=315833&categoryid=bishopmoore%2Eorg%5F4n0bh8ml5l41q764ael5s4rkok%40group%2Ecalendar%2Egoogle%2Ecom%2CGENERAL%2CLiturgy%2CNo%20School";

$(document).ready(function() {
    $.ajax({  
        type: 'GET',  
        url: "https://api.rss2json.com/v1/api.json?rss_url=" + feedURL,
        dataType: 'jsonp',
        success: function(data) {
            var titles = "";
            data.items.forEach(item => {
                titles += `<li><p>${item.title}&nbsp;&nbsp;&nbsp;<img src="https://www.bishopmoore.org/custom/images/logo.png" alt="">&nbsp;&nbsp;</p></li>`;
            });

            $("#rss-feed").append(titles);
            $("#rss-feed").webTicker({
                speed: 80,
                startEmpty: true,
                hoverpause: false,
                height: '100px',
            });
        }  
    }); 
});