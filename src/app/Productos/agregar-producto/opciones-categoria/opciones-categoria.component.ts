import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductoService } from '../../../services/producto.service';
import { AddProductView, AddCategorieView } from '../../../Models/Models';

@Component({
  selector: 'app-opciones-categoria',
  templateUrl: './opciones-categoria.component.html',
  styleUrls: ['./opciones-categoria.component.css']
})
export class OpcionesCategoriaComponent implements OnInit {

  public listaCategorias: AddCategorieView[] = [];

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getAllCategories().subscribe();
  }

  source = this.listaCategorias;
	target = [this.listaCategorias];
}
