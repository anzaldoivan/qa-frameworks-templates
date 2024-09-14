const { playwright } = require("@playwright/test");

export function SetContext(token: string): object {
  let context = {
    // All requests we send go to this API endpoint.
    baseURL: "https://api.club-administration.qa.qubika.com",
    extraHTTPHeaders: {
      // Add authorization token to all requests.
      Authorization: `Bearer ${token}`,
    },
  };
  return context;
}
