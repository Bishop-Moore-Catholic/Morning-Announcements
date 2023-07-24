const d = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
$('h1').text(d);
