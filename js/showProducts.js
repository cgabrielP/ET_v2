import { listadoProductos, productos } from "./db.js";
import { agregarProducto,eliminarProducto,agregarCantidad } from "./main.js";

const divListado=document.getElementById("listado");

const mostrarProductos = () => {
    divListado.innerHTML = '';
    const rowProductos = document.createElement("div");
    rowProductos.classList.add("row", "my-5", "card-producto", "d-flex", "justify-content-start");

    listadoProductos.forEach((prod, index) => {
        const colProductos = document.createElement("div");
        colProductos.classList.add("col-sm-6", "col-md-4", "col-lg-3", "col-xl-2");

        const divStyle=document.createElement("div");
        divStyle.setAttribute("style","width: 12rem")

        const linkDetalle=document.createElement("a");
        linkDetalle.setAttribute("href",`detalle.html`)

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", prod.img);

        linkDetalle.appendChild(img);

        const cardBody=document.createElement("div");
        cardBody.classList.add("card-body");

        const precioProducto= document.createElement("h5");
        precioProducto.classList.add("card-title","fw-bold");
        precioProducto.textContent=`$${prod.precio}`;
        cardBody.appendChild(precioProducto);

        const divCantidad= document.createElement("div");
        divCantidad.classList.add("fw-light");

        const spanCantidad=document.createElement("span");
        spanCantidad.classList.add("badge" ,"text-bg-secondary" ,"bg-opacity-25");
        spanCantidad.textContent='1 un';

        divCantidad.appendChild(spanCantidad);
        cardBody.appendChild(divCantidad);

        const divMarca=document.createElement("div")
        divMarca.classList.add("fw-light");
        divMarca.textContent=prod.marca;
        cardBody.appendChild(divMarca);

        const parNombre=document.createElement("p")
        parNombre.classList.add("card-text");
        parNombre.textContent=prod.descripcion;
        cardBody.appendChild(parNombre);

        const productoEnCarrito = productos.find(producto => producto.id === prod.id);

        if (productoEnCarrito) {
            
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("btn-group", "align-items-center", "mt-2");
            btnGroup.setAttribute("role", "group");
            btnGroup.setAttribute("aria-label", "Basic example");

            const btnDelete = document.createElement("button");
            btnDelete.setAttribute("type", "button");
            btnDelete.addEventListener("click", () => {
                eliminarProducto(prod.id);
            });
            btnDelete.classList.add("btn", "btn-success");
            btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            const quantity = document.createElement("div");
            quantity.classList.add("px-1","pt-2");
            quantity.textContent = `${prod.cantidad} un.`;

            const btnPlus = document.createElement("button");
            btnPlus.setAttribute("type", "button");
            btnPlus.classList.add("btn", "btn-success");
            btnPlus.addEventListener("click", () => {
                agregarCantidad(prod.id);
            });
            btnPlus.innerHTML = '<i class="fa-solid fa-plus"></i>';

            btnGroup.appendChild(btnDelete);
            btnGroup.appendChild(quantity)
            btnGroup.appendChild(btnPlus);
            cardBody.appendChild(btnGroup);
        } else {
            // Si el producto no está en el carrito, genera el divBtn
            const divBtn = document.createElement("div");
            divBtn.classList.add("d-grid", "col-12");

            const anchorBtn = document.createElement("a");
            anchorBtn.classList.add("btn", "btn-success", "text-center", "fw-bold");
            anchorBtn.addEventListener("click", () => {
                agregarProducto(prod.id),console.log(productos);
            });
            anchorBtn.textContent = "Agregar";

            divBtn.appendChild(anchorBtn);
            cardBody.appendChild(divBtn);
        }

        const divValoracion=document.createElement("div");
        divValoracion.classList.add("justify-content-start");

        const iconValoracion=document.createElement("i");
        iconValoracion.classList.add("fa-solid", "fa-star", "text-warning");
        
        divValoracion.appendChild(iconValoracion);

        const textValoracion = document.createTextNode(prod.valoracion);
        divValoracion.appendChild(textValoracion);


        divStyle.appendChild(linkDetalle);
        divStyle.appendChild(cardBody);
        divStyle.appendChild(divValoracion);

        colProductos.appendChild(divStyle);
        rowProductos.appendChild(colProductos);
    })
    divListado.appendChild(rowProductos);
};
export {mostrarProductos}