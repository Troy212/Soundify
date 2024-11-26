import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createOrRetrieveACustomer } from "@/libs/supabaseAdmin";

export async function POST() {
    try {
        // Create Supabase client using cookies
        const supabase = createRouteHandlerClient({
            cookies
        });

        // Get the authenticated user
        const { data: { user } } = await supabase.auth.getUser();

        // Handle case when user is not authenticated
        if (!user) throw new Error('Could not get user');

        // Retrieve or create the customer
        const customer = await createOrRetrieveACustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        // Handle case when customer creation or retrieval fails
        if (!customer) throw new Error('Could not get customer');

        // Generate a customer portal URL (replace with your logic)
        // const url = await getURL(customer);  // Assuming getURL() generates a URL based on the customer

        // return NextResponse.json({ url });
        
    } catch (error: any) {
        // Log and return a response in case of an error
        console.log(error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
