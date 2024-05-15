const nameUserInput = document.getElementById("nameUser");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordConfirmationInput = document.getElementById("passwordConfirmation");

    const nameUserError = document.getElementById("nameUserError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const passwordConfirmationError = document.getElementById("passwordConfirmationError");

    const validarNombre = () => {
        const name = nameUserInput.value;
        if (!name.trim()) {
            nameUserError.textContent = "Por favor ingresa tu nombre";
            return false;
        } else {
            nameUserError.textContent = "";
        }
    }

    const validarEmail = () => {
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Por favor ingresa un correo electrónico válido";
            return false;
        } else {
            emailError.textContent = "";
        }
    }

    const validarPass = () => {
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordError.textContent = "La contraseña debe tener al menos 8 caracteres";
            return false;
        } else {
            passwordError.textContent = "";
        }
    }

    const validarConfirmarPass = () => {
        const password = passwordInput.value;
        const passwordConfirmation = passwordConfirmationInput.value;
        if (password !== passwordConfirmation) {
            passwordConfirmationError.textContent = "Las contraseñas no coinciden";
            return false;
        } else {
            passwordConfirmationError.textContent = "";
        }
    }

    nameUserInput.addEventListener('input', validarNombre);
    emailInput.addEventListener('input', validarEmail);
    passwordInput.addEventListener('input', validarPass);
    passwordConfirmationInput.addEventListener('input', validarConfirmarPass);

    document.getElementById("miRegistro").addEventListener('submit', (e) => {
        e.preventDefault();
        if (validarNombre() !== false && validarEmail() !== false && validarPass() !== false && validarConfirmarPass() !== false) {
            alert("¡Formulario válido! Enviando...");
            document.getElementById("miRegistro").submit();
        }
    });