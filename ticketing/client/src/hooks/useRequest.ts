import { useState } from 'react';
import axios from 'axios';
import { FromValue } from '@/lib/validation/formValidation';

type Method = 'get' | 'post';

interface Prop {
  url: string;
  method: Method;
  onSuccess: () => void;
}

type ErrorType = {
  message: string;
  field?: string;
}[];

export const useRequest = ({ url, method, onSuccess }: Prop) => {
  const [error, setError] = useState<ErrorType | null>(null);

  async function doRequest(body: FromValue) {
    try {
      setError(null);
      const response = await axios({
        url,
        method,
        data: body,
      });
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err: any) {
      setError(err.response.data.error);
    }
  }
  return { doRequest, error };
};
