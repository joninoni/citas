//variables
const formulario = document.querySelector("#nueva-cita");
const inputMascota = document.querySelector("#mascota");
const inputPropietario = document.querySelector("#propietario");
const inputTelefono = document.querySelector("#telefono");
const inputFecha = document.querySelector("#fecha");
const inputHora = document.querySelector("#hora");
const inputSintomas = document.querySelector("#sintomas");
const contenedorCitas = document.querySelector("#citas");//donde se van a mostrar las citas
const contenido = document.querySelector("#contenido");
let ediccion;
// classes
class Cita{
    constructor(){
        this.citas =[];
    }
    agregarCita(cita){
        this.citas =[...this.citas,cita];
    }
    eliminarCita(id){
        this.citas=this.citas.filter( cita => cita.id !==id);        
    }
    editarCita(citaActualizada){
        this.citas=this.citas.map( cita => cita.id ===citaActualizada.id ?citaActualizada:cita);
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
    mostrarCitas({citas}){

        this.limpiarHtml();

        citas.forEach(cita => {
        const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;
        const divCita=document.createElement("div");
        divCita.classList.add("cita","p-3");
        divCita.dataset.id=id;

        const mascotaParrafo =document.createElement("h2");
        mascotaParrafo.classList.add("card-title","font-weight-bolder")
        mascotaParrafo.textContent=mascota;

        //propietario
        const propietarioParrafo=document.createElement("p");
        propietarioParrafo.innerHTML=`<span class="font-weight-bolder">Propietario: </span> ${propietario}`;

        //telefono
        const telefonoParrafo=document.createElement("p");
        telefonoParrafo.innerHTML=`<span class="font-weight-bolder">Telefono: </span> ${telefono}`;

        //fecha
        const fechaParrafo=document.createElement("p");
        fechaParrafo.innerHTML=`<span class="font-weight-bolder">Fecha: </span> ${fecha}`;

        //hora
        const horaParrafo=document.createElement("p");
        horaParrafo.innerHTML=`<span class="font-weight-bolder">Hora: </span> ${hora}`;

        //sintomas
        const sintomasParrafo=document.createElement("p");
        sintomasParrafo.innerHTML=`<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`;

        //boton para eliminar
        const btnEliminar=document.createElement("button");
        btnEliminar.classList.add("btn","btn-danger","mr-2");
        btnEliminar.innerHTML=`Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`;
        //llamando a la funcion para eliminar
        btnEliminar.onclick= () => eliminarCita(id);
        //boton para editar una cita
        const btnEditar=document.createElement("button");
        btnEditar.classList.add("btn","btn-info");
        btnEditar.innerHTML=`Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>`;
        // llamando a la funcion para editar
        btnEditar.onclick= ()=>editarCita(cita)

        //agregando la cita 
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        //agregando al html
        contenedorCitas.appendChild(divCita);
       });
    }

    limpiarHtml(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
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
    if(ediccion){
        cita.editarCita({...objCita});
        ui.mostrarMensaje("Cita Editada Correctamente");
        ediccion=false;
        //cambia el texto del boton segun sea el caso para identificar que es lo que hacemos
        formulario.querySelector(`button[type="submit"]`).textContent='Crear Cita';
    }
    else{
        objCita.id =Date.now();//le agrega un id para poder eliminar o editar una cita
        cita.agregarCita({...objCita});// asi solo se pasa la ultima cita y no nos crea citas duplicadas;
        ui.mostrarMensaje("Cita Agregada Correctamente");
    }
    formulario.reset();
    reiniciarObjecto();//evita que el objecto siga teniendo valores
    ui.mostrarCitas(cita);
}
function reiniciarObjecto(){
    objCita.mascota="";
    objCita.propietario="";
    objCita.telefono="";
    objCita.fecha="";
    objCita.hora="";
    objCita.sintomas="";
}
function eliminarCita(id){
    //elimina la cita del arreglo
    cita.eliminarCita(id);
    //muestra mendsaje
    ui.mostrarMensaje("Cita eliminada correctamente");
    //refresca las citas
    ui.mostrarCitas(cita);
}
function editarCita(cita){
    const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;
    // llenar los inputs con la informacion de la cita
    inputMascota.value=mascota;
    inputPropietario.value=propietario;
    inputTelefono.value=telefono;
    inputFecha.value=fecha;
    inputHora.value=hora;
    inputSintomas.value=sintomas;

    //llenar el objectoCita con la informacion de cita
    objCita.mascota=mascota;
    objCita.propietario=propietario;
    objCita.telefono=telefono;
    objCita.fecha=fecha;
    objCita.hora=hora;
    objCita.sintomas=sintomas;
    objCita.id=id;
    //cambia el texto del boton segun sea el caso para identificar que es lo que hacemos
    formulario.querySelector(`button[type="submit"]`).textContent='Guardar Cambios';

    ediccion=true;
}