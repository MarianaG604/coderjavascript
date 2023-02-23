let nombre = prompt("Ingresá tu nombre");
while (nombre == ""){
    alert("Por favor, ingresá tu nombre");
    peso = prompt("Ingresá tu nombre");
}

let peso = prompt("Ingresá tu peso");
while (isNaN(peso) == true || peso == ""){
    alert("Por favor, ingresá un valor correcto");
    peso = prompt("Ingresá tu peso");
}

let altura = prompt("Ingresá tu altura en centímetros, ejemplo: 1.70");
while (isNaN(altura) == true || altura == ""){
    alert("Por favor, ingresá un valor correcto.");
    altura = prompt("Ingresá tu altura");
}

let imc = peso / (altura*altura);
let conversion = imc.toFixed(2)
alert("Tu IMC es de " + conversion);

function calculoImc (){
if (imc <=18.5){
    return;
}
 else if (imc > 18.5 && imc < 24.9) {
    alert(nombre + " estás dentro de los valores normales");
    return;
}
else if (imc >25 && imc < 29.9 ) { 
    alert(nombre + " estás en el rango de sobrepeso");
    return;
}
else if(imc >30 && imc < 34.9){
    alert(nombre + " estás en el rango de obesidad");
    return;
}
else if (imc > 35) {
    alert(nombre + " estás en el rango de obesidad mórbida");
    return;
}
else {
    alert(nombre + ", ingresaste datos inválidos, no podemos calcular tu IMC");
}
}

calculoImc();

