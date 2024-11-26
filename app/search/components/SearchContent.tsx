"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import UseOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const onPlay = UseOnPlay(songs); // Assuming UseOnPlay returns a function that accepts a song ID

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found. Try searching with a different title.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem
                            onClick={() => onPlay(song.id)} // Pass the song ID to the onPlay function
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
