import { createClient } from '@supabase/supabase-js';

const supabaseDemoUrl = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const supabaseDemoKey = 'sb_publishable_embxlHUxh_7_A1OriNUTTQ_uxid3RZh';
const supabaseDemo = createClient(supabaseDemoUrl, supabaseDemoKey);

async function checkBucket() {
    console.log("Checking bucket 'Demostraciones'...");
    const { data, error } = await supabaseDemo.storage.from('Demostraciones').list('', { limit: 10 });

    if (error) {
        console.error('Error fetching:', error);
    } else {
        console.log('Data:', data);
    }

    console.log("\nChecking bucket 'demostraciones'...");
    const { data: d2, error: e2 } = await supabaseDemo.storage.from('demostraciones').list('', { limit: 10 });

    if (e2) {
        console.error('Error fetching lower:', e2);
    } else {
        console.log('Data lower:', d2);
    }
}

checkBucket();
