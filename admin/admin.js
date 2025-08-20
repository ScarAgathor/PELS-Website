import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const admin_page = document.getElementById('admin_page');

document.addEventListener('DOMContentLoaded', () => {
    if(admin_page) {
        checkAuth();
    }
})

const addOfficerButton = document.getElementById('addOfficerBtn');

addOfficerButton.addEventListener('click', () => {

})

const addOffcicerForm = document.getElementById('addOfficerForm')
addOffcicerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('officerName').value;
    const position = document.getElementById('officerPosition').value;
    const linkedin = document.getElementById('officerLinkedIn').value;
    const image = document.getElementById('officerImage').files[0];

    if (!image) {
        console.log('Please select an image!');
        return;
    }

    try{
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'officer_upload');
        formData.append('folder', 'PELS WEBSITE/officers');

        const cloudName = 'dvcpaters'; // replace with your cloud name
        const cloudRes  = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
        });
        const cloudData = await cloudRes.json();
        const imageUrl = cloudData.secure_url; // Cloudinary returns this URL

        // 3. Create officer object
        const officer = { name, position, linkedin, imageUrl };

        const addOfficerRes = await fetch('http://127.0.0.1:54321/functions/v1/add-officer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(officer)
        });

        const addedOfficerData = await addOfficerRes.json();
        if (addedOfficerData.success) {
            console.log('Officer added!');
            addOffcicerForm.reset();
        } else {
            console.error(addedOfficerData.error);
        }

        
    } catch(error) {
        console.error('Error uploading officer:', error);
    }
})


const checkAuth = async () => {
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
    document.getElementById("auth-message").innerHTML = `
        <p>You are not logged in. Please <a href="../admin/login.html">log in</a> to continue.</p>
    `;
    } else {
        console.log('logged in')
    }
}

