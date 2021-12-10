import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component';
import { ProductoService } from '../../services/producto.service';
import { AddProductView } from '../../Models/Models';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public listaProductos: AddProductView[] = [];
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

  postProcess(listProductos: AddProductView[]): void {
    console.log(listProductos);
    listProductos.forEach(element => {
      element.imagen = this.productoService.getImageUrl(element.imagen);
    });
    this.listaProductos = listProductos;
    this.dataSource = listProductos;
  }

}
