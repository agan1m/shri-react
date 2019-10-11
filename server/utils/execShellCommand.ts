const path = require('path');
const { exec } = require('child_process');

function execShellCommand(cmd: string, fileName = '', options = {}) {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd: path.join(global.reposPath),
        ...options,
      },
      (error: Error, stdout: string, stderr: string) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? (fileName ? stdout + `-${fileName}` : stdout) : stderr);
      },
    );
  });
}

export default execShellCommand;
