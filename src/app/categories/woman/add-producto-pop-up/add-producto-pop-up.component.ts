import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Estatus, Producto, Categoria } from '../../../Models/Models';
import { ProductoService } from '../../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-producto-pop-up',
  templateUrl: './add-producto-pop-up.component.html',
  styleUrls: ['./add-producto-pop-up.component.css']
})
export class AddProductoPopUpComponent implements OnInit {

  

  constructor() {}

  ngOnInit(): void {
    
  }


}
