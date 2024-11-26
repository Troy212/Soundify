import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getURL } from "@/libs/helpers";
import { createOrRetrieveACustomer } from "@/libs/supabaseAdmin";

export async function POST() {
    try {
        const supabase = createRouteHandlerClient({
            cookies
        });

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('Could not get user');

        const customer = await createOrRetrieveACustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        if (!customer) throw new Error('Could not get customer');

        // Assuming you need to do something with the customer or generate a URL.
        const url = "some_generated_url";  // Replace this with actual URL generation logic.

        return NextResponse.json({ url });
        
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
