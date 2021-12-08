export class Producto {
  productoId: string = "0";
  nombre: string = "";
  precio: number;
  imagen: string = "";
  productocategoriaid: number;
  estatus: Estatus;
  categoria: Categoria;
}

export class Estatus {
  estatusId: string = "0";
  descripcion: string = "";
}

export class Categoria {
  categoriaId: string = "0";
  descripcion: string = "";
  imagen: string = "";
}

export class ProductoCategoria{
  productoCategoriaId: string = "0";
  productoId: string = "0";
  categoriaId: string = "0";
}