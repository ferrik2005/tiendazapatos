const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');

const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');

const noti = document.querySelector(".notification");

formC.addEventListener('submit', async e => {
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/usuarios', {
        method: 'GET',
    })
    const users = await respuesta.json();
    const usuario = users.find(i => i.username === createInput.value)
    if (!createInput.value) {
        console.log('campos vacios')
        noti.innerHTML = 'El campo no puede estar vacio';
        noti.classList.add('show-notification')
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 2000)
    } else if (usuario) {
        noti.innerHTML = 'Bienvenido';
        noti.classList.add('show-notification')
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 2000)
        window.location.href = 'tienda.html'
    } else {
        //caso de que no existe y registro
        await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: createInput.value })
        })
        noti.innerHTML = 'El usuario se ha registrado satisfactoriamente';
        noti.classList.add('show-notification')
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 2000)
        window.location.href = 'tienda.html'
    }
    if(!usuario){
        noti.innerHTML = 'El usuario no existe';
        noti.classList.add('show-notification');
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 2000)
         createInput.value = "";
    }else if(usuario){
        localStorage.setItem('user',JSON.stringify(usuario))
        window.location.href = 'tienda.html';
    
    }
})

