import { useMutation, useQuery } from "@tanstack/react-query";
import { UserAPI } from "../api/user";
import { CreateUser } from "../gql/graphql";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouts } from "../lib/app-routes";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: UserAPI.getMe,
  });
};

export const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/logout");
      return response.data;
    },
    mutationKey: ["signOut"],
    onSuccess: () => {
      router.push(AppRouts.home);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: CreateUser) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
    mutationKey: ["signup"],
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: async (data: Pick<CreateUser, "email" | "password">) => {
      const response = await axios.post("/api/auth/login", data);
      return response.data;
    },
    mutationKey: ["signin"],
  });
};
