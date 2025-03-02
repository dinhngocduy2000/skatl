// export const handleLogin =

import { COOKIE_KEYS } from "@/lib/enum/cookie-keys";

// Base configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Set in .env
// Check and refresh token
// export const handleCheckToken = async (): Promise<string> => {
//   const cookie = Cookies; // Using js-cookie
//   const token = cookie.get(COOKIE_KEYS.ACCESS_TOKEN);
//   const expiresAt = cookie.get(COOKIE_KEYS.EXPIRES_AT);

//   const isExpired = !token || !expiresAt || Date.now() > Number(expiresAt);

//   if (isExpired) {
//     try {
//       const newToken = await getRefreshToken();
//       return newToken;
//     } catch (error) {
//       console.error("Token refresh failed:", error);
//       throw error; // Let caller handle (e.g., redirect to login)
//     }
//   }

//   return token; // Return existing valid token
// };
// Generic fetch wrapper
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options, // Merge custom options (e.g., method, body)
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error; // Let the caller handle the error
  }
}

// Specific API methods
export const apiConfig = {
  // POST request (e.g., for login)
  post: <T>(endpoint: string, body: unknown) =>
    fetchAPI<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // GET request (e.g., for fetching user data)
  get: <T>(endpoint: string) =>
    fetchAPI<T>(endpoint, {
      method: "GET",
    }),

  // Add more methods as needed (PUT, DELETE, etc.)
};

export default apiConfig;
