document.addEventListener("DOMContentLoaded", function (event) {

    let foodContainer = document.querySelector('.food-container');

    let template = document.querySelector("#plantilla-carta")
    let platos = document.querySelector("section#platos div")

    const url = 'https://63cff7c8e52f587829a90675.mockapi.io/api/v1/carta'

    fetch(url)
        .then((result) => {
            if (result.ok)
                return result.json()
        })
        .then((output) => {

            var cont = 1;
            output.forEach(function (plato) {

                console.log(plato)

                let el = template.content.cloneNode(true);

                el.setAttribute('id', 'plantilla-carta-' + cont)

                el.setAttribute('data-veganos', plato.veganos)

                el.setAttribute('data-celiacos', plato.celiacos)

                el.setAttribute('data-intolerantes', plato.intolerantes)

                el.querySelector("h4").textContent = plato.nombrePlato
                el.querySelector("img").setAttribute("src", plato.imagen)
                el.querySelector("p.ingredientes").textContent = plato.ingredientes
                el.querySelector("p.precio").textContent = plato.precio

                platos.appendChild(el)

                cont++;

            })

        }).catch(err => console.error(err))



    function mostrarPlatos(tipoPlato) {

        if (tipoPlato == "") {

            mostrarTodoPlatos();

        } else {
            ocultarTodoPlatos();

            let templateTipoPlato = document.querySelectorAll('[data' + tipoPlato + '=true]');

            for (let i = 0; i < templateTipoPlato.length; i++) {
                templateTipoPlato[i].classList.remove('hide');
            }
        }
    }

    function ocultarTodoPlatos() {

        document.getElementsByClassName('templatePlato').forEach(function (template) {

            template.classList.add('hide');

        })

    }

    function mostrarTodoPlatos() {

        document.getElementsByClassName('templatePlato').forEach(function (template) {

            template.classList.remove('hide');

        })

    }

    document.querySelectorAll('li[data-filtro]').addEventListener('click', function () {

        mostrarPlatos(this.getAttribute('data-filtro'));


    });


});