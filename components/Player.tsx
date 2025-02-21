"use client";

import { useState, useEffect } from "react";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dominantColor, setDominantColor] = useState("rgba(0,0,0,0.7)");

    // Supabase base URL for images
    const supabaseBaseUrl = "https://kaqfkpuetpczhutqdbab.supabase.co/storage/v1/object/public/images/";

    // Construct the correct image URL
    const imageUrl = song?.image_path
        ? (song.image_path.startsWith("http") ? song.image_path : `${supabaseBaseUrl}${song.image_path}`)
        : "/default-artwork.png"; // Fallback image if no artwork is available

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); // Detect mobile view
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Log image URL safely
    useEffect(() => {
        console.log("Final Image URL:", imageUrl);
    }, [imageUrl]);

    // Extract Dominant Color from Album Art
    useEffect(() => {
        if (!isFullScreen) return; // Only extract color in fullscreen mode

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 4 * 100) { // Skip some pixels for performance
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }

            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            setDominantColor(`rgba(${r}, ${g}, ${b}, 0.8)`);
        };
    }, [imageUrl, isFullScreen]);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <>
            {/* Main Player Container */}
            <div 
                className={`fixed w-full transition-all duration-300 ${
                    isFullScreen 
                        ? "inset-0 flex flex-col items-center justify-start backdrop-blur-3xl h-full pt-20 bg-black/80"
                        : "bottom-0 bg-black h-[100px] px-4 py-2"
                }`}
                style={{
                    background: isFullScreen
                        ? `linear-gradient(to bottom, ${dominantColor}, rgba(0,0,0,0.9))`
                        : "black"
                }}
            >
                {/* Fullscreen Mode */}
                {isFullScreen && (
                    <div className="flex flex-col items-center w-full h-full justify-start mt-10">
                        
                        {/* Display the image */}
                        <img 
                            src={imageUrl} 
                            alt={song.title} 
                            className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-lg shadow-lg object-cover"
                            onError={(e) => console.log("Image Load Error:", e)}
                        />

                        {/* Song Title & Artist */}
                        <div className="text-center text-white mt-4">
                            <h2 className="text-2xl md:text-3xl font-semibold">{song.title}</h2>
                            <p className="text-md md:text-lg text-gray-300">{song.author}</p>
                        </div>
                    </div>
                )}

                {/* Player Controls */}
                <PlayerContent key={songUrl} song={song} songUrl={songUrl} />

                {/* Fullscreen Toggle Button */}
                <button 
                    className={`text-white bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700
                        w-10 h-10 text-base transition-all duration-300
                        ${isMobile ? "absolute bottom-28 right-4" : "fixed bottom-5 right-5"}
                    `}
                    onClick={() => {
                        console.log("Toggling Fullscreen: ", !isFullScreen);
                        setIsFullScreen(!isFullScreen);
                    }}
                >
                    {isFullScreen ? "✖" : "⛶"}
                </button>
            </div>
        </>
    );
};

export default Player;
