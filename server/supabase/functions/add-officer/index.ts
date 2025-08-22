import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "npm:@supabase/supabase-js@2.43.1";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {


  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 401, headers });
  }

  try {
    const { name, position, linkedin, imageUrl } = await req.json();

    const { data, error } = await supabase.from("officers").insert([
      { name:name, position:position, linkedin:linkedin, image_url: imageUrl }
    ]).select();

    if (error) return new Response(JSON.stringify({ error: error.message}), { status: 400, headers });

    return new Response(JSON.stringify({ success: true, officer: data[0] }), { status: 200, headers });
  } catch (err:unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), { status: 500, headers });
  }
});
