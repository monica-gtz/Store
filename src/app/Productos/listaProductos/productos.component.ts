import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { ProductoService } from '../../services/producto.service';
import { AddProductView } from '../../Models/Models';
import { EditarProductoComponent } from '../editar-producto/editar-producto.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listaProductos: AddProductView[] = [];
  actualizar : AddProductView;
  dataSource = this.listaProductos;

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private productoService: ProductoService) { }

    displayedColumns: string[] = ['productoId', 'nombre', 'precio', 'imagen'];

  ngOnInit(): void {
    this.productoService.getAllProducts().subscribe(
      result => this.postProcess(result)
    );
  }

  openDialog() {
    let popupRef = this.dialog.open(AgregarProductoComponent);
    popupRef.afterClosed().subscribe(result => this.productoService.getAllProducts());
  }

  postProcess(listaProductos: AddProductView[]): void {
    console.log(listaProductos);
    listaProductos.forEach(element => {
      element.imagen = this.productoService.getImageUrl(element.imagen);
    });
    this.listaProductos = listaProductos;
    this.dataSource = listaProductos;
  }

  mostrarDetalles(actualizar: AddProductView):void{
    debugger;
    console.log(actualizar);
    const openDialogUpdate = this.dialog.open(EditarProductoComponent);
  }
}
