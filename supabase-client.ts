import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://afgulombercjfzbdzwtf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3Vsb21iZXJjamZ6YmR6d3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTc1ODgsImV4cCI6MjA3OTQ3MzU4OH0.Mjs7eVC0SyonITQppwug6ysM0AZSCTi_oEIXuSAFnVg"
);
