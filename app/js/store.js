function sotre_urls(urls){
    dbName = 'game';
    var storage = {};
    var status = 0;
    storage[dbName] = { urls: [] };
    urls.forEach(function(url){
        storedData[dbName].urls.append(url);
    }
    alert(storage[dbName].urls);
    chrome.storage.local.set( storage, function() {
  // optional callback
    });
}
