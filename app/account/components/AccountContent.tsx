"use client";

import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal"; // Assuming you have this hook to manage modals

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const [loading, setLoading] = useState(false);
    const authModal = useAuthModal(); // Hook to control the AuthModal

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // Trigger the AuthModal when "Reset Password" link is clicked
    const handleResetPasswordClick = () => {
        authModal.onOpen(); // Open the AuthModal
    };

    return (
        <div className="mb-7 px-6 py-4 bg-gray-800 text-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-semibold mb-4">Account Details</h1>

                {/* Displaying user information */}
                {user && (
                    <div className="mb-6 text-center">
                        <p className="text-xl">{user?.email || "No email"}</p>
                        <p className="text-md text-gray-400">{user?.id ? `User ID: ${user.id}` : "User not found"}</p>
                    </div>
                )}

                {/* Display loading spinner if needed */}
                {loading && (
                    <div className="text-center mb-4">
                        <p>Loading...</p>
                    </div>
                )}

                {/* Reset Password Link - Opens the AuthModal */}
                <div className="text-center w-full max-w-md mx-auto">
                    <button
                        onClick={handleResetPasswordClick}
                        className="text-sm text-red-400 hover:underline"
                    >
                        Forgot Password? Reset here.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountContent;
