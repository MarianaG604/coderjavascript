let calculos = [];

//Elementos del DOM que se usan
const nombreUsuario = document.getElementById('nombre'),
      pesoUsuario = document.getElementById('peso'),
      alturaUsuario = document.getElementById('altura'),
      fechaUsuario = document.getElementById('fecha'),
      resultadoUsuario = document.getElementById('resultado'),
      btnCalcular = document.getElementById('calcular'),
      imcShow = document.getElementById('imc-calc'),
      btnLimpiar = document.getElementById('borrar'),
      btnAlimento = document.getElementById('calcularalimento'),
      alimento = document.getElementById('alimentos'),
      resultadoalimento = document.getElementById('resultadoalimento');

//Lo uso para tomar datos del usuario
class Usuario {
  constructor(nombre, peso, altura, fecha, imc) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.fecha = fecha;
    this.imc = imc;
  }
}

//Tomo los datos del usuario
function agregarUsuario (listado){
  const usuarios = new Usuario (nombreUsuario.value, pesoUsuario.value, alturaUsuario.value, fechaUsuario.value, resultadoUsuario.value);
  listado.push(usuarios)
}

//Guardo los datos en LocalStorage
function guardarUsuarios(listado){
  localStorage.setItem('usuariosGuardados', JSON.stringify(listado));
}

//Hago el cálculo del IMC
function calcularIMC (){
  let peso = pesoUsuario.value;
  let altura = alturaUsuario.value;
  let calculo = peso / (altura * altura);
  let convert = calculo.toFixed(1);
  resultadoUsuario.value = `${convert}`;

  if (calculo <= 18.5){
  imcShow.innerHTML = nombreUsuario.value + ", estás en bajo peso, tu IMC es de <br> " + convert; 
  } else if (calculo > 18.5 && calculo < 24.9) {
  imcShow.innerHTML = nombreUsuario.value + ", estás dentro de los valores normales, tu IMC es de <br> " + convert;
  } else if (calculo > 25 && calculo < 29.9) {
  imcShow.innerHTML = nombreUsuario.value + ", estás en el rango de sobrepeso, tu IMC es de <br> " + convert;
  } else if (calculo > 30 && calculo < 34.9) {
  imcShow.innerHTML = nombreUsuario.value + ", estás en el rango de obesidad, tu IMC es de <br> " + convert;
  } else if (calculo > 35) {
  imcShow.innerHTML = nombreUsuario.value + ", estás en el rango de obesidad mórbida, tu IMC es de <br> " + convert;
  } else {
    nombreUsuario.value + ", ingresaste datos inválidos, no podemos calcular tu IMC";
    return null;
}

let imagenResultado = document.getElementById('imagen');
if (imagenResultado) {
  switch (true) {
    case (calculo <= 18.5):
      imagenResultado.src = "./img/warning.png";
      break;
    case (calculo > 18.5 && calculo < 24.9):
      imagenResultado.src = "./img/checked.png";
      break;
    case (calculo > 25 && calculo < 29.9):
      imagenResultado.src = "./img/warning1.png";
      break;
    case (calculo > 30 && calculo < 34.9):
      imagenResultado.src = "./img/warning.png";
      break;
    case (calculo > 35):
      imagenResultado.src = "./img/critical.png";
      break;
    default:
      imagenResultado.src = "./img/nodata.png";
      break;
  }
}
agregarUsuario (calculos);
guardarUsuarios (calculos);
}

//Botón que dispara el cálculo
btnCalcular.onclick = (e) => {
  e.preventDefault();
  if (!nombreUsuario.value || !pesoUsuario.value || !alturaUsuario.value){
    Swal.fire(
      {title: 'Atención',
      text:'Por favor, completá todos los datos requeridos',
      icon:'warning',
      confirmButtonText: 'Entendido'
    }   
      )
  } else{
    calcularIMC();
  }
}

//Función para limpiar datos en LocalStorage
function limpioDatos() {
  localStorage.clear();
  sessionStorage.clear();
}

//Botón para limpiar datos en LocalStorage
btnLimpiar.onclick = (e) => {
  e.preventDefault();
  limpioDatos();
  Swal.fire('Datos borrados')
}

btnAlimento.onclick = (e) => {
e.preventDefault();
const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=29f0593a&app_key=bd52d272ea01ecb5698c890dd8ad6630&ingr=${alimento.value}&nutrition-type=cooking`
fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.hints && data.hints.length > 0) {
        const item = data.hints[0].food;
        const name = item.label;
        const calorias = item.nutrients.ENERC_KCAL.toFixed(1);
        resultadoalimento.innerHTML = name + "<br>" + calorias + " calorías";
      } else {
        resultadoalimento.innerHTML = "Sin resultados encontrados";
      }
      console.log(data);
    })
    .catch(error => {
      console.error("No se pudo obtener la información", error);
    });
}