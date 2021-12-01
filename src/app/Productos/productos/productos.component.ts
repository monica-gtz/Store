import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarProductoComponent } from '../agregar-producto/agregar-producto.component'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  agregarProducto() {
    this.dialog.open(AgregarProductoComponent);
  }
}
