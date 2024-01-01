//variables
const formulario = document.querySelector("#nueva-cita");
const inputMascota = document.querySelector("#mascota");
const inputPropietario = document.querySelector("#propietario");
const inputTelefono = document.querySelector("#telefono");
const inputFecha = document.querySelector("#fecha");
const inputHora = document.querySelector("#hora");
const inputSintomas = document.querySelector("#sintomas");

const contenido =document.querySelector("#contenido");

// classes
class Cita{
    constructor(){
        this.citas =[];
    }
    agregarCita(cita){
        this.citas =[...this.citas,cita];
        console.log(this.citas);
    }
}
class UI{
    mostrarMensaje(mensaje,error){
        const alerta =contenido.querySelector(".alert");
        if(!alerta){//evita alertas multiples
            const divMensaje = document.createElement("div");
            divMensaje.classList.add("alert","text-center","col-12","d-block");
            if(error){
                divMensaje.classList.add("alert-danger");
            }
            else{
                divMensaje.classList.add("alert-success");
            }
            divMensaje.textContent=mensaje;
            //insertar en el DOM
            contenido.insertBefore(divMensaje,document.querySelector(".agregar-cita"));

            setTimeout(()=>{
                divMensaje.remove();
            },2000);
        }

        
    }
}
//intancias de las Class
const cita =new Cita();
const ui =new UI();


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
    formulario.addEventListener("input",leerDatos);
    inputMascota.addEventListener("input",leerDatos);
    inputPropietario.addEventListener("input",leerDatos);
    inputTelefono.addEventListener("input",leerDatos);
    inputFecha.addEventListener("input",leerDatos);
    inputHora.addEventListener("input",leerDatos);
    inputSintomas.addEventListener("input",leerDatos);

    formulario.addEventListener("submit",validarDatos);
}

function leerDatos(e){
    objCita[e.target.name]=e.target.value;
}
function validarDatos(e){
    e.preventDefault();
    if(Object.values(objCita).includes("")){
        ui.mostrarMensaje("No puede haber campos vacios","error");
        return;
    }
    objCita.id =Date.now();//le agrega un id para poder eliminar o editar una cita
    cita.agregarCita({...objCita});// asi solo se pasa la ultima cita y no nos crea citas duplicadas;
    formulario.reset();

    reiniciarObjecto();//evita que el objecto siga teniendo valores
}
function reiniciarObjecto(){
    objCita.mascota="";
    objCita.propietario="";
    objCita.telefono="";
    objCita.fecha="";
    objCita.hora="";
    objCita.sintomas="";
}