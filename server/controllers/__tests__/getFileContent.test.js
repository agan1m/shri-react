import 'promisify-supertest';
import request from 'supertest';
import { app } from '../../app';

it('Должен вернуть содержимое файла', async done => {
  global.reposPath = '.\\server\\controllers\\__tests__';
  const res = await request(app).get('/repos/mockTest.txt/blob');

  expect(res.body).toEqual({ data: ['test123\r', 'test'] });
  done();
});
