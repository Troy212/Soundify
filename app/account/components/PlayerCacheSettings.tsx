import { useState } from "react";

const PlayerCacheSettings = () => {
    const [cacheEnabled, setCacheEnabled] = useState(false);
    const [cacheCleared, setCacheCleared] = useState(false);

    const handleClearCache = () => {
        // Clear the cache (Replace this with your actual caching mechanism)
        localStorage.removeItem("cachedSongs"); // Example: Remove cached songs from local storage
        indexedDB.deleteDatabase("soundifyCache"); // Example: Clear IndexedDB cache (if used)

        setCacheCleared(true);
        setTimeout(() => setCacheCleared(false), 3000); // Hide message after 3 sec
    };

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">Soundify Player Cache</h2>
            <p className="text-sm text-gray-300">Manage cached songs for offline playback.</p>

            <div className="mt-4 flex items-center">
                <input
                    type="checkbox"
                    checked={cacheEnabled}
                    onChange={() => setCacheEnabled(!cacheEnabled)}
                    className="mr-2"
                />
                <label className="text-sm text-white">{cacheEnabled ? "Enabled" : "Disabled"}</label>
            </div>

            {cacheEnabled && (
                <button
                    onClick={handleClearCache}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
                >
                    Clear Cache
                </button>
            )}

            {cacheCleared && <p className="text-green-400 mt-2">Cache Cleared Successfully!</p>}
        </div>
    );
};

export default PlayerCacheSettings;
