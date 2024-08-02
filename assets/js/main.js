// main.js
import { calcularEdad, calcularDiasHastaCumple } from './utils.js'; 
import { calcularPermanencia } from './permanencia.js';
import { formatearDinero } from './formateo.js';
import { validarNumero, validarNombre, validarApellidos } from './validacion.js';

// Función para calcular el monto total de asignación familiar
function calcularMontoTotalAsignacion(valorFamiliar, cantidadBeneficiarios) {
    return valorFamiliar * cantidadBeneficiarios;
}

export function mostrarDatos() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const fechaIngreso = document.getElementById('fecha-ingreso').value;

    // Asegúrate de que el valor capturado sea el correcto
    const sueldoBaseActual = document.getElementById('sueldoBaseActual').value.replace(/[^0-9.-]+/g, "");
    const sueldoSemestreAnterior = document.getElementById('sueldoSemestreAnterior').value.replace(/[^0-9.-]+/g, "");

    const tieneCargas = document.getElementById('tieneCargas').checked;
    const cantidadCargas = parseInt(document.getElementById('cantidadCargas').value);

    // Validar los nombres y apellidos
    if (!validarNombre(nombre) || !validarApellidos(apellidos)) {
        document.getElementById('resultado').innerHTML = `<p class="error">El nombre y los apellidos solo pueden contener letras y espacios.</p>`;
        return;
    }

    // Validar que los sueldos sean números válidos
    if (!validarNumero(sueldoBaseActual) || !validarNumero(sueldoSemestreAnterior)) {
        document.getElementById('resultado').innerHTML = `<p class="error">Los sueldos deben ser números válidos.</p>`;
        return;
    }

    const sueldoBaseActualNum = parseFloat(sueldoBaseActual);
    const sueldoSemestreAnteriorNum = parseFloat(sueldoSemestreAnterior);

    const { edad, meses, dias } = calcularEdad(fechaNacimiento);
    const diasHastaCumple = calcularDiasHastaCumple(fechaNacimiento);
    const permanencia = calcularPermanencia(fechaIngreso);

    let valorFamiliar = 0;
    if (tieneCargas) {
        if (sueldoSemestreAnteriorNum <= 429899) {
            valorFamiliar = 16828;
        } else if (sueldoSemestreAnteriorNum <= 627913) {
            valorFamiliar = 10327;
        } else if (sueldoSemestreAnteriorNum <= 979330) {
            valorFamiliar = 3264;
        } else {
            valorFamiliar = 0;
        }
    }

    const montoTotalAsignacion = calcularMontoTotalAsignacion(valorFamiliar, cantidadCargas);
    const sueldoConAsignacion = sueldoBaseActualNum + montoTotalAsignacion;

    document.getElementById('resultado').innerHTML = `
        <p>La persona de:</p>
        <p>Nombre: ${convertirMayusculas(nombre, apellidos).split(' ')[0]}</p>
        <p>Apellidos: ${convertirMayusculas(nombre, apellidos).split(' ').slice(1).join(' ')}</p>
        <p>Edad: ${edad} años, ${meses} meses, ${dias} días</p>
        <p>${diasHastaCumple}</p>
        <p>Tiempo en la organización: ${permanencia.anios} años, ${permanencia.meses} meses, ${permanencia.dias} días</p>
        <p>Cargas: ${tieneCargas ? 'Sí' : 'No'}</p>
        <p>Cantidad de Cargas familiares: ${cantidadCargas}</p>
        <p>Está en el tramo que corresponde al ingreso del semestre anterior: ${formatearDinero(sueldoSemestreAnteriorNum)}</p>
        <p>Le corresponde por carga familiar el monto: ${formatearDinero(valorFamiliar)}</p>
        <p>Le corresponde el monto total de carga familiar de: ${formatearDinero(montoTotalAsignacion)}</p>
        <p>Su sueldo del mes más las cargas familiares es de: ${formatearDinero(sueldoConAsignacion)}</p>
    `;
}

// Inicializar eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Añadir evento al checkbox
    const tieneCargasCheckbox = document.getElementById('tieneCargas');
    tieneCargasCheckbox.addEventListener('change', toggleCantidadCargas);

    // Añadir eventos de entrada para formatear los sueldos
    const sueldoBaseActualInput = document.getElementById('sueldoBaseActual');
    const sueldoSemestreAnteriorInput = document.getElementById('sueldoSemestreAnterior');
    
    sueldoBaseActualInput.addEventListener('input', (event) => manejarEntradaDeDinero(event, formatearDinero));
    sueldoSemestreAnteriorInput.addEventListener('input', (event) => manejarEntradaDeDinero(event, formatearDinero));

    // Configuración inicial
    toggleCantidadCargas();
});
// Función para manejar la entrada y formatear el valor
export function manejarEntradaDeDinero(event, formatearDinero) {
    const input = event.target;

    // Guardar el valor actual sin el formateo para que el usuario pueda seguir escribiendo
    let valorSinFormato = input.value.replace(/[^0-9]/g, '');

    // Formatear el valor sin cambiar la entrada del usuario
    input.value = formatearDinero(valorSinFormato);

    // Ajustar la posición del cursor
    input.setSelectionRange(input.value.length, input.value.length);
}

// Función para mostrar u ocultar el campo de cantidad de cargas
export function toggleCantidadCargas() {
    const tieneCargas = document.getElementById('tieneCargas').checked;
    const ocultar = document.getElementById('ocultar');
    ocultar.style.display = tieneCargas ? 'block' : 'none';
}

// Función para convertir nombres y apellidos a mayúsculas
export function convertirMayusculas(nombre, apellidos) {
    return `${nombre.toUpperCase()} ${apellidos.toUpperCase()}`;
}

// Hacer que mostrarDatos sea accesible globalmente
window.mostrarDatos = mostrarDatos;
