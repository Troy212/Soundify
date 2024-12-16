import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types_db";
import { Price, Product } from "@/types";
import { toDataTime } from "./helpers";

export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const upsertProductRecord = async (product: Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? undefined,
        image: product.image ?? undefined,
        metadata: product.metadata,
    };

    const { error } = await supabaseAdmin
        .from('products')
        .upsert([productData]);

    if (error) {
        throw error;
    }

    console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Price) => {
    const priceData: Price = {
        id: price.id,
        product_id: price.product_id,
        active: price.active,
        currency: price.currency,
        description: price.description ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.interval,
        interval_count: price.interval_count,
        trial_period_days: price.trial_period_days,
        metadata: price.metadata,
    };

    const { error } = await supabaseAdmin
        .from('prices')
        .upsert([priceData]);

    if (error) {
        throw error;
    }

    console.log(`Price inserted/updated: ${price.id}`);
};

export {
    upsertProductRecord,
    upsertPriceRecord
};