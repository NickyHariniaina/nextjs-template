import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

if (!baseURL && typeof window === 'undefined') {
  console.warn('NEXT_PUBLIC_APP_URL is not set. Using default localhost URL for auth client.');
}

export const authClient = createAuthClient({
  baseURL: baseURL || "http://localhost:3000",
    plugins:[
    usernameClient()
  ]
});

export const {signIn,signOut,signUp, useSession, updateUser, changeEmail, changePassword} = authClient;