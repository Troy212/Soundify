import { useState } from "react";

const presets = {
    Off: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    Flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    BassBoost: [5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
    TrebleBoost: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
    VocalBoost: [3, 2, 1, 0, -1, 0, 1, 2, 3, 4],
};

const EqualizerSettings = () => {
    const [selectedPreset, setSelectedPreset] = useState("Off");

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Equalizer Settings</h2>
            <p className="text-sm text-gray-300 mb-4">Adjust the equalizer with different presets.</p>

            <label className="block text-sm mb-2">Preset:</label>
            <select
                className="w-full p-2 rounded bg-gray-800 text-white"
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
            >
                {Object.keys(presets).map((preset) => (
                    <option key={preset} value={preset}>
                        {preset}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default EqualizerSettings;
