import { useState } from 'react';
import axios from 'axios';
import { FromValue } from '@/lib/validation/formValidation';

type Method = 'get' | 'post';

interface Prop {
  url: string;
  method: Method;
  // body: FromValue;
}

export const useRequest = ({ url, method }: Prop) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  async function doRequest(body: FromValue) {
    try {
      const response = await axios({ url, method, data: body });
      return response.data;
    } catch (err) {
      console.log(err);
      // setError(err)
    }
  }
  return { doRequest, error };
};
