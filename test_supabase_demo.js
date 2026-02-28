import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const supabaseKey = 'sb_publishable_embxlHUxh_7_A1OriNUTTQ_uxid3RZh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log("Fetching from 'faq' table with join...");
    const { data, error } = await supabase
        .from('faq')
        .select('*, categoriaFAQ(nombreCategoria)')
        .order('ORDEN', { ascending: true });

    if (error) {
        console.error("Error fetching FAQ with join:", error);

        console.log("Trying without join...");
        const { data: d2, error: e2 } = await supabase.from('faq').select('*').limit(2);
        if (e2) console.error("Error without join:", e2);
        else console.log("Data without join:", d2);
    } else {
        console.log("Data size:", data?.length);
        console.log("Sample:", JSON.stringify(data?.slice(0, 2), null, 2));
    }
}

testFetch();
