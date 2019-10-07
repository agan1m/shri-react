import { httpClient } from './httpClient';
import { filesApi } from './filesApi';

export function apiFactory(http) {
  return {
    files: filesApi(http),
  };
}

const http = httpClient('http://localhost:3000');
const api = apiFactory(http);

export default api;