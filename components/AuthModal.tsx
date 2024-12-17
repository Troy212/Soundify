import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect, useState } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const [isProvidersWorking, setIsProvidersWorking] = useState(true);

    useEffect(() => {
        if (session) {
            router.refresh(); // Refresh the page to reflect login status
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Modal
            title="Welcome back"
            description={`Login to your account ${
                isProvidersWorking ? "" : "(Providers Under Maintenance)"
            }`}
            isOpen={isOpen}
            onChange={onChange}
        >
            <div className="w-full flex justify-center">
                <Auth
                    theme="dark"
                    magicLink
                    providers={isProvidersWorking ? ["google","spotify", "discord", "github"] : []}
                    supabaseClient={supabaseClient}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: {
                                    brand: "#404040",
                                    brandAccent: "#ff0000",
                                },
                            },
                        },
                    }}
                />
            </div>
        </Modal>
    );
};

export default AuthModal;
