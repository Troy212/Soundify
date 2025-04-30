"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BiRepeat } from "react-icons/bi";
import { BiShuffle } from "react-icons/bi"; // Make sure this is included
import usePlayer from "@/hooks/usePlayer";
import { useRef, useState, useEffect } from "react";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null); // Reference to the audio element
    const [volume, setVolume] = useState(1); // Volume state
    const [isPlaying, setIsPlaying] = useState(false); // Play/pause state
    const [currentTime, setCurrentTime] = useState(0); // Current time of the audio
    const [duration, setDuration] = useState(0); // Duration of the audio
    const [isLooping, setIsLooping] = useState(false); // Loop state
    const [isMuted, setIsMuted] = useState(false); // Mute state

    // Handle shuffle mode
    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        let nextSongId: string;
        if (player.isShuffling) {
            const randomIndex = Math.floor(Math.random() * player.ids.length);
            nextSongId = player.ids[randomIndex];
        } else {
            const currentIndex = player.ids.findIndex((id) => id === player.activeId);
            nextSongId = player.ids[currentIndex + 1] || player.ids[0]; // Loop to first song
        }

        player.setId(nextSongId);
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];
        player.setId(previousSong || player.ids[player.ids.length - 1]);
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current?.duration || 0);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // Handle song ending with loop functionality
    const handleSongEnd = () => {
        if (isLooping) {
            audioRef.current?.play(); // Replay the song if looping is enabled
        } else {
            onPlayNext(); // Otherwise, go to the next song
        }
    };

    // Toggle loop state
    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    // Toggle shuffle state
    const toggleShuffle = () => {
        player.setShuffle(!player.isShuffling);
    };

    // Listen for play/pause events and update state accordingly
    useEffect(() => {
        if (audioRef.current) {
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);

            const audioElement = audioRef.current;
            audioElement.addEventListener("play", handlePlay);
            audioElement.addEventListener("pause", handlePause);

            return () => {
                audioElement.removeEventListener("play", handlePlay);
                audioElement.removeEventListener("pause", handlePause);
            };
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Ensure volume is applied to the new song
        }
    }, [songUrl, volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []); // Only run on initial mount

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/* Left Section */}
            <div className="flex w-full items-center gap-x-4 overflow-hidden">
                <div className="truncate">
                    <MediaItem data={song} />
                </div>
                <LikeButton songId={song.id} />
            </div>

            {/* Middle Section (Desktop and Mobile Controls) */}
            <div className="flex flex-col items-center justify-center w-full gap-y-4">
                {/* Controls (Play, Pause, Previous, Next, Loop, Shuffle) */}
                <div className="flex items-center gap-x-2">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <button onClick={togglePlayPause} className="text-white">
                        {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
                    </button>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    {/* Loop Button */}
                    <button
                        onClick={toggleLoop}
                        className={`cursor-pointer transition ${isLooping ? "text-red-500" : "text-neutral-400"} hover:text-red-500`}
                    >
                        <BiRepeat size={30} />
                    </button>
                    {/* Shuffle Button */}
                    <button
                        onClick={toggleShuffle}
                        className={`cursor-pointer transition ${player.isShuffling ? "text-red-500" : "text-neutral-400"} hover:text-red-500`}
                    >
                        <BiShuffle size={30} />
                    </button>
                </div>

                {/* Seek Bar (Red Color Progression) */}
                <div className="flex items-center justify-center w-full gap-x-2">
                    <span className="text-white">{formatTime(currentTime)}</span>

                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-3/4 md:w-1/2 appearance-none h-2 bg-red-500 rounded-lg"
                        style={{
                            background: `linear-gradient(to right, red ${(currentTime / duration) * 100}%, #ccc ${(currentTime / duration) * 100}%)`
                        }}
                    />

                    <span className="text-white">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume Control (Retained Position) */}
<div className="hidden md:flex w-full justify-end pr-2">
    <div className="flex items-center gap-x-2 w-full max-w-[200px]">
        {/* Volume percentage displayed ahead of mute button */}
        <span className="text-white text-sm">{Math.round(volume * 100)}%</span>

        <button
            onClick={() => {
                const newVolume = volume > 0 ? 0 : 1;
                if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                }
                setVolume(newVolume);
                // Save volume to localStorage
                localStorage.setItem('volume', newVolume.toString());
            }}
        >
            {volume === 0 ? (
                <HiSpeakerXMark size={25} />
            ) : (
                <HiSpeakerWave size={25} />
            )}
        </button>
        <div className="flex items-center gap-x-2 w-[80px]">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                    }
                    // Save volume to localStorage
                    localStorage.setItem('volume', newVolume.toString());
                }}
                className="w-full appearance-none h-2 rounded-lg"
                style={{
                    background: `linear-gradient(to right, red ${volume * 100}%, #ccc ${volume * 100}%)`
                }}
            />
        </div>
    </div>
</div>


            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
                autoPlay
            />
        </div>
    );
};

export default PlayerContent;
