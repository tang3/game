(function() {

  var dbName = 'game';

  var savedFileEntry, fileDisplayPath;

  function getTodosAsText(callback) {
      alert('1');
      chrome.storage.local.get(dbName, function(storedData) {

          var text = '';
          if ( storedData[dbName].urls ) {
              storedData[dbName].urls.forEach(function(url) {
                  text += url;
                  text += '\n';
              }, '');
          }
          alert(text);
          callback(text);

      }.bind(this));
  }

  function exportToFileEntry(fileEntry) {
      savedFileEntry = fileEntry;
      alert('5');
      var status = document.getElementById('status');

      // Use this to get a file path appropriate for displaying
      chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
          fileDisplayPath = path;
          status.innerText = 'Exporting to '+path;
      });

      getTodosAsText( function(contents) {
          fileEntry.createWriter(function(fileWriter) {
          var truncated = false;
          var blob = new Blob([contents]);

          fileWriter.onwriteend = function(e) {
            if (!truncated) {
              truncated = true;
              // You need to explicitly set the file size to truncate
              // any content that might have been there before
              this.truncate(blob.size);
              return;
            }
            status.innerText = 'Export to '+fileDisplayPath+' completed';
          };

          fileWriter.onerror = function(e) {
            status.innerText = 'Export failed: '+e.toString();
          };

          fileWriter.write(blob);

        });
      });
  }

  function doExportToDisk() {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST","http://www.baidu.com",true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send("fname=Bill&lname=Gates");
  }

  document.getElementById('exportToDisk').addEventListener('click', doExportToDisk);

})();
