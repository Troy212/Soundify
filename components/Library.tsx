"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useState } from "react";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const [isOpen, setIsOpen] = useState(false); // State to toggle Library visibility in mobile

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // Subs check or upload functionality
    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      {/* Library Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        {/* Add Button */}
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      {/* Mobile View Toggle Button */}
      <div className="md:hidden flex justify-center mt-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-x-2 text-neutral-400 hover:text-white transition"
        >
          {isOpen ? (
            <>
              <AiOutlineUp size={20} /> Hide Library
            </>
          ) : (
            <>
              <AiOutlineDown size={20} /> Show Library
            </>
          )}
        </button>
      </div>

      {/* Library Items */}
      <div
        className={`flex flex-col gap-y-2 mt-4 px-3 ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
