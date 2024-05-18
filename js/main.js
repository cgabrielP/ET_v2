import { listadoProductos,productos } from "./db.js";
import { mostrarProductos } from "./showProducts.js";

let total = 0;
const divProductos = document.getElementById("carrito");

const calcularTotal = () => {
    total = 0;
    if (productos.length != 0) {

        productos.forEach(producto => {
            total += parseInt(producto.precio)*parseInt(producto.cantidad) ;
        });
        return;
    }
    else
    total = 0;
}

const listarProductos = () => {
    divProductos.innerHTML = "";


    // Crear el encabezado
    const offcanvasHeader = document.createElement("div");
    offcanvasHeader.classList.add("offcanvas-header");

    const offcanvasTitle = document.createElement("h5");
    offcanvasTitle.classList.add("offcanvas-title", "fw-bold");
    offcanvasTitle.setAttribute("id", "offcanvasRightLabel");
    offcanvasTitle.textContent = "Tienes " + productos.length + " producto(s)";

    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "offcanvas");
    closeButton.setAttribute("aria-label", "Close");

    offcanvasHeader.appendChild(offcanvasTitle);
    offcanvasHeader.appendChild(closeButton);

    // Crear el cuerpo
    const offcanvasBody = document.createElement("div");
    offcanvasBody.classList.add("offcanvas-body");

    productos.forEach((producto, index) => {
        const row = document.createElement("div");
        row.classList.add("row", "border-bottom", "mb-3");

        // Colocar la imagen
        const colImg = document.createElement("div");
        colImg.classList.add("col-md-5");

        const img = document.createElement("img");
        img.setAttribute("src", producto.img);
        img.classList.add("img-fluid", "rounded-start");
        img.setAttribute("alt", "...");

        colImg.appendChild(img);

        // Colocar la información del producto
        const colInfo = document.createElement("div");
        colInfo.classList.add("col-md-7");

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title", "fs-6");
        cardTitle.textContent = producto.descripcion;

        const cardPrice = document.createElement("div");
        cardPrice.classList.add("card-title", "fs-6");
        cardPrice.classList.add("mt-3", "fw-bold");
        cardPrice.textContent = "$" + producto.precio;

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group", "align-items-center", "mt-2");
        btnGroup.setAttribute("role", "group");
        btnGroup.setAttribute("aria-label", "Basic example");

        const btnDelete = document.createElement("button");
        btnDelete.setAttribute("type", "button");
        btnDelete.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
        btnDelete.classList.add("btn", "btn-success");
        btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        const btnPlus = document.createElement("button");
        btnPlus.setAttribute("type", "button");
        btnPlus.classList.add("btn", "btn-success");
        btnPlus.addEventListener("click", () => {agregarCantidad(producto.id)});
        btnPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';

        const quantity = document.createElement("div");
        quantity.classList.add("px-1");
        quantity.textContent = `${producto.cantidad} un.`;

        btnGroup.appendChild(btnDelete);
        btnGroup.appendChild(quantity);
        btnGroup.appendChild(btnPlus);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(btnGroup);
        cardBody.appendChild(cardPrice);

        colInfo.appendChild(cardBody);

        row.appendChild(colImg);
        row.appendChild(colInfo);

        offcanvasBody.appendChild(row);
        calcularTotal();

    }
    );

    // Crear el pie de carrito
    const offcanvasFooter = document.createElement("div");
    offcanvasFooter.classList.add("offcanvas-footer");

    const footerRow = document.createElement("div");
    footerRow.classList.add("row","mx-2", "pb-3",  "fs-5")
    footerRow.textContent = `El monto final es $${total}`;
    const footerRow2=document.createElement("div");
    footerRow2.classList.add("row","d-flex","justify-content-end","pb-3");
    const btnComprar=document.createElement("div");
    btnComprar.classList.add("col-5","btn","btn-success")
    btnComprar.textContent ="Comprar";

    
    footerRow2.appendChild(btnComprar);
    offcanvasFooter.appendChild(footerRow)
    offcanvasFooter.appendChild(footerRow2);

    // Agregar elementos al DOM
    divProductos.appendChild(offcanvasHeader);
    divProductos.appendChild(offcanvasBody);
    divProductos.appendChild(offcanvasFooter);


}
const agregarCantidad = (id) => {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        producto.cantidad ++;
    }
    mostrarProductos(); // Actualiza la vista
    calcularTotal();
    listarProductos();
    mostrarProductos();
}

const eliminarProducto = (id) => {
    const index = productos.findIndex(prod => prod.id === id);
    console.log(index);
    if(productos[index].cantidad>1){
        productos[index].cantidad--
    }
    else{
        productos.splice(index, 1);
    }
    calcularTotal();
    listarProductos();
    mostrarProductos();
}

const agregarProducto = (id) => {
    const productoElegido = listadoProductos.find(producto => producto.id === id)
    if(productos.includes(productoElegido)){
        productoElegido.cantidad++;
        calcularTotal();
        listarProductos();
        mostrarProductos();
        return;
    }
    productos.push(productoElegido);
    calcularTotal();
    listarProductos();
    mostrarProductos();

};

listarProductos();
document.addEventListener('DOMContentLoaded', mostrarProductos);
export { agregarProducto,eliminarProducto,agregarCantidad};
