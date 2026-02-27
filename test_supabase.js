import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmbtcgilsicvvsltmzms.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtYnRjZ2lsc2ljdnZzbHRtem1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTkxODIsImV4cCI6MjA4MTU5NTE4Mn0.pd3CmAATwdtP4beaRWM6ufWyrdu8ywZ4JPAnsf7DX6c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log("Fetching from faq table with join...");
    const { data, error } = await supabase
        .from('faq')
        .select('*, categoriaFAQ(nombreCategoria)')
        .order('ORDEN', { ascending: true });

    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Data size:", data?.length);
        console.log("Sample:", JSON.stringify(data?.slice(0, 2), null, 2));
    }
}

testFetch();
