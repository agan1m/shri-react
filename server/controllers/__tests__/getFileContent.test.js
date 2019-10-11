import 'promisify-supertest';
import request from 'supertest';
import { app } from '../../app';
import path from 'path';

it('Должен вернуть содержимое файла', async done => {
  global.reposPath = path.join('.', 'server', 'controllers', '__tests__');
  const res = await request(app).get('/repos/mockTest.txt/blob');

  expect(res.body).toEqual({ data: ['test123\r', 'test'] });
  done();
});
