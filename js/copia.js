//variables
const formulario = document.querySelector("#nueva-cita");
const inputMascota = document.querySelector("#mascota");
const inputPropietario = document.querySelector("#propietario");
const inputTelefono = document.querySelector("#telefono");
const inputFecha = document.querySelector("#fecha");
const inputHora = document.querySelector("#hora");
const inputSintomas = document.querySelector("#sintomas");
//objecto Principal almacena la informacion de la cita en el objecto
const objCita={
    mascota:"",
    propietario:"",
    telefono:"",
    fecha:"",
    hora:"",
    sintomas:"",
}
// eventos
listaEventos();
function listaEventos(){
    formulario.addEventListener("input",leerDatos)
    inputMascota.addEventListener("input",leerDatos)
    inputPropietario.addEventListener("input",leerDatos)
    inputTelefono.addEventListener("input",leerDatos)
    inputFecha.addEventListener("input",leerDatos)
    inputHora.addEventListener("input",leerDatos)
    inputSintomas.addEventListener("input",leerDatos)
}
// classes
class Cita{

}
class UI{

}
function leerDatos(e){
    objCita[e.target.name]=e.target.value;
}