import { useCallback, useState } from "react";

export const useHttp = () => {
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        if (body) {
          if (!body.formData) {
            body = JSON.stringify(body);
            headers["Content-Type"] = "application/json";
          } else {
            body = body.formData;
          }
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong.");
        }

        return data;
      } catch (e) {
        setError(e.message);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { request, error, clearError };
};
