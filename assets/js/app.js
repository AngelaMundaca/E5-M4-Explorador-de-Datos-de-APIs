const botonXHR = document.getElementById("cargar-xhr");
const botonFetch = document.getElementById("cargar-fetch");

// Contenedor de usuarios
const resultado = document.getElementById("resultado");

// Bonus
const botonBuscarGif = document.getElementById("buscar-gif");
const inputBusquedaGif = document.getElementById("busqueda-gif");
const resultadoGif = document.getElementById("resultado-gif");

/*Funcion para redenderizar*/
function renderizarUsuarios(usuarios) {
    resultado.innerHTML = "";

    const ul = document.createElement("ul");

    usuarios.forEach(function (usuario) {
        const li = document.createElement("li");

        li.innerHTML = `
            <h4>${usuario.name}</h4>
            <p>${usuario.email}</p>
        `;

        ul.appendChild(li);
    });

    resultado.appendChild(ul);
}

/*PARTE 1: XMLHttpRequest*/
botonXHR.addEventListener("click", function () {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

    xhr.onload = function () {
        if (this.status === 200) {
            const usuarios = JSON.parse(this.responseText);
            renderizarUsuarios(usuarios);
        }
    };

    xhr.onerror = function () {
        console.error("Error al cargar usuarios con XHR");
    };

    xhr.send();
});

/*PARTE 2: FETCH*/
botonFetch.addEventListener("click", function () {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (usuarios) {
            renderizarUsuarios(usuarios);
        })
        .catch(function (error) {
            console.error("Error con Fetch:", error);
        });
});

/*BONUS: API KEY*/
botonBuscarGif.addEventListener("click", function () {

    const terminoBusqueda = inputBusquedaGif.value;
    const apiKey = "kICA3Arx3ntDa6nNj7n0Dnw8vDlNf04L";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${terminoBusqueda}&limit=1`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            resultadoGif.innerHTML = "";

            const gifUrl = data.data[0].images.original.url;

            const img = document.createElement("img");
            img.src = gifUrl;
            img.style.maxWidth = "100%";

            // Muestra el GIF
            resultadoGif.appendChild(img);
        })
        .catch(function (error) {
            console.error("Error al buscar GIF:", error);
        });
});