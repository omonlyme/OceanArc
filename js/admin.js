document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorAlert = document.getElementById('errorAlert');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  
  // Show loading state
  errorAlert.style.display = 'none';
  btnText.textContent = 'Authenticating...';
  btnLoader.style.display = 'inline-block';
  
  try {
    const response = await fetch('https://api.oceanarcexim.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store token and redirect
      localStorage.setItem('adminToken', data.token);
      window.location.href = 'admin.html';
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    errorAlert.textContent = error.message;
    errorAlert.style.display = 'block';
    btnText.textContent = 'Login';
    btnLoader.style.display = 'none';
  }
});

// Check if already logged in
if(localStorage.getItem('adminToken') && window.location.pathname.includes('admin-login.html')) {
  window.location.href = 'admin.html';
}