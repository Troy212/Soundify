"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import usePlayer from "@/hooks/usePlayer";
import { useRef, useState, useEffect } from "react";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const onPlayNext = () => {
        if (player.ids.length === 0) return;
        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];
        player.setId(nextSong || player.ids[0]);
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

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleSongEnd = () => {
        onPlayNext();
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [songUrl, volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/* Left Section */}
            <div className="flex w-full items-center gap-x-4 overflow-hidden">
                <div className="flex justify-center w-full">
                    <MediaItem data={song} />
                </div>
                <LikeButton songId={song.id} />
            </div>

            {/* Middle Section (Desktop and Mobile Controls) */}
            <div className="flex flex-col items-center justify-center w-full py-4 gap-y-4">
                {/* Controls (Play, Pause, Previous, Next) */}
                <div className="flex items-center gap-x-4">
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
                </div>

                {/* Seek Bar */}
                <div className="flex items-center justify-center w-full gap-x-2">
                    <span className="text-white">{formatTime(currentTime)}</span>

                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-3/4 md:w-1/2 appearance-none h-2 bg-gray-300 rounded-lg"
                        style={{
                            background: `linear-gradient(to right, red ${
                                (currentTime / duration) * 100
                            }%, #ccc ${(currentTime / duration) * 100}%)`,
                        }}
                    />

                    <span className="text-white">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume Control */}
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <button
                        onClick={() => {
                            const newVolume = volume > 0 ? 0 : 1;
                            if (audioRef.current) {
                                audioRef.current.volume = newVolume;
                            }
                            setVolume(newVolume);
                        }}
                    >
                        {volume === 0 ? (
                            <HiSpeakerXMark size={25} />
                        ) : (
                            <HiSpeakerWave size={25} />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 appearance-none h-2 rounded-lg"
                        style={{
                            background: `linear-gradient(to right, red ${volume * 100}%, #ccc ${volume * 100}%)`,
                        }}
                    />
                </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={songUrl}
                autoPlay
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleSongEnd}
            />
        </div>
    );
};

export default PlayerContent;
