//Inicializo variables
let nombre;
let peso; 
let altura;
let fecha = new Date();
let fechaFormateada = fecha.toLocaleDateString();
guardadoDatos = [];

//Función que calcula IMC y peso
function datosPeso (){
  //Le pido nombre, peso, altura y fecha
  nombre = prompt("Ingresá tu nombre");
  while (nombre == "") {
    alert("Por favor, ingresá tu nombre");
    nombre = prompt("Ingresá tu nombre");
  }

   peso = prompt("Ingresá tu peso");
  while (isNaN(peso) == true || peso == "") {
    alert("Por favor, ingresá un valor correcto");
    peso = prompt("Ingresá tu peso");
  }

   altura = prompt("Ingresá tu altura en centímetros, ejemplo: 1.70");
  while (isNaN(altura) == true || altura == "") {
    alert("Por favor, ingresá un valor correcto.");
    altura = prompt("Ingresá tu altura");
  }

  fechaFormateada = prompt("Ingresá la fecha de tu peso, en el formato día/mes/año");
  while (fechaFormateada == "") {
    alert("Por favor, ingresá un valor correcto.");
    fechaFormateada = prompt("Ingresá la fecha de tu peso, en el formato día/mes/año");
  }

   //Acá hago el cálculo del IMC, que es altura * altura y lo convierto a dos números después de la coma y lo muestro en un alert.
  let imc = peso / (altura * altura);
  let conversion = imc.toFixed(2);
  alert("Tu IMC es de " + conversion);

  //Acá calculo en que rango está dependiendo el IMC obtenido del cálculo anterior, y devuelvo la información.
  if (imc <= 18.5)  {
    alert(nombre + " estás en bajo peso")
    } else if (imc > 18.5 && imc < 24.9) {
    alert(nombre + " estás dentro de los valores normales");
    } else if (imc > 25 && imc < 29.9) {
    alert(nombre + " estás en el rango de sobrepeso");
    } else if (imc > 30 && imc < 34.9) {
    alert(nombre + " estás en el rango de obesidad");
    } else if (imc > 35) {
    alert(nombre + " estás en el rango de obesidad mórbida");
    } else {
    alert(nombre + ", ingresaste datos inválidos, no podemos calcular tu IMC");
  }

 //Acá voy a guardar los datos que ingresa el usuario: nombre, peso y altura y los guardo en un array.
  
 let persona = {nombre: nombre, peso: peso, altura: altura, fechaFormateada: fechaFormateada};
 guardadoDatos.push(persona);
  console.log(guardadoDatos);
}

//Creo una función para luego poder mostrarlo en un alert dentro de un switch.
function crearString(array){
    let data ="";
    array.forEach(dato => {
        data+="Nombre: " +dato.nombre + "\nPeso: " + dato.peso + "\nAltura: " + dato.altura + "\nFecha: " + dato.fechaFormateada + "\n \n";
    });
    return data;
}

//Acá empieza la funcion para ordenar los datos
function ordenarDatos() {
    let criterio =  prompt("Elegí el criterio a ordenar: \na - Nombre (A a la Z) \nb - Nombre (Z a la A) \nc - Por fecha más próxima a más antigua \nd - Por fecha más antigua a más próxima");
    let ordeno = guardadoDatos.slice(0);
    
//En el primer caso, ordeno de la A a la Z. En el segundo, de la Z a la A. En el tercero, por fecha ascendente. En el cuarto, por fecha descendente. Y el último es opción inválida.    
switch(criterio) {
    case "a":
      let nombreAZ = ordeno.sort((a, b) => a.nombre.localeCompare(b.nombre));       
      alert("Orden Alfabetico ascendente\n"+crearString(nombreAZ));
      ordeno.push("Orden Alfabetico ascendente "+criterio)
      return nombreAZ; 
      case "b":
    let nombreZA = ordeno.sort((a, b) => b.nombre.localeCompare(a.nombre));
    alert(crearString(nombreZA));
    ordeno.push("Orden Alfabetico descendente "+criterio)
      return nombreZA; 
      case "c":
    let fechaNueva = ordeno.sort((a, b) => new Date(a.fechaFormateada) - new Date(b.fechaFormateada));
    alert(crearString(fechaNueva));
    ordeno.push("Orden Fecha ascendente "+criterio)
     return fechaNueva;
      case "d":
    let fechaAntigua = ordeno.sort((a, b) => new Date(b.fechaFormateada) - new Date(a.fechaFormateada));
    alert(crearString(fechaAntigua));
    ordeno.push("Orden Fecha descendente "+criterio)
     return fechaAntigua;  
  default:
    alert("Opción inválida");
  }
}

//Empiezo preguntando al usuario que quiere hacer.
let opcion = prompt ("Opción 1 \n--Ingresar datos-- \nOpción 2 \n--Consultar datos-- \n\nEnter para salir");

//Menú con sus respectivas opciones: 1, trae la data de IMC y el peso. 2, trae los datos ordenados según el criterio. 3, opción inválida.
while (opcion != ""){
    switch (opcion){
    case '1':
    datosPeso(); 
    break;
    case '2': 
    let dataOrdenada = ordenarDatos();
    console.log(dataOrdenada);
    break;
    default:
    alert ("Opción inválida");
    break;
    }
opcion = prompt ("Opción 1 \n--Ingresar más datos-- \nOpción 2 \n--Consultar datos-- \n\nEnter para salir");
}

