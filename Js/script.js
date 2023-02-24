const tareainput    = document.getElementById("tarea-input")
const listadetareas = document.getElementById("listadetareas")
const agregar       = document.getElementById("agregar")
const notificacion  = document.getElementById("notificacion")
const estado        = document.getElementById("estado")
let alertatareas    = 3

const tareas = JSON.parse(localStorage.getItem("tareas")) || [] // Storage

agregar.onclick     = () => {Agregar()}

function Chequeo(){
    if (tareas.length == 0)
    {estado.innerText = "¡Felicidades! Estás al día."}
    else{
        if (tareas.length > alertatareas)
        {estado.innerText = "¡Tenés más de 3 tareas pendientes!"+" (Total: "+tareas.length+")"}
        else {
              if (tareas.length == 1)
              {estado.innerText = tareas.length + " tarea pendiente."}
              else {estado.innerText = tareas.length + " tareas pendientes."}}}
}

let Guardar = () => {
  localStorage.setItem("tareas", JSON.stringify(tareas)) // Guarda Storage
}

function Agregar() {
    if (!tareainput.value) { //validacion del string vacio
      return errorvacio()
    }
  
    const nuevaTarea = {
        tarea: tareainput.value,
        progreso: 0 // por defecto
      };
      
    
    tareas.push(nuevaTarea)
    notificacion.innerText = "Tarea " + tareas.length + " agregada exitosamente."
    setTimeout(() => {
        notificacion.innerText = "Actualizado."
      }, 2000)
    estado.innerText = tareas.length + " tareas pendientes."
    tareainput.value = "" //limpia el input
    Mostrar()
    Chequeo()
    Guardar()
  }

  const seguro = (index) => {
    Swal.fire({
      title: '¿Completaste la tarea?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '¡Sí!',
      denyButtonText: `Todavía no`,
    }).then((result) => {
      if (result.isConfirmed) {
        tareas.splice(index, 1); // Eliminar la tarea del array
        Mostrar(); // Actualizar la lista en el HTML
        Chequeo(); // Actualizar el estado de las tareas pendientes
        Guardar(); // Actualizar el storage
        notificacion.innerText = "Tarea completada correctamente."
        setTimeout(() => {
        notificacion.innerText = "Actualizado."
        }, 2000);
        Swal.fire('Perfecto.', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ok. Aun hay tiempo', '', 'info')
      }
    });
  };

  function Mostrar() {
    listadetareas.innerHTML = "" // Limpia la lista antes de mostrarla
  
    tareas.forEach((tarea, index) => {
      // Crea un li para cada tarea
      const li = document.createElement("li")
      li.innerText = tarea.tarea
  
      // Crea el input range para cada tarea
      const range = document.createElement("input")
      range.type = "range"
      range.min = 0
      range.max = 25
      range.value = tarea.progreso
  
      // Función del input range
      range.addEventListener("input", () => {
        tarea.progreso = range.value;
        if (tarea.progreso >= 25) {
          seguro(index); // Llamar a la función seguro
        }
      });      
  
      // Agrega el input range
      li.appendChild(range)
  
      // Agrega el elemento li a la lista de tareas
      listadetareas.appendChild(li)
    })
  }
  
  Mostrar()
  Chequeo()