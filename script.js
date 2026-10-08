/* ==========================================================================
   Contact / Signup Form — Validation & Interaction Logic
   Vanilla JavaScript only. No backend, no frameworks.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. ELEMENT REFERENCES
     ------------------------------------------------------------------ */

  const form = document.getElementById('signupForm');
  const successMessage = document.getElementById('successMessage');

  const fields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    message: document.getElementById('message'),
    terms: document.getElementById('terms'),
  };

  const errorEls = {
    fullName: document.getElementById('fullNameError'),
    email: document.getElementById('emailError'),
    phone: document.getElementById('phoneError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmPasswordError'),
    message: document.getElementById('messageError'),
    terms: document.getElementById('termsError'),
  };

  const passwordStrengthWrap = document.getElementById('passwordStrength');
  const passwordStrengthFill = document.getElementById('passwordStrengthFill');
  const passwordStrengthText = document.getElementById('passwordStrengthText');

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_PATTERN = /^\d{10}$/;

  /* ------------------------------------------------------------------
     2. ERROR DISPLAY HELPERS
     ------------------------------------------------------------------ */

  /**
   * Show an error message under a field and mark the field as invalid.
   */
  function showError(fieldKey, message) {
    const input = fields[fieldKey];
    const errorEl = errorEls[fieldKey];

    if (input.type !== 'checkbox') {
      input.classList.add('is-invalid');
    }
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }

  /**
   * Clear the error message and invalid state for a single field.
   */
  function clearError(fieldKey) {
    const input = fields[fieldKey];
    const errorEl = errorEls[fieldKey];

    input.classList.remove('is-invalid');
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
  }

  /**
   * Clear every error message in the form (used before a fresh validation pass).
   */
  function clearAllErrors() {
    Object.keys(fields).forEach(clearError);
  }

  /* ------------------------------------------------------------------
     3. FIELD VALIDATION FUNCTIONS
     Each function validates one field, shows/clears its own error,
     and returns true when the field is valid.
     ------------------------------------------------------------------ */

  function validateName() {
    const value = fields.fullName.value.trim();

    if (value === '') {
      showError('fullName', 'Full name is required.');
      return false;
    }
    if (value.length < 3) {
      showError('fullName', 'Name must be at least 3 characters.');
      return false;
    }
    clearError('fullName');
    return true;
  }

  function validateEmail() {
    const value = fields.email.value.trim();

    if (value === '') {
      showError('email', 'Email address is required.');
      return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
      showError('email', 'Please enter a valid email address.');
      return false;
    }
    clearError('email');
    return true;
  }

  function validatePhone() {
    const value = fields.phone.value.trim();

    if (value === '') {
      showError('phone', 'Phone number is required.');
      return false;
    }
    if (!PHONE_PATTERN.test(value)) {
      showError('phone', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    clearError('phone');
    return true;
  }

  function validatePassword() {
    const value = fields.password.value;

    if (value === '') {
      showError('password', 'Password is required.');
      return false;
    }
    if (value.length < 8) {
      showError('password', 'Password must contain at least 8 characters.');
      return false;
    }
    clearError('password');
    return true;
  }

  function validateConfirmPassword() {
    const value = fields.confirmPassword.value;
    const original = fields.password.value;

    if (value === '') {
      showError('confirmPassword', 'Please confirm your password.');
      return false;
    }
    if (value !== original) {
      showError('confirmPassword', 'Passwords do not match.');
      return false;
    }
    clearError('confirmPassword');
    return true;
  }

  function validateMessage() {
    const value = fields.message.value.trim();

    if (value === '') {
      showError('message', 'Message is required.');
      return false;
    }
    if (value.length < 10) {
      showError('message', 'Message must contain at least 10 characters.');
      return false;
    }
    clearError('message');
    return true;
  }

  function validateTerms() {
    if (!fields.terms.checked) {
      showError('terms', 'You must agree to the Terms & Conditions.');
      return false;
    }
    clearError('terms');
    return true;
  }

  /* ------------------------------------------------------------------
     4. PASSWORD VISIBILITY TOGGLE
     ------------------------------------------------------------------ */

  document.querySelectorAll('.toggle-visibility').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const eyeIcon = button.querySelector('.icon-eye');
      const eyeOffIcon = button.querySelector('.icon-eye-off');

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';

      eyeIcon.hidden = isHidden;
      eyeOffIcon.hidden = !isHidden;
      button.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
  });

  /* ------------------------------------------------------------------
     5. PASSWORD STRENGTH INDICATOR
     ------------------------------------------------------------------ */

  function getPasswordStrength(value) {
    if (value.length === 0) return null;

    let score = 0;
    if (value.length >= 8) score += 1;
    if (value.length >= 12) score += 1;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    return 'strong';
  }

  function updatePasswordStrength() {
    const value = fields.password.value;
    const level = getPasswordStrength(value);

    if (!level) {
      passwordStrengthFill.removeAttribute('data-level');
      passwordStrengthFill.style.width = '0%';
      passwordStrengthText.textContent = '';
      return;
    }

    const labels = { weak: 'Weak', medium: 'Medium', strong: 'Strong' };
    passwordStrengthFill.setAttribute('data-level', level);
    passwordStrengthText.textContent = labels[level];
  }

  fields.password.addEventListener('input', updatePasswordStrength);

  /* ------------------------------------------------------------------
     6. LIVE (ON-INPUT) RE-VALIDATION
     Once a field has an error, clear it automatically as soon as it
     becomes valid, without waiting for the next full submit.
     ------------------------------------------------------------------ */

  const liveValidators = {
    fullName: validateName,
    email: validateEmail,
    phone: validatePhone,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    message: validateMessage,
  };

  Object.keys(liveValidators).forEach((key) => {
    fields[key].addEventListener('input', () => {
      if (fields[key].classList.contains('is-invalid')) {
        liveValidators[key]();
      }
      // Re-check confirm-password whenever the main password changes.
      if (key === 'password' && fields.confirmPassword.classList.contains('is-invalid')) {
        validateConfirmPassword();
      }
    });
  });

  fields.terms.addEventListener('change', () => {
    if (fields.terms.checked) {
      clearError('terms');
    }
  });

  /* ------------------------------------------------------------------
     7. FORM SUBMISSION
     ------------------------------------------------------------------ */

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    clearAllErrors();
    successMessage.hidden = true;

    // Run every validator; use bitwise-safe evaluation so all functions run
    // (avoids short-circuiting, so every relevant error is shown at once).
    const results = [
      validateName(),
      validateEmail(),
      validatePhone(),
      validatePassword(),
      validateConfirmPassword(),
      validateMessage(),
      validateTerms(),
    ];

    const isFormValid = results.every(Boolean);

    if (!isFormValid) {
      // Move focus to the first invalid field for accessibility.
      const firstInvalid = form.querySelector('.is-invalid, input[type="checkbox"]:not(:checked)');
      const firstErrorKey = Object.keys(fields).find(
        (key) => fields[key].classList.contains('is-invalid') || (key === 'terms' && !fields.terms.checked && errorEls.terms.classList.contains('is-visible'))
      );
      if (firstErrorKey) {
        fields[firstErrorKey].focus();
      } else if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // All valid: show success, reset form and UI state.
    successMessage.hidden = false;
    form.reset();
    clearAllErrors();
    updatePasswordStrength();
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

});
