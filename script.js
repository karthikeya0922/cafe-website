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

    // JavaScript takes over from the browser's built-in HTML5 validation
    form.noValidate = true;

    const field = id => document.getElementById(id);

    // Each rule returns an error message, or "" when the value is valid
    const rules = {
        fullname: () => {
            const val = field("fullname").value.trim();
            if (val === "") return "Full name is required.";
            if (val.length < 3) return "Full name must be at least 3 characters long.";
            if (!/^[A-Za-z ]+$/.test(val)) return "Full name can only contain letters and spaces.";
            return "";
        },
        username: () => {
            const val = field("username").value.trim();
            if (val === "") return "Username is required.";
            if (val.length < 3 || val.length > 20) return "Username must be 3 to 20 characters long.";
            if (!/^[A-Za-z0-9_]+$/.test(val)) return "Username can only contain letters, numbers, and underscores.";
            return "";
        },
        email: () => {
            const val = field("email").value.trim();
            if (val === "") return "Email is required.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email address (e.g., user@example.com).";
            return "";
        },
        phone: () => {
            const val = field("phone").value.trim();
            if (val === "") return "Mobile number is required.";
            if (!/^[6-9][0-9]{9}$/.test(val)) return "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
            return "";
        },
        dob: () => {
            const val = field("dob").value;
            if (val === "") return "Date of birth is required.";
            const dob = new Date(val);
            const today = new Date();
            if (dob > today) return "Date of birth cannot be in the future.";
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
            if (age < 13) return "You must be at least 13 years old to register.";
            return "";
        },
        gender: () => {
            return form.querySelector('input[name="gender"]:checked') ? "" : "Please select your gender.";
        },
        favourite: () => {
            return field("favourite").value === "" ? "Please choose your favourite drink." : "";
        },
        pwd: () => {
            const val = field("pwd").value;
            if (val === "") return "Password is required.";
            if (val.length < 6) return "Password must be at least 6 characters long.";
            if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(val)) return "Password must contain both letters and numbers.";
            return "";
        },
        confirmPwd: () => {
            const val = field("confirmPwd").value;
            if (val === "") return "Please confirm your password.";
            if (val !== field("pwd").value) return "Passwords do not match.";
            return "";
        },
        terms: () => {
            return field("terms").checked ? "" : "You must accept the terms and conditions.";
        }
    };

    function showResult(name, message) {
        const errorElement = field(name + "Error");
        const input = field(name);
        if (errorElement) errorElement.textContent = message;
        // Radio groups and checkboxes have no border to highlight
        if (input && input.type !== "checkbox") {
            input.style.border = message ? "2px solid #ff6b6b" : "1px solid #ccc";
        }
    }

    function validateField(name) {
        const message = rules[name]();
        showResult(name, message);
        return message === "";
    }

    // Re-check a field as the user types or changes it
    Object.keys(rules).forEach(name => {
        const targets = name === "gender"
            ? form.querySelectorAll('input[name="gender"]')
            : [field(name)];
        targets.forEach(el => {
            if (!el) return;
            el.addEventListener("input", () => validateField(name));
            el.addEventListener("change", () => validateField(name));
        });
    });

    // Changing the password should re-check the confirmation too
    field("pwd").addEventListener("input", () => {
        if (field("confirmPwd").value !== "") validateField("confirmPwd");
    });

    form.addEventListener("submit", (e) => {
        // Validate every field (no short-circuit) so all errors show at once
        const results = Object.keys(rules).map(validateField);
        if (results.includes(false)) {
            e.preventDefault();
            const firstError = Object.keys(rules).find((name, i) => !results[i]);
            const firstInput = field(firstError) || form.querySelector(`[name="${firstError}"]`);
            if (firstInput) firstInput.focus();
        } else {
            alert("Registration successful! Welcome to Fire Pot, " + field("fullname").value.trim() + ".");
        }
    });

    form.addEventListener("reset", () => {
        Object.keys(rules).forEach(name => showResult(name, ""));
    });
}
