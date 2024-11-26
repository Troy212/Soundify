"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    // Fetch liked status on mount
    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    // Determine icon based on liked status
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    // Handle like/unlike button click
    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            // Unlike the song
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
                toast.success("Removed from liked songs.");
            }
        } else {
            // Like the song
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({
                    song_id: songId,
                    user_id: user.id,
                });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Added to liked songs");
            }
        }

        router.refresh();
    };

    return (
        <button onClick={handleLike} className="hover:opacity-65 transition">
            <Icon color={isLiked ? "#ff0000" : "white"} size={25} />
        </button>
    );
};

export default LikeButton;
