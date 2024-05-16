const validarEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return false;
    }
    return true; 
}

const validarPass = (pass) => {
    console.log(pass.length);
    if (pass.length < 8) {
        return false;
    }
    return true; 
}
$(document).ready(()=> {
    $('#miRegistro').submit((event)=> {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Obtener campos
        let username = $('#nameUser').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirmPassword = $('#passwordConfirmation').val();

        // Verificar si los campos están vacíos
        if (!username||!email || !password || !confirmPassword) {
            $('#error-message').text('Por favor, complete todos los campos.').addClass('alert alert-danger').show();
            return;
        }else{
            $('#error-message').removeClass('alert alert-danger').hide();
        }
        if(validarEmail(email)!== true){
            $('#error-message-email').text('Por favor ingresa un correo electrónico válido').addClass('alert alert-danger').show()
            return;
            
        }else{
            $('#error-message-email').removeClass('alert alert-danger').hide()   
        }
        if(validarPass(password)!== true){
            $('#error-message-pass').text('La contraseña debe tener al menos 8 caracteres').addClass('alert alert-danger').show()
            return;
        }else{
            $('#error-message-pass').removeClass('alert alert-danger').hide()
        }

        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            $('#error-message-pass-c').text('Las contraseñas no coinciden.').addClass('alert alert-danger').show();
            return;
        }else{
            $('#error-message-pass-c').removeClass('alert alert-danger').hide();
        }

       
        $('#error-message').text('Registro exitoso.').removeClass('alert alert-danger').addClass('alert alert-success').show();

    });
});
