export function filesApi(http) {
  return {
    getFiles: (path = '') => {
      return http.get(`/repos${path}`);
    },

    getFile: file => {
      return http.get(`/repos/${file}/blob`);
    },
  };
}
