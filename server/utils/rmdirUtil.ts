const fs = require('fs');

const rmdirAsync = function(path: string, callback: Function) {
  fs.readdir(path, function(err: Error, files: Array<string>) {
    if (err) {
      callback(err, []);
      return;
    }
    let wait = files.length,
      count = 0,
      folderDone = function(err?: Error) {
        count++;
        if (count >= wait || err) {
          fs.rmdir(path, callback);
        }
      };

    if (!wait) {
      folderDone();
      return;
    }

    path = path.replace(/\/+$/, '');
    files.forEach(function(file) {
      let curPath = path + '/' + file;
      fs.lstat(curPath, function(err: Error, stats: any) {
        if (err) {
          callback(err, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
          fs.unlink(curPath, folderDone);
        }
      });
    });
  });
};

export default rmdirAsync;
