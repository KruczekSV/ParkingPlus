import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { useStorage } from "./useStorage";
import { IUser } from "@/types/IUser";
import { useAsync } from "./useAsync";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useRouter } from "expo-router";
import axios from "axios";

export interface IUserResponse {
  user: IUser;
  accessToken: string;
}

export interface IRegisterResponse {
  message: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const storage = useStorage();
  const { api } = useApi();

  const signin = async (username: string, password: string) => {
    const response = await api.post<IUserResponse>("/auth/login", {
      username,
      password,
    });
    if (!response || !response.accessToken) {
      throw new Error("Invalid response from server");
    }
    const user = response.user;
    user.accessToken = response.accessToken;
    await storage.setJSON("user", user);
    setUser(user);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.accessToken}`;
    console.log(response.accessToken);
    console.log("test: ", axios.defaults.headers.common["Authorization"]);
    if (response.user.userRole === "admin") {
      router.push("/(admin)");
    } else {
      router.push("/(user)");
    }
  };

  const signup = async (
    username: string,
    password: string,
    passwordConfirm: string
  ) => {
    const response = await api.post<IRegisterResponse>("/auth/register", {
      username,
      password,
      passwordConfirm,
    });
    if (!response) {
      throw new Error("Invalid response from server");
    }
  };

  const signout = async () => {
    try {
      delete axios.defaults.headers.common["Authorization"];

      await storage.clear();

      setUser(null);

      router.push("/login");
    } catch (error) {
      // console.error("Error during signout:", error);
    }
  };

  const validate = () => {
    try {
      if (!user || !user.accessToken) {
        throw new Error("Neither user nor token are present in your browser");
      }
      const decodedToken = jwtDecode<JwtPayload>(user.accessToken);
      const currentTime = Date.now() / 1000;

      if (!decodedToken.exp || decodedToken.exp <= currentTime) {
        throw new Error("Token expired");
      }
    } catch (error: any) {
      console.log(error.message);
      signout();
    }
  };

  const auth = {
    signin: useAsync(signin),
    signup: useAsync(signup),
    signout: signout,
    validate: validate,
  };

  return { auth, user };
};
