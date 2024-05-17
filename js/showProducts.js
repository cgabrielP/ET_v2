import { listadoProductos } from "./db.js";
import { agregarProducto } from "./main.js";

const divListado=document.getElementById("listado");

const mostrarProductos = () => {
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

        const divBtn=document.createElement("div");
        divBtn.classList.add("d-grid", "col-12");
        const anchorBtn=document.createElement("a");
        anchorBtn.classList.add("btn", "btn-success","text-center","fw-bold");
        anchorBtn.addEventListener("click",()=>{
                agregarProducto(index+1)
        });
        anchorBtn.textContent="Agregar";
        divBtn.appendChild(anchorBtn);
        cardBody.appendChild(divBtn);

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

mostrarProductos();
