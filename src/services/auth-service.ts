import type { LoginResponseModel, UserLoginModel } from "../models/auth-models";
import { API_PATH } from "../configs/api-config";

export async function login(loginModel: UserLoginModel): Promise<LoginResponseModel> {
  const endpoint = API_PATH + "/login";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginModel),
  });

  if (!response.ok) {
    let errorMessage = `Login failed (${response.status})`;

    try {
      const errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Response body එක හිස් නම් (Empty body) error එකක් නොවී මෙතැනින් ඉදිරියට යයි
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data as LoginResponseModel;
}

export function setToken(token: string) {
  localStorage.setItem("authToken", token);
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function removeToken() {
  localStorage.removeItem("authToken");
}
