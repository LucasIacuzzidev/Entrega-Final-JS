function simuladorDeIntereses(montoPrestamo, cantidadMeses) {
    const tasaInteres = 0.08;
    let montoTotal = montoPrestamo;
    for (let i = 0; i < cantidadMeses; i++) {
    montoTotal += montoTotal * tasaInteres;
    }
    return Math.ceil(montoTotal);
}

alert ("Simulador de prestamo JS")

const nombres = [];
let nombreIngresado = prompt("ingrese su nombre");
nombres.push(nombreIngresado.toUpperCase());
console.log(nombres);
console.log(nombres.length);
const apellido = prompt("Ingresa tu apellido:");

function datosPrestamos() {
    const sueldoMinimo = 100000;
    const sueldo = parseFloat(prompt("Ingresa tu ingreso mensual:"));
    if (sueldo >= sueldoMinimo) {
    let calcularOtroPrestamo = true;
    while (calcularOtroPrestamo) {
        const montoPrestamo = parseFloat(
        prompt("Ingresa el monto del préstamo:")
        );
        const cantidadMeses = parseInt(
        prompt("Ingresa el número de meses de retraso(3-6-9-12):")
        );
        const montoTotal = simuladorDeIntereses(montoPrestamo, cantidadMeses);
        alert(
        `Hola ${nombres} ${apellido.toUpperCase()}, el monto total a pagar por el préstamo es de $ ${montoTotal}`
        );
        calcularOtroPrestamo = confirm("Desea realizar otra simulacion?");
    }
    } else {
    alert(
        `Lo sentimos ${nombres} ${apellido.toUpperCase()}, tu ingreso mensual es insuficiente para acceder al préstamo`
    );
    }
}

datosPrestamos();

function Deudores (nombre,apellido,totalAdeudado){
    this.nombre = nombre;
    this.apellido = apellido;
    this.totalAdeudado = totalAdeudado;
};

const deudor1 = new Deudores (`${nombres}`,`${apellido}`, 123123);
console.log(deudor1);