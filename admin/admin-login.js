import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //attempt to sign in user

  const { loginData, loginError  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (loginError) {
    document.getElementById("message").textContent = "Login failed: " + loginError.message;
  } else {
    document.getElementById("message").textContent = "Login successful!";
    // redirect to admin dashboard
  }

  //get user info
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    document.getElementById("message").textContent = "Error fetching user data";
    return;
  }

  // Check profile role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    document.getElementById("message").textContent = "Profile not found!";
    await supabase.auth.signOut();
    return;
  }

  if (profile.role !== "admin") {
    document.getElementById("message").textContent = "You are not authorized!";
    await supabase.auth.signOut();
    return;
  }

  document.getElementById("message").textContent = "✅ Login successful!";
  window.location.href = "/admin/index.html"; // admin dashboard page

});