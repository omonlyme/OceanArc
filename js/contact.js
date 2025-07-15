document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('.submit-btn');
  const formMessage = document.getElementById('formMessage');

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  formMessage.style.display = 'none';

  try {
    // Collect form data
    const formData = {
      country: document.getElementById('country').value,
      name: document.getElementById('name').value,
      company: document.getElementById('company').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      designation: document.getElementById('designation').value,
      message: document.getElementById('message').value
    };

    // Send to InfinityFree backend
    const response = await fetch('https://api.oceanarcexim.com/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      formMessage.textContent = 'Thank you! Your inquiry has been submitted successfully.';
      formMessage.className = 'form-message success';
      form.reset();
    } else {
      throw new Error(result.message || 'Server returned an error');
    }
  } catch (error) {
    formMessage.textContent = `Error: ${error.message}`;
    formMessage.className = 'form-message error';
    console.error('Submission error:', error);
  } finally {
    formMessage.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Inquiry';

    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});