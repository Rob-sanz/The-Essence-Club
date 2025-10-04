async function cargarCatalogo() {
  try {
    const respuesta = await fetch('catalogo.json');
    const productos = await respuesta.json();

    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    productos.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('card');

      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p><strong>Marca:</strong> ${p.marca}</p>
        <p><strong>Tamaño:</strong> ${p.ml}ml</p>
        <p><strong>Precio:</strong> L. ${p.precio}</p>
        <p class="stock ${p.stock <= 3 ? 'low' : ''}">
          Stock: ${p.stock}
        </p>
      `;

      catalogo.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar el catálogo:', error);
  }
}

cargarCatalogo();
