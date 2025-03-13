"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal"; 

// Account Settings Components
import EqualizerSettings from "./EqualizerSettings";
import CrossfadeSettings from "./CrossfadeSettings";
import AudioQualitySettings from "./AudioQualitySettings";
import DataSaverMode from "./DataSaverMode";
import PlayerCacheSettings from "./PlayerCacheSettings";
import ThemeSwitcher from "./ThemeSwitcher";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const [loading, setLoading] = useState(false);
    const authModal = useAuthModal();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const handleResetPasswordClick = () => {
        authModal.onOpen();
    };

    return (
        <div className="mb-7 px-6 py-4 bg-gray-800 text-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold mb-4">Account Details</h1>

                {user && (
                    <div className="mb-6 text-center">
                        <p className="text-xl">{user?.email || "No email"}</p>
                        <p className="text-md text-gray-400">{user?.id ? `User ID: ${user.id}` : "User not found"}</p>
                    </div>
                )}

                {loading && (
                    <div className="text-center mb-4">
                        <p>Loading...</p>
                    </div>
                )}

                <div className="text-center w-full max-w-md mx-auto">
                    <button
                        onClick={handleResetPasswordClick}
                        className="text-sm text-red-400 hover:underline"
                    >
                        Forgot Password? Reset here.
                    </button>
                </div>

                {/* Account Components */}
                <div className="mt-6 w-full space-y-6">
                    <EqualizerSettings />
                    <CrossfadeSettings />
                    
                    <DataSaverMode />
                    <PlayerCacheSettings />
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
    );
};

export default AccountContent;
