import 'promisify-supertest';
import request from 'supertest';
const path = require('path');
const { app } = require('../../app.ts');

it('Должен вернуть список файлов и последний коммит', async done => {
  global.reposPath = path.join('.', 'tests', 'testRepo');
  console.log(app)
  const res = await request(app).get('/repos/');
  console.log(res)
  const dataArr = res.body.data;
  console.log(dataArr);
  const { date } = dataArr[0];

  expect(res.body).toEqual({
    data: [
      {
        author: 'MarsovVI',
        date: date,
        hash: '46eafc943cd9ce4774fc362cdb15f9f5d7003b52',
        isFile: true,
        message: 'init\n',
        name: 'test.txt',
      },
      null,
    ],
  });
  done();
});
