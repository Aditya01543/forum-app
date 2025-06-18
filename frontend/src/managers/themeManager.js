import { create } from "zustand";

export const themeManager = create((set) => ({
    theme: localStorage.getItem("forum-app-theme") || "abyss",
    setTheme: (theme) => {
        localStorage.setItem("forum-app-theme", theme);
        set({theme:theme});
    }
}));