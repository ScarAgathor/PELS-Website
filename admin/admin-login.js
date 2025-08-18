import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //attempt to sign in user
  const { data, error  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      document.getElementById("message").style.display = "block"
      document.getElementById("message").style.color = `#b71933`
      document.getElementById("message").textContent = "Incorrect email or password. Please try again.";
    } else {
      document.getElementById("message").textContent = error.message;
    }
  } else {
    document.getElementById("message").style.display = "block"
    document.getElementById("message").style.color = `#2b9015`
    document.getElementById("message").textContent = "Login successful!";
  }

  //get user info
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("Error fetching user data");
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

  window.location.href = "/admin/index.html"; // admin dashboard page
});