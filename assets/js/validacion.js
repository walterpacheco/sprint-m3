// validacion.js

// Función para validar números
export function validarNumero(numero) {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(numero);
}

// Función para validar nombre
export function validarNombre(nombre) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
}

// Función para validar apellidos
export function validarApellidos(apellidos) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(apellidos);
}
