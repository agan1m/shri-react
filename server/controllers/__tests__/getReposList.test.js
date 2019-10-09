import 'promisify-supertest';
import request from 'supertest';
import { app } from '../../app';

it('Должен вернуть список файлов и последний коммит', async done => {
  global.reposPath = '.\\tests\\testRepo';
  const res = await request(app).get('/repos/');
  const dataArr = res.body.data;
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
