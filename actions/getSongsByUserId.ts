import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    // Get session data
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session?.user.id) {
        console.error(
            "Session Error:",
            sessionError?.message || "No user session available."
        );
        return []; // Return an empty array if there's a session error or no user
    }

    // Fetch songs from Supabase
    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", sessionData.session.user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase Query Error:", error.message);
        return []; // Return empty array if there's an error fetching songs
    }

    // Ensure data is returned as Song[] or empty array
    if (!data || data.length === 0) {
        console.log("No songs found for user:", sessionData.session.user.id);
        return [];
    }

    return data as Song[];
};

export default getSongsByUserId;
