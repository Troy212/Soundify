import { useState } from "react";

const DataSaverMode = () => {
    const [dataSaver, setDataSaver] = useState(false);

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Data Saver Mode</h2>
            <p className="text-sm text-gray-300">Reduce data usage by lowering streaming quality.</p>

            <div className="mt-4 flex items-center">
                <input
                    type="checkbox"
                    checked={dataSaver}
                    onChange={() => setDataSaver(!dataSaver)}
                    className="mr-2"
                />
                <label className="text-sm">{dataSaver ? "Enabled" : "Disabled"}</label>
            </div>
        </div>
    );
};

export default DataSaverMode;
