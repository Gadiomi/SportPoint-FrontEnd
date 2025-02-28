import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api/v1',
});

export const axiosBaseQuery =
  ({ baseURL }: { baseURL: string }) =>
  ({ url, method, data }: { url: string; method: string; data: any }) => {
    return axiosInstance({ url: baseURL + url, method, data })
      .then(response => ({ data: response.data }))
      .catch(error => ({ error: error.response?.data || error.message }));
  };
