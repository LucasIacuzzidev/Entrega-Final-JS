// Objeto Deudor // 
function Deudor(nombre, apellido, totalAdeudado) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.totalAdeudado = totalAdeudado;
  }
  
  // Array de deudores // 
  const deudores = [];
  
  // Función para solicitar los datos del préstamo // 
  function datosPrestamo() {
    const sueldoMinimo = 100000;
    const nombres = prompt("Ingresa tu nombre").toUpperCase();
    const apellido = prompt("Ingresa tu apellido").toUpperCase();
    const sueldo = parseFloat(prompt("Ingresa tu ingreso mensual"));
  
    if (sueldo < sueldoMinimo) {
      alert(
        `Lo sentimos ${nombres} ${apellido}, tu ingreso mensual es insuficiente para acceder al préstamo`
      );
      return;
    }
  
    let calcularOtroPrestamo = true;
    while (calcularOtroPrestamo) {
      const montoPrestamo = parseFloat(prompt("Ingresa el monto del préstamo"));
      const cantidadMeses = parseInt(prompt("Ingresa el número de meses de retraso (3-6-9-12)"));
      const montoTotal = simuladorDeIntereses(montoPrestamo, cantidadMeses);
      const deudor = new Deudor(nombres, apellido, montoTotal);
      deudores.push(deudor);
  
      alert(
        `Hola ${nombres} ${apellido}, el monto total a pagar por el préstamo es de $${montoTotal}`
      );
  
      calcularOtroPrestamo = confirm("Desea realizar otra simulacion?");
    }
    const montosAdeudados = deudores.map((deudor) => deudor.totalAdeudado);
    const montosDeudasGrandes = deudores.filter((deudor) => deudor.totalAdeudado > 50000)
    console.log("Montos adeudados:", montosAdeudados);
    console.log("Montos de deudas mayores a 50000:", montosDeudasGrandes);
    const ultimoDeudor = deudores[deudores.length - 1];
    console.log(`El último deudor agregado es: ${ultimoDeudor.nombre} ${ultimoDeudor.apellido} con un total adeudado de $${ultimoDeudor.totalAdeudado}`); // Solo el ultimo deudor 
    console.log(deudores); // Array de deudores (almacena cada simulacion de prestamo.)
  }
  
  // Función para simular los intereses del préstamo // 
  function simuladorDeIntereses(montoPrestamo, cantidadMeses) {
    const tasaInteres = 0.08;
    let montoTotal = montoPrestamo;
  
    for (let i = 0; i < cantidadMeses; i++) {
      montoTotal += montoTotal * tasaInteres;
    }
  
    return Math.ceil(montoTotal);
  }
  
  // Modo Dark-Light 
  const botonFondo = document.getElementById("botonFondo");

botonFondo.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("modo", "dark")
    }else {
        localStorage.setItem("modo", "light");
    }
})

// recuperamos el modo del localStorage 

const modo = localStorage.getItem("modo");
if (modo === "dark"){
    document.body.classList.add("dark");
}else{
    document.body.classList.remove("dark");
};


  datosPrestamo();