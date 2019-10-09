const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const rmDir = require('../utils/rmdirUtil');
const execShellCommand = require('../utils/execShellCommand');

exports.getReposList = (req, res) => {
  const { repositoryId = '' } = req.params;

  execShellCommand(`git ls-tree --name-only master`, '', { cwd: path.join(global.reposPath, repositoryId) })
    .then(files => {
      files = files.split('\n');
      return Promise.all(
        files.map(
          file =>
            file &&
            execShellCommand(`git log -1 --pretty=format:"%H-%an-%cr-%B" ${file}`, file, {
              cwd: path.join(global.reposPath, repositoryId),
            }),
        ),
      );
    })
    .then(out => {
      const data = out.map(file => {
        file = file.split('-');
        if (file && file[0]) {
          return {
            name: file[4],
            hash: file[0],
            author: file[1],
            date: file[2],
            message: file[3],
            isFile: !!String(file[4]).match(/(\.[a-z]+)$/),
          };
        }
      });
      res.json({ data });
    });
};

exports.deleteRepoById = (req, res) => {
  const { repositoryId } = req.params;

  rmDir(path.join(global.reposPath, repositoryId), err => {
    if (err) {
      throw err;
    }
    res.json({ isSuccess: true });
  });
};

exports.getCommits = (req, res) => {
  const { repositoryId, commitHash = 'master' } = req.params;
  const { page } = req.query;

  exec(
    `git log ${commitHash} --pretty=format:"%H-%an-%ad"`,
    {
      cwd: path.join(global.reposPath, repositoryId),
    },
    (err, stdout) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
      }
      let commits = [];

      const data = stdout.split('\n').map(commit => {
        const parse = commit.split('-');
        return {
          hash: parse[0],
          author: parse[1],
          date: parse[2],
        };
      });

      const totalPages = Math.ceil(data.length / 10);

      if (page > 1 && page <= totalPages) {
        commits = data.slice(page * 10 - 10, page * 10);
      } else {
        commits = data.slice(0, 10);
      }
      res.json({ data: { commits, pages: { page: page || 1, totalPages } } });
    },
  );
};

exports.getDiffCommit = (req, res) => {
  const { repositoryId, commitHash } = req.params;

  exec(
    `git diff ${commitHash}^ --stat`,
    {
      cwd: path.join(global.reposPath, repositoryId),
      maxBuffer: 1024 * 1024,
    },
    (err, stdout) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({
        data: stdout,
      });
    },
  );
};

exports.getTree = (req, res) => {
  const { repositoryId, path: pathParam, commitHash } = req.params;

  exec(
    `git ls-tree --full-tree ${commitHash || 'master'} ${pathParam || ''}`,
    {
      cwd: path.join(global.reposPath, repositoryId),
    },
    (err, stdout) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ data: stdout });
    },
  );
};

exports.getFileContent = (req, res) => {
  const { repositoryId = '' } = req.params;

  fs.readFile(path.join(global.reposPath, repositoryId), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json({ data: data.split('\n') });
  });
};

exports.addRepo = (req, res) => {
  const { url } = req.body;

  exec(
    `GIT_TERMINAL_PROMPT=0 git clone ${url}`,
    {
      cwd: global.reposPath,
    },
    err => {
      if (err) {
        console.log(err);
        return res.json({ isSuccess: false });
      }
      res.json({ data: {}, isSuccess: true });
    },
  );
};
