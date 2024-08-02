import { calcularEdad, calcularDiasHastaCumple } from './utils.js'; // Importa solo lo necesario
import { calcularPermanencia } from './permanencia.js';

// Función 1: Recibe nombre y apellidos y devuelve en mayúsculas
function convertirMayusculas(nombre, apellidos) {
    return `${nombre.toUpperCase()} ${apellidos.toUpperCase()}`;
}

// Función para validar nombre
function validarNombre(nombre) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nombre);
}

// Función para validar apellidos
function validarApellidos(apellidos) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(apellidos);
}

// Función 2: Muestra datos y calcula valor de familiar
function calcularAsignacionFamiliar(nombre, apellidos, sueldoBaseActual, sueldoSemestreAnterior, tieneCargas) {
    const nombreCompleto = convertirMayusculas(nombre, apellidos);
    let valorFamiliar = 0;

    if (tieneCargas) {
        if (sueldoSemestreAnterior <= 429899) {
            valorFamiliar = 16828;
        } else if (sueldoSemestreAnterior <= 627913) {
            valorFamiliar = 10327;
        } else if (sueldoSemestreAnterior <= 979330) {
            valorFamiliar = 3264;
        } else {
            valorFamiliar = 0;
        }
    }

    return `Al Trabajador ${nombreCompleto} le corresponde valor de familiar ${valorFamiliar} por su renta del semestre anterior que es: ${sueldoSemestreAnterior}`;
}

// Función 3: Calcula monto total de asignación familiar
function calcularMontoTotalAsignacion(valorFamiliar, cantidadBeneficiarios) {
    return valorFamiliar * cantidadBeneficiarios;
}

// Exporta la función para que pueda ser utilizada en otros módulos
export function mostrarDatos() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const fechaIngreso = document.getElementById('fecha-ingreso').value;
    const sueldoBaseActual = parseInt(document.getElementById('sueldoBaseActual').value);
    const sueldoSemestreAnterior = parseInt(document.getElementById('sueldoSemestreAnterior').value);
    const tieneCargas = document.getElementById('tieneCargas').checked;
    const cantidadCargas = parseInt(document.getElementById('cantidadCargas').value);

    // Validar los nombres y apellidos
    if (!validarNombre(nombre) || !validarApellidos(apellidos)) {
        document.getElementById('resultado').innerHTML = `<p class="error">El nombre y los apellidos solo pueden contener letras y espacios.</p>`;
        return;
    }

    const { edad, meses, dias } = calcularEdad(fechaNacimiento);
    const diasHastaCumple = calcularDiasHastaCumple(fechaNacimiento);
    const permanencia = calcularPermanencia(fechaIngreso);

    let valorFamiliar = 0;
    if (tieneCargas) {
        if (sueldoSemestreAnterior <= 429899) {
            valorFamiliar = 16828;
        } else if (sueldoSemestreAnterior <= 627913) {
            valorFamiliar = 10327;
        } else if (sueldoSemestreAnterior <= 979330) {
            valorFamiliar = 3264;
        } else {
            valorFamiliar = 0;
        }
    }

    const montoTotalAsignacion = calcularMontoTotalAsignacion(valorFamiliar, cantidadCargas);
    const sueldoConAsignacion = sueldoBaseActual + montoTotalAsignacion;

    document.getElementById('resultado').innerHTML = `
        <p>La persona de:</p>
        <p>Nombre: ${convertirMayusculas(nombre, apellidos).split(' ')[0]}</p>
        <p>Apellidos: ${convertirMayusculas(nombre, apellidos).split(' ').slice(1).join(' ')}</p>
        <p>Edad: ${edad} años, ${meses} meses, ${dias} días</p>
        <p>${diasHastaCumple}</p>
        <p>Tiempo en la organización: ${permanencia.anios} años, ${permanencia.meses} meses, ${permanencia.dias} días</p>
        <p>Cargas: ${tieneCargas ? 'Sí' : 'No'}</p>
        <p>Cantidad de Cargas familiares: ${cantidadCargas}</p>
        <p>Está en el tramo que corresponde al ingreso del semestre anterior: ${sueldoSemestreAnterior}</p>
        <p>Le corresponde por carga familiar el monto: ${valorFamiliar}</p>
        <p>Le corresponde el monto total de carga familiar de: ${montoTotalAsignacion}</p>
        <p>Su sueldo del mes más las cargas familiares es de: ${sueldoConAsignacion}</p>
    `;
}
