const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetch = async (url: string, options?: RequestInit) => {
  const headers = {
    ...options?.headers,
  };

  return fetch(`${process.env.API_ENDPOINT}${url}`, {
    ...options,
    headers,
  });
};
