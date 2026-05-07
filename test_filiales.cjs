const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const supabaseKey = 'sb_publishable_embxlHUxh_7_A1OriNUTTQ_uxid3RZh';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('filiales').select('*').limit(2);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', JSON.stringify(data, null, 2));
  }
}

test();
