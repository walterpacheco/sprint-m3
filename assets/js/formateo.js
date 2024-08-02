// formateo.js

// Función para formatear un número como dinero
export function formatearDinero(valor) {
    // Asegurarse de que el valor sea una cadena o número
    if (typeof valor !== 'string' && typeof valor !== 'number') {
        return '';
    }
    
    const valorCadena = valor.toString();
    
    // Eliminar cualquier carácter no numérico, excepto el punto decimal
    const numero = parseFloat(valorCadena.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numero)) return '';

    // Formatear con el separador de miles y el símbolo de moneda
    return `$${numero.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`;
}
