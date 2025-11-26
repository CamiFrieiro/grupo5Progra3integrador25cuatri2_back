        let listaProductos = document.getElementById("lista-productos");
        let getProductForm = document.getElementById("getProduct-form");
        let url = "http://localhost:3000";


        getProductForm.addEventListener("submit", async (event) => {
            event.preventDefault(); 
            let formData = new FormData(event.target);
            console.log(formData); 

            let data = Object.fromEntries(formData.entries());
            console.log(data); 

            let idProd = data.idProd; 
            console.log(idProd);
            console.log(`Realizando una peticion GET a la url ${url}/api/products/${idProd}`);
            
            let response = await fetch(`${url}/api/products/${idProd}`);

            let datos = await response.json();

            if(response.ok){
                let producto = datos.payload[0];
                console.log(producto);

                let htmlProducto = `
                    <li class="li-producto">
                            <img class="producto-img" src="${producto.image}" alt="${producto.name}">
                            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: ${producto.price}</strong></p>
                    </li>
                `;
                listaProductos.innerHTML = htmlProducto;                
            } else {
                console.log(datos);
                console.log(datos.message);
                alert(datos.message);
            }

        });