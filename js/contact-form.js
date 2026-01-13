// ============================================
// CONTACT FORM - Formspree Integration
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Get form elements
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);

    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    // Hide any previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
      // Submit to Formspree
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success - show success message
        successMessage.style.display = 'block';
        form.style.display = 'none';

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Optional: Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
        }, 3000);
      } else {
        // Error response from Formspree
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Show error message
      errorMessage.style.display = 'block';
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.error('Form submission error:', error);
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      btnText.textContent = 'Send Message';
      submitBtn.style.opacity = '1';
    }
  });

  // Add real-time validation feedback
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      } else {
        input.style.borderColor = '';
      }
    });

    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.style.borderColor = '';
      }
    });
  });

  // Email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      }
    });
  }
});
