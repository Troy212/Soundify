import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { Subscription, userDetails } from "@/types";
import { createContext, useState, useEffect, useContext, } from "react";
import { error } from "console";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: userDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const userContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase,
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<userDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    const getSubscription = () =>
        supabase
            .from('subscription')
            .select('*, prices(*, products(*))')
            .in('status', ['trialing', 'active'])
            .single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                if (userDetailsPromise.status === "fulfilled") {
                    setUserDetails(userDetailsPromise.value.data as userDetails);
                }

                if (subscriptionPromise.status === "fulfilled") {
                    setSubscription(subscriptionPromise.value.data as Subscription);
                }

                setIsLoadingData(false);
            });
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    return <userContext.Provider value={value} {...props} />;
};


export const useUser = () => {
    const context = useContext(userContext);
    if (context == undefined) {
        throw new Error ('useUser must be used within a MyUserContextProvider');

    }

    return context;
};