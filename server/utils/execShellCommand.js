const path = require('path');
const { exec } = require('child_process');

function execShellCommand(cmd, fileName = '', options = {}) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd: path.join(global.reposPath),
        ...options,
      },
      (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? (fileName ? stdout + `-${fileName}` : stdout) : stderr);
      },
    );
  });
}

module.exports = execShellCommand;
