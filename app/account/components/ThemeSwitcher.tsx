import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        const root = document.documentElement; // Target the <html> tag
        root.classList.remove("dark", "light");
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">Theme</h2>
            <p className="text-sm text-gray-300">Toggle between Dark Mode and Light Mode.</p>

            <select
                className="w-full p-2 rounded bg-gray-800 text-white mt-4"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>
        </div>
    );
};

export default ThemeSwitcher;
