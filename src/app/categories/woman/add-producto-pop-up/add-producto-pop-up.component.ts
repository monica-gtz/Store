import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Estatus, Producto } from '../../../Models/Models';
import { ProductoService } from '../../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-producto-pop-up',
  templateUrl: './add-producto-pop-up.component.html',
  styleUrls: ['./add-producto-pop-up.component.css']
})
export class AddProductoPopUpComponent implements OnInit {

  private apiUrlEstatus: string = "https://localhost:5001/api/Estatus";

  public producto: Producto;
  public estatus: Estatus[];

  constructor(private http: HttpClient,
    private productoService: ProductoService,
    public dialog: MatDialog) { 
    this.http = http;

    http.get<Estatus[]>(this.apiUrlEstatus).subscribe(
      result => {
        this.estatus = result;
        console.log(this.estatus);
      }, error => console.error(error)
    );
  }

  ngOnInit(): void {
  }

  add(){
    this.productoService.addNewProducto(this.producto).subscribe(
      response => {
        console.log(response);
        this.dialog.closeAll();
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

}
