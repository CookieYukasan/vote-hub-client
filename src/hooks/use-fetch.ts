export const useFetch = async (url: string, options?: RequestInit) => {
  const headers = {
    ...options?.headers,
  };

  return fetch(`${process.env.API_ENDPOINT || "/api/"}${url}`, {
    ...options,
    headers,
  });
};
