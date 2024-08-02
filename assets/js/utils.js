export function nombreDelDiaSegunFecha(fecha) {
    const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const dia = new Date(fecha).getDay();
    return dias[dia];
}

export function calcularEdad(fechaNacimiento, fechaActual = new Date()) {
    const nacimiento = new Date(fechaNacimiento);

    let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
    let meses = fechaActual.getMonth() - nacimiento.getMonth();
    let dias = fechaActual.getDate() - nacimiento.getDate();

    if (dias < 0) {
        meses--;
        dias += new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
    }

    if (meses < 0) {
        edad--;
        meses += 12;
    }

    return { edad, meses, dias };
}

export function calcularMesesAbsolutos(fechaNacimiento) {
    const fechaActual = new Date();
    const nacimiento = new Date(fechaNacimiento);
    return (fechaActual.getFullYear() - nacimiento.getFullYear()) * 12 + (fechaActual.getMonth() - nacimiento.getMonth());
}

export function calcularDias(fechaNacimiento) {
    const fechaActual = new Date();
    const nacimiento = new Date(fechaNacimiento);
    return Math.floor((fechaActual - nacimiento) / (1000 * 60 * 60 * 24));
}

export function calcularDiasHastaCumple(fechaNacimiento) {
    const fechaActual = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const proximoCumple = new Date(fechaActual.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());

    if (proximoCumple < fechaActual) {
        proximoCumple.setFullYear(fechaActual.getFullYear() + 1);
    }

    const dias = Math.floor((proximoCumple - fechaActual) / (1000 * 60 * 60 * 24));
    return dias === 0 ? "¡Felicidades, está de cumpleaños!" : `Faltan ${dias} días para su próximo cumpleaños.`;
}

export function mostrarHoraActual() {
    const ahora = new Date();
    return ahora.toLocaleTimeString();
}
