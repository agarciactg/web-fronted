import { UserManager, UserManagerSettings } from "oidc-client-ts";
import { sleep } from "./helpers";
import axios from "axios";
import { apiKey, baseUrl } from "./apiConfig";
import { User } from "./types";

declare const FB: any;

const GOOGLE_CONFIG: UserManagerSettings = {
  authority: "https://accounts.google.com",
  client_id: "",
  client_secret: "",
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  scope: "openid email profile",
  loadUserInfo: true,
};

export const GoogleProvider = new UserManager(GOOGLE_CONFIG);

export const facebookLogin = () => {
  return new Promise((res, rej) => {
    let authResponse: any;
    FB.login(
      (r: any) => {
        if (r.authResponse) {
          authResponse = r.authResponse;
          FB.api(
            "/me?fields=id,name,email,picture.width(640).height(640)",
            (profileResponse: any) => {
              authResponse.profile = profileResponse;
              authResponse.profile.picture = profileResponse.picture.data.url;
              res(authResponse);
            }
          );
        } else {
          console.log("User cancelled login or did not fully authorize.");
          rej(undefined);
        }
      },
      { scope: "public_profile,email" }
    );
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((res, rej) => {
    let authResponse: any = {};
    FB.getLoginStatus((r: any) => {
      if (r.authResponse) {
        authResponse = r.authResponse;
        FB.api(
          "/me?fields=id,name,email,picture.width(640).height(640)",
          (profileResponse: any) => {
            authResponse.profile = profileResponse;
            authResponse.profile.picture = profileResponse.picture.data.url;
            res(authResponse);
          }
        );
      } else {
        res(undefined);
      }
    });
  });
};

export const authLogin = (email: string, password: string) => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    if (email === "admin@example.com" && password === "admin") {
      localStorage.setItem(
        "authentication",
        JSON.stringify({ profile: { email: "admin@example.com" } })
      );
      return res({ profile: { email: "admin@example.com" } });
    }
    return rej({ message: "Credentials are wrong!" });
  });
};

export const authLoginT = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const apiUrl: string = baseUrl + "auth/token/";

    const postData = {
      username: email,
      password: password,
    };

    const headers = {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, postData, { headers });
    const token: string = response.data.data.access;

    localStorage.setItem("authentication", JSON.stringify(token));

    const user = {
      profile: {
        email: email,
      },
    };

    return user;
  } catch (error) {
    return Promise.reject({ message: "Credenciales incorrectas!" });
  }
};

export const getAuthStatus = () => {
  return new Promise(async (res, rej) => {
    await sleep(500);
    try {
      let authentication = localStorage.getItem("authentication");
      if (authentication) {
        authentication = JSON.parse(authentication);
        return res(authentication);
      }
      return res(undefined);
    } catch (error) {
      return res(undefined);
    }
  });
};