/* ==========================================================
   KV Fitness Coaching — Contact Form Validation
   Capitalizes the first letter of First Name, Last Name, and
   City, and checks the Zip Code and Email fields with
   JavaScript before the form is allowed to "submit."
   ========================================================== */

// Capitalize the first letter of whatever the visitor typed
// into a given field. Called when the visitor leaves the field.
function capitalizeFirstLetter(fieldId) {
  var field = document.getElementById(fieldId);
  var value = field.value.trim();

  if (value.length > 0) {
    field.value = value.charAt(0).toUpperCase() + value.slice(1);
  }
}

// A valid U.S. zip code is 5 digits, or 5 digits + a dash + 4 digits
function isValidZip(value) {
  var zipPattern = /^\d{5}(-\d{4})?$/;
  return zipPattern.test(value.trim());
}

// A simple check for something@something.something
function isValidEmail(value) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value.trim());
}

// Show an error message under a field (or clear it with an empty string)
function showError(fieldId, message) {
  var errorSpan = document.getElementById(fieldId + "-error");
  if (errorSpan) {
    errorSpan.textContent = message;
  }
}

// Check every field the assignment requires and report the result.
// Returns true only if everything passes.
function validateContactForm() {
  var isValid = true;

  var firstName = document.getElementById("first-name");
  var lastName = document.getElementById("last-name");
  var city = document.getElementById("city");
  var zip = document.getElementById("zip");
  var email = document.getElementById("email");

  // Make sure names and city are capitalized even if the
  // visitor never left the field (e.g. they pasted text in).
  capitalizeFirstLetter("first-name");
  capitalizeFirstLetter("last-name");
  capitalizeFirstLetter("city");

  if (firstName.value.trim().length < 2) {
    showError("first-name", "Please enter your first name.");
    isValid = false;
  } else {
    showError("first-name", "");
  }

  if (lastName.value.trim().length < 2) {
    showError("last-name", "Please enter your last name.");
    isValid = false;
  } else {
    showError("last-name", "");
  }

  if (city.value.trim().length < 2) {
    showError("city", "Please enter your city.");
    isValid = false;
  } else {
    showError("city", "");
  }

  if (!isValidZip(zip.value)) {
    showError("zip", "Enter a valid zip code, like 02118 or 02118-1234.");
    isValid = false;
  } else {
    showError("zip", "");
  }

  if (!isValidEmail(email.value)) {
    showError("email", "Enter a valid email address, like jane@example.com.");
    isValid = false;
  } else {
    showError("email", "");
  }

  return isValid;
}

// Wire everything up once the page has finished loading
window.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");

  // Capitalize First Name, Last Name, and City as soon as the
  // visitor tabs or clicks away from each field
  document.getElementById("first-name").addEventListener("blur", function () {
    capitalizeFirstLetter("first-name");
  });
  document.getElementById("last-name").addEventListener("blur", function () {
    capitalizeFirstLetter("last-name");
  });
  document.getElementById("city").addEventListener("blur", function () {
    capitalizeFirstLetter("city");
  });

  // Validate everything with JavaScript when the form is submitted
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateContactForm()) {
      document.getElementById("form-status").textContent =
        "Thanks! Your message passed validation and would be sent to Kevin. (Demo form — no backend attached.)";
      form.reset();
    } else {
      document.getElementById("form-status").textContent =
        "Please fix the highlighted fields above and try again.";
    }
  });
});
