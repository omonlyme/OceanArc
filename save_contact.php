<script>
  document.getElementById('inquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formMessage = document.getElementById('formMessage');

    fetch('https://oceanarc-data.infy.uk/save_contact.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(data => {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Your inquiry has been submitted successfully!';
      form.reset();
    })
    .catch(err => {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message error';
      formMessage.textContent = 'There was an error submitting your inquiry. Please try again.';
    });
  });
</script>
