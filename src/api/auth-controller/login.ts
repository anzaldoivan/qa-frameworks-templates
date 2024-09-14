const { expect, request } = require("@playwright/test");

export async function LoginPost(
  request,
  email: string,
  password: string,
): Promise<string> {
  const res = await request.post(
    "https://api.club-administration.qa.qubika.com/api/auth/login",
    {
      data: {
        email: email,
        password: password,
      },
    },
  );
  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.token.toString();
}
