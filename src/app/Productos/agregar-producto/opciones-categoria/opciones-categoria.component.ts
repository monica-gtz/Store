import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductoService } from '../../../services/producto.service';
import { AddProductView, AddCategorieView } from '../../../Models/Models';
import { DualListComponent } from '../../../dual-list/dual-list.component';

@Component({
  selector: 'app-opciones-categoria',
  templateUrl: './opciones-categoria.component.html',
  styleUrls: ['./opciones-categoria.component.css']
})
export class OpcionesCategoriaComponent implements OnInit {

  private listaCategorias: AddCategorieView[];
  tab = 1;
  keepSorted = true;
  display: string;
  filter = false;
  source: AddCategorieView[];
  confirmed: AddCategorieView[];
  userAdd = '';
  disabled = false;

  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;
 

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getAllCategories().subscribe();
  }
}
