let historial = []

const getDatos = async () => {
    const resp = await fetch('/json/data.json')
    const data = await resp.json()
    return data
}
    
const listahistorial = document.getElementById('lista-de-tareas')
const actualizar = document.getElementById('actualizar')

const historialdetareas = async () => {
    historial = await getDatos()

    listahistorial.innerHTML = ''

    historial.forEach(tarea => {
        const li = document.createElement('li')
        li.innerText = tarea.tarea
        listahistorial.appendChild(li)
    })
}

actualizar.addEventListener('click', historialdetareas)