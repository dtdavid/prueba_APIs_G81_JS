//cargamos el select con las opciones de valor de la API
document.addEventListener('DOMContentLoaded', ()=> select())
//conexión con la API
async function getCambioMoneda() {
    try{
        const apiURL = 'https://mindicador.cl/api/'
        const res = await fetch(apiURL)
        const data = await res.json()
        
        return data
    }
    catch(error)
    {
        alert(`Error al obtener los datos: ${error.message}`)
    }   
}
//cargamos el select de forma dinámica para Euro y Dólar
async function select(){
    const options = await getCambioMoneda()
    let htmlOption = '<option value="" disabled selected>Moneda</option>'
        //tendríamos que verificar antes que existen esas monedas
        if(options.dolar) {
            htmlOption += `<option value="dolar" id="cambio1">Dólar</option>`
        }
        if(options.euro){
            
            htmlOption += `<option value="euro" id="cambio2">Euro</option>`
        }

    document.querySelector('#cambio').innerHTML = htmlOption
    
}
//renderizamos el resultado
async function renderResultado(){
    //esperamos por getCambioMoneda
    const data = await getCambioMoneda()
    console.log(data)
    //const monedaCLP = document.querySelector('#moneda').value
    //const monedaCLP = parseInt(document.querySelector('#moneda').value)
     const monedaCLP = parseFloat(document.querySelector('#moneda').value)
     const monedaSeleccionada = document.querySelector('#cambio').value
     
     let cambio = ''
     //comprobamos que monedaCLP no sea NaN
     //comprobamos que tengamos seleccionada una moneda
     if(!isNaN(monedaCLP) && monedaSeleccionada) {
        if(monedaSeleccionada === 'dolar'){
        cambio = `${ (monedaCLP / data.dolar.valor).toFixed(2)} $` //Resultado daba un número muy largo
     } else if (monedaSeleccionada === 'euro') {
        cambio = `${ (monedaCLP / data.euro.valor).toFixed(2)} €`
     }
     const resultadoCambio = document.querySelector('.resultado_cambio')
        resultadoCambio.innerHTML = `Resultado: ${cambio}`
     } else {
         alert('Debe introducir la cantidad!')
     }

     //Preparación del renderizado de la gráfica
     // metemos en un array las fechas y los valores
     let fechas = []
     let historial = []
     if(monedaSeleccionada === 'dolar'){
        historial.dolar.serie.slice(0,10)
     }else if(monedaSeleccionada === 'euro'){
        historial.dolar.serie.slice(0,10)
     }
     fechas = historial.map(dia => dia.fecha.slice(0, 10))
     const valores = historial.map(dia => dia.valor)
     
     //configuramos el gráfico
     const canva = document.querySelector('.canvas')
     new Chart(canva, {
        type: 'line',
        data: {
            labels:fechas,
            datasets: [{
                label: `Historial últimos 10 días del ${monedaSeleccionada}`,
                backgroundColor: 'red',
                data: valores ,
                borderColor: 'red'
            }]
        }
     })
 }
document.querySelector('.buscar').addEventListener('click', renderResultado)



 

