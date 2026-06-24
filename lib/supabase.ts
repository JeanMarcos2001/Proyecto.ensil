import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtrugvxgztnxbhwjtiou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cnVndnhnenRueGJod2p0aW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNDQxMTksImV4cCI6MjA4NzcyMDExOX0.Kw-SMk8ABVNfFEeYoN8oDgbpDv7Uk_cDN23IccH7zoM';

export const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };
