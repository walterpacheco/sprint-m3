import { calcularEdad } from './utils.js';

export function calcularPermanencia(fechaIngreso) {
    const ingreso = new Date(fechaIngreso);
    const actual = new Date();

    const totalDias = Math.floor((actual - ingreso) / (1000 * 60 * 60 * 24));
    const totalMeses = (actual.getFullYear() - ingreso.getFullYear()) * 12 + (actual.getMonth() - ingreso.getMonth());
    const { edad: anios, meses, dias } = calcularEdad(fechaIngreso, actual);

    return { totalDias, totalMeses, anios, meses, dias };
}