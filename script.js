// ============================================
// 1. Dynamic Navbar Loader
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
        fetch("navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarElement.innerHTML = data;
            })
            .catch(error => {
                console.error("Error loading navbar:", error);
            });
    }

    // Initialize registration form validation if present
    initRegistrationValidation();
});

// ============================================
// 2. Registration Page Validation
// ============================================
function initRegistrationValidation() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const pwdInput = document.getElementById("pwd");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const pwdError = document.getElementById("pwdError");

    // Real-time validation listeners to clear errors on typing
    if (usernameInput) {
        usernameInput.addEventListener("input", () => validateUsername(false));
    }
    if (emailInput) {
        emailInput.addEventListener("input", () => validateEmail(false));
    }
    if (pwdInput) {
        pwdInput.addEventListener("input", () => validatePassword(false));
    }

    // Submit handler
    form.addEventListener("submit", (e) => {
        const isUsernameValid = validateUsername(true);
        const isEmailValid = validateEmail(true);
        const isPasswordValid = validatePassword(true);

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
            e.preventDefault(); // Stop form submission if any field fails
        } else {
            // Optional: alert or let it submit to index.html
            alert("Registration successful! Redirecting to Home...");
        }
    });

    // --- Validation Helper Functions ---

    function setError(input, errorElement, message) {
        if (errorElement) errorElement.textContent = message;
        if (input) input.style.border = "2px solid #ff6b6b";
    }

    function clearError(input, errorElement) {
        if (errorElement) errorElement.textContent = "";
        if (input) input.style.border = "1px solid #ccc";
    }

    function validateUsername(isSubmitting) {
        if (!usernameInput) return true;
        const val = usernameInput.value.trim();

        if (val === "") {
            if (isSubmitting) setError(usernameInput, usernameError, "Username is required.");
            return false;
        }
        if (val.length < 3) {
            setError(usernameInput, usernameError, "Username must be at least 3 characters long.");
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(val)) {
            setError(usernameInput, usernameError, "Username can only contain letters, numbers, and underscores.");
            return false;
        }

        clearError(usernameInput, usernameError);
        return true;
    }

    function validateEmail(isSubmitting) {
        if (!emailInput) return true;
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (val === "") {
            if (isSubmitting) setError(emailInput, emailError, "Email is required.");
            return false;
        }
        if (!emailRegex.test(val)) {
            setError(emailInput, emailError, "Please enter a valid email address (e.g., user@example.com).");
            return false;
        }

        clearError(emailInput, emailError);
        return true;
    }

    function validatePassword(isSubmitting) {
        if (!pwdInput) return true;
        const val = pwdInput.value;

        if (val === "") {
            if (isSubmitting) setError(pwdInput, pwdError, "Password is required.");
            return false;
        }
        if (val.length < 6) {
            setError(pwdInput, pwdError, "Password must be at least 6 characters long.");
            return false;
        }
        if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(val)) {
            setError(pwdInput, pwdError, "Password must contain both letters and numbers.");
            return false;
        }

        clearError(pwdInput, pwdError);
        return true;
    }
}
