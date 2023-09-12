export const useFetch = async (url: string, options?: RequestInit) => {
  const headers = {
    ...options?.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
