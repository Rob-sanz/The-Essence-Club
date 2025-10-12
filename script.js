async function cargarCatalogo() {
  try {
    const respuesta = await fetch('catalogo.json');
    const productos = await respuesta.json();

    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    productos.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('card');
      
      // Agregar clase especial si está agotado
      if (p.stock === 0) {
        div.classList.add('agotado');
      }

      // Construir HTML de precios
      let precioHTML = '';
      if (p.precio_antes && p.precio_antes !== 0 && p.precio_antes !== "0") {
        // Producto con descuento - Debug
        console.log(`Producto con descuento: ${p.nombre}, antes: ${p.precio_antes}, ahora: ${p.precio}`);
        precioHTML = `
          <p><strong>Precio:</strong> 
            <div class="precio-container">
              <span class="precio-actual">L. ${p.precio}</span>
              <span class="precio-antes">L. ${p.precio_antes}</span>
            </div>
          </p>
        `;
      } else {
        // Precio normal
        precioHTML = `<p><strong>Precio:</strong> L. ${p.precio}</p>`;
      }

      div.innerHTML = `
        ${p.stock === 0 ? '<div class="banner-agotado">AGOTADO</div>' : ''}
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p><strong>Marca:</strong> ${p.marca}</p>
        <p><strong>Tamaño:</strong> ${p.ml}ml</p>
        ${precioHTML}
        <!-- <p class="stock ${p.stock <= 3 ? 'low' : ''}">
          Stock: ${p.stock}
        </p> -->
      `;

      catalogo.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar el catálogo:', error);
  }
}

cargarCatalogo();
