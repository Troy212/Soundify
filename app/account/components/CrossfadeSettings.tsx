import { useState } from "react";

const CrossfadeSettings = () => {
    const [crossfade, setCrossfade] = useState(0);

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Crossfade</h2>
            <p className="text-sm text-gray-300">Smoothly transition between songs.</p>

            <label className="block text-sm mt-4">Crossfade (seconds): {crossfade}</label>
            <input
                type="range"
                min="0"
                max="10"
                value={crossfade}
                onChange={(e) => setCrossfade(parseInt(e.target.value, 10))} // Convert to number
                className="w-full"
            />
        </div>
    );
};

export default CrossfadeSettings;
