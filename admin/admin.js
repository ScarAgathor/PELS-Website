const admin_page = document.getElementById('admin_page');
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const checkAuth = async () => {
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
    document.getElementById("auth-message").innerHTML = `
        <p>You are not logged in. Please <a href="../admin/login.html">log in</a> to continue.</p>
    `;
    } else {
        document.getElementById("auth-message").innerHTML = `<p>✅ Logged in as: ${user.email}</p>`;
        document.getElementById("admin-content").style.display = "block";
    }
}

checkAuth();