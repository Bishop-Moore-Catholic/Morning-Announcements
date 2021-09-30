var tag = function () {
    var params = {};
    var url = window.location.search.substring(1);
    var vars = url.split("&");

    for (var i = 0; i < vars.length; i++) {
        var key = vars[i].split("=");

        if (typeof params[key[0]] === "undefined") {
            params[key[0]] = decodeURIComponent(key[1]);
        } else if (typeof params[key[0]] === "string") {
            var value = [params[key[0]], decodeURIComponent(key[1])];
            params[key[0]] = value;
        } else {
            params[key[0]].push(decodeURIComponent(key[1]));
        }
    }

    return params;
}();

function call() {
    var timeRem = function () {
        var time = new Date(`${tag.mm}/${tag.dd}/ ${tag.yy}`).getTime() - new Date().getTime();
        return Math.floor((time) / (1000 * 60 * 60 * 24)) + 1;
    }();

    var days = function () {
        if (timeRem == 1) {
            return " Day";
        } else if (timeRem <= 0) {
            return "0 Days";
        } else {
            return " Days";
        }
    }();

    var day = function () {
        if (timeRem <= 0) {
            return "";
        } else {
            return timeRem;
        }
    }();

    document.getElementById("counter").innerHTML = day + days;
}

call();
document.getElementById("title").innerHTML = tag.name;