let carrito = [];
let stock = [];

const tabla = document.getElementById("items");
const agregar = document.querySelector("#agregar");
const ordenar = document.getElementById("ordenar");
const productosEnStock = document.getElementById("productos");


stock.push(new Producto("Snake", 300));
stock.push(new Producto("Ajedrez", 100));
stock.push(new Producto("Robot", 50));
stock.push(new Producto("minicraft", 500));



stock.forEach((producto) => {
    let option = document.createElement("option");
    option.innerText = `${producto.nombre} costo: $${producto.precio}`
    option.value = stock.indexOf(producto); 
    productosEnStock.appendChild(option); 
})


function newRow(item) {
    let row = document.createElement("tr");
    let pos = carrito.indexOf(item); 

    
    let celda = document.createElement("td");
    celda.innerText = item.producto.nombre;
    row.append(celda);

    
    celda = document.createElement("td");
    celda.innerText = item.cantidad;

 
    let botonIncremento = document.createElement("button");
    botonIncremento.className = "btn btn-primary";
    botonIncremento.innerText = "+";

    let botonDecremento = document.createElement("button");
    botonDecremento.className = "btn btn-primary";
    botonDecremento.innerText = "-";

    botonIncremento.onclick = () =>
    {
        carrito[pos].cantidad++;
        listadoUpdate();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    botonDecremento.onclick = () =>
    {
        if (carrito[pos].cantidad > 0)
        {
            carrito[pos].cantidad--;
            listadoUpdate();
            localStorage.setItem("carrito",JSON.stringify(carrito));
        }
    }

    celda.append(botonIncremento);
    celda.append(botonDecremento);
    row.append(celda);

    ///creo la celda precio

    celda = document.createElement("td");
    celda.innerText = item.producto.precio;
    row.append(celda);

    // BOTON ELIMINAR
    let botonEliminar = document.createElement('button');
    botonEliminar.className = "btn btn-danger";
    botonEliminar.innerText = "Eliminar";
    
    botonEliminar.onclick = () => {
        carrito.splice(pos,1); 
        listadoUpdate(); 
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }

    celda = document.createElement("td");
    celda.append(botonEliminar);
    row.append(celda);
    tabla.append(row);

}
//  total de todas las rows 
function calculoTotal()
{
     
     total = document.getElementById("total");
     total.innerText = carrito.reduce(
         (suma,item) => 
         suma + item.producto.precio*item.cantidad
     ,0);
}


// actualiza la tabla 
function listadoUpdate() {
    tabla.innerHTML = "";
    carrito.forEach((item) => 
    {
        newRow(item);
    });
    calculoTotal();
}

// agregamos item al carrito  
agregar.addEventListener("submit", (e) => {
    e.preventDefault();
    let producto = stock[productosEnStock.value];

    let nuevoElementoCarrito = new Item(producto,1); 
    carrito.push(nuevoElementoCarrito); 
    newRow(nuevoElementoCarrito);
    calculoTotal();
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
});


// vaciamos el carrito
vaciar.onclick = () => {
  carrito  = [];
  listadoUpdate();
  localStorage.setItem("carrito",JSON.stringify(carrito));
};
