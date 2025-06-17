import {create} from "zustand";

export const authManager = create((set, get) => ({
    currentUser : null,
    isLoggingIn : false,
    isSigningUp : false,

    login: async(data) => {
        console.log("Login");
    },

    signup: async(data) => {
        //
    }
}));