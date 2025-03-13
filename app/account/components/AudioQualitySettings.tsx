import { useState, useEffect } from "react";

interface AudioQualitySettingsProps {
    audioElement: HTMLAudioElement | null;
}

const AudioQualitySettings: React.FC<AudioQualitySettingsProps> = ({ audioElement }) => {
    const [audioQuality, setAudioQuality] = useState("Hi-Res Lossless");

    const getAudioSource = (quality: string) => {
        // Replace with actual URLs of different quality versions
        const qualityMap: Record<string, string> = {
            "Low": "https://example.com/song_low.mp3",
            "Medium": "https://example.com/song_medium.mp3",
            "High": "https://example.com/song_high.mp3",
            "Hi-Res Lossless": "https://example.com/song_hi_res.mp3"
        };
        return qualityMap[quality] || qualityMap["Hi-Res Lossless"];
    };

    useEffect(() => {
        if (!audioElement) return;

        const newSource = getAudioSource(audioQuality);
        if (audioElement.src !== newSource) {
            audioElement.src = newSource;
            audioElement.load(); // Reload the new source
            audioElement.play(); // Auto-play after switching quality
        }
    }, [audioQuality, audioElement]);

    return (
        <div className="p-4 bg-gray-700 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Audio Quality</h2>
            <p className="text-sm text-gray-300">Choose between Low, Medium, High, and Hi-Res Lossless.</p>

            <select
                className="w-full p-2 rounded bg-gray-800 text-white mt-4"
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Hi-Res Lossless">Hi-Res Lossless</option>
            </select>
        </div>
    );
};

export default AudioQualitySettings;
