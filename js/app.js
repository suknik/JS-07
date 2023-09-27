

function solicitud (datos) {
    console.log('Funcion no asicrona');
    return new Promise(resolve => setTimeout(resolve, datos));
}

    


async function f() {
    console.log('Inicio de funcion asincrona');
    await solicitud(2000)
    console.log('Terminamos ejecución de función asíncrona')
}


function bigFunction() {
    console.log('Funcion normal ejecutada');
    let result = 0;

    for(let i = 0; i < 1e7; i++){
        result += i;
    }
    console.log('funcion normal terminada', result);
}

// f();
// bigFunction();

const COUNTER_P = document.querySelector('#counter');
let counter = 0;

document.querySelector('#btn-counter')
    .addEventListener('click', async (e) => {
        await setTimeout(() => {
            counter++;
            COUNTER_P.textContent = counter;
        }, 2000)
})

