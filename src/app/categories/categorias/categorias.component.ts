import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCategoriaComponent } from '../agregar-categoria/agregar-categoria.component';
import { CategoriaService } from '../../services/categoria.service';
import { AddCategorieView } from 'src/app/Models/Models';
import { TouchSequence } from 'selenium-webdriver';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public listaCategorias: AddCategorieView[] = [];
  dataSource = this.listaCategorias;

  constructor(public dialog: MatDialog,
    private categoriaService: CategoriaService) { }

    displayedColumns: string[] = ['categoriaId','descripcion', 'imagen'];

  ngOnInit(): void {
    this.categoriaService.getAllCategories().subscribe(
      result => this.postProcess(result)
    );
  }

  openDialog() {
    let popupRef = this.dialog.open(AgregarCategoriaComponent);
    popupRef.afterClosed().subscribe(result => this.categoriaService.getAllCategories);
  }

  postProcess(listaCategorias: AddCategorieView[]): void {
    console.log(listaCategorias);
    listaCategorias.forEach(element => {
      element.imagen = this.categoriaService.getImageUrl(element.imagen);
    });
    this.listaCategorias = listaCategorias;
    this.dataSource = listaCategorias;
  }

}
