import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import rmDir from '../utils/rmdirUtil';
import execShellCommand from '../utils/execShellCommand';

exports.getReposList = (req: Request, res: Response) => {
  const { repositoryId = '' } = req.params;

  execShellCommand(`git ls-tree --name-only master`, '', { cwd: path.join(global.reposPath, repositoryId) })
    .then((files: string) => {
      const filesArr: Array<string> = files.split('\n');
      return Promise.all(
        filesArr.map(
          file =>
            file &&
            execShellCommand(`git log -1 --pretty=format:"%H-%an-%cr-%B" ${file}`, file, {
              cwd: path.join(global.reposPath, repositoryId),
            }),
        ),
      );
    })
    .then((out: Array<string>) => {
      const data = out.map(file => {
        const fileArr = file.split('-');
        if (fileArr && fileArr[0]) {
          return {
            name: fileArr[4],
            hash: fileArr[0],
            author: fileArr[1],
            date: fileArr[2],
            message: fileArr[3],
            isFile: !!String(fileArr[4]).match(/(\.[a-z]+)$/),
          };
        }
      });
      res.json({ data });
    });
};

exports.deleteRepoById = (req: Request, res: Response) => {
  const { repositoryId } = req.params;

  rmDir(path.join(global.reposPath, repositoryId), (err: Error) => {
    if (err) {
      throw err;
    }
    res.json({ isSuccess: true });
  });
};

exports.getCommits = (req: Request, res: Response) => {
  const { repositoryId, commitHash = 'master' } = req.params;
  const { page } = req.query;

  exec(
    `git log ${commitHash} --pretty=format:"%H-%an-%ad"`,
    {
      cwd: path.join(global.reposPath, repositoryId),
    },
    (err: Error, stdout: string) => {
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

exports.getDiffCommit = (req: Request, res: Response) => {
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

exports.getTree = (req: Request, res: Response) => {
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

exports.getFileContent = (req: Request, res: Response) => {
  const { repositoryId = '' } = req.params;

  fs.readFile(path.join(global.reposPath, repositoryId), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json({ data: data.split('\n') });
  });
};

exports.addRepo = (req: Request, res: Response) => {
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
