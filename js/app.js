/*selectores */

const contenedor = document.querySelector(".container-cards");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

/*objeto global */

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};
/*eventos*/

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  //generar el select de años
  const max = new Date().getFullYear() + 1;
  const min = max - 14;

  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    year.appendChild(option);
  }
});

marca.addEventListener("input", (event) => {
  console.log(event.target.value);
  //obtengo un nuevo valor y lo asigno a mi objeto global.
  datosBusqueda.marca = event.target.value;

  //filtrar autos
  filtrarAuto();
});

minimo.addEventListener("input", (event) => {
  datosBusqueda.minimo = event.target.value;
  filtrarAuto();
});

maximo.addEventListener("input", (event) => {
  datosBusqueda.maximo = event.target.value;
  filtrarAuto();
});

year.addEventListener("input", (event) => {
  datosBusqueda.year = event.target.value;
  filtrarAuto();
});

puertas.addEventListener("input", (event) => {
  datosBusqueda.puertas = event.target.value;
  filtrarAuto();
});

transmision.addEventListener("input", (event) => {
  datosBusqueda.transmision = event.target.value;
  filtrarAuto();
});

color.addEventListener("input", (event) => {
  datosBusqueda.color = event.target.value;
  filtrarAuto();
});

function filtrarAuto() {
  const resultado = autos
    .filter(filtrarPorMarca)
    .filter(filtrarMinimo)
    .filter(filtrarPorYear)
    .filter(filtrarMaximo)
    .filter(filtrarPorPuertas)
    .filter(filtrarPorTransmision)
    .filter(filtrarPorColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    limpiarHTML();
    const h2 = document.createElement("h2");
    h2.textContent = "No hay resultados de esta busqueda.";
    h2.style.color = "#fff";
    contenedor.appendChild(h2);
  }
}

function filtrarPorColor(auto) {
  if (datosBusqueda.color) {
    return datosBusqueda.color == auto.color;
  }

  return auto;
}

function filtrarPorTransmision(auto) {
  if (datosBusqueda.transmision) {
    return auto.transmision == datosBusqueda.transmision;
  }

  return auto;
}

function filtrarPorPuertas(auto) {
  if (datosBusqueda.puertas) {
    return datosBusqueda.puertas == auto.puertas;
  }

  return auto;
}

function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }

  return auto;
}

function filtrarPorYear(auto) {
  if (datosBusqueda.year) {
    return auto.year == datosBusqueda.year;
  }

  return auto;
}

function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }

  return auto;
}

function filtrarPorMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

limpiarHTML();
function mostrarAutos(autos) {
  contenedor.innerHTML = "";
  autos.forEach((auto) => {
    contenedor.innerHTML += `
      <div class="card">
            <img
                    src="${auto.imagen}"
                />
                <div class="description-card">
                    <p>${auto.marca} - ${auto.modelo} - ${auto.year}</p>
                    <p>Transmisión: ${auto.transmision}</p>
                    <p>Precio: ${auto.precio}</p>
                    <p>Puertas: ${auto.puertas}</p>
                    <p>Color: ${auto.color}</p>
  
            </div>
          </div>
      
      `;
  });
}

function limpiarHTML() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}
