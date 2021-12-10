import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCategoriaComponent } from '../agregar-categoria/agregar-categoria.component';
import { CategoriaService } from '../../services/categoria.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  openDialog() {
    let popupRef = this.dialog.open(AgregarCategoriaComponent);
    popupRef.afterClosed().subscribe(result => this.categoriaService.getAllCategorie);
  }

}
