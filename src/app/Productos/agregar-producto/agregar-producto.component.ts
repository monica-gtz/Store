import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Estatus, Producto, Categoria } from '../../Models/Models';
import { ProductoService } from '../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  private apiUrlEstatus: string = "https://localhost:5001/api/Estatus";
  private apiUrlCategorias: string = "https://localhost:5001/api/Categorias";

  public producto: Producto;
  public estatus: Estatus[];
  public categorias: Categoria[];

  private file: File;
  public progress: number = 0;
  public fileName: string = '';

  constructor(private http: HttpClient,
    private productoService: ProductoService,
    public dialog: MatDialog) {
    this.http = http;
    this.obtenerEstatus();
    this.obtenerCategorias();
  }

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.estatus = new Estatus();
    this.producto.categoria = new Categoria();
  }

  add() {
    console.log(this.producto);
    this.subiraArchivo(this.file);
  }

  nuevoProducto() {
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

  obtenerEstatus() {
    this.http.get<Estatus[]>(this.apiUrlEstatus).subscribe(
      result => {
        this.estatus = result;
        console.log(this.estatus);
      }, error => console.error(error)
    );
  }

  obtenerCategorias() {
    this.http.get<Categoria[]>(this.apiUrlCategorias).subscribe(
      result => {
        this.categorias = result;
        console.log(this.categorias);
      }, error => console.error(error)
    );
  }

  seleccionarImagen(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);
  }

  public subiraArchivo(file: File) {
    this.progress = 0;
    const postImageSubscr = this.productoService.cargarImagenProducto(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          let img: Producto = event.body;
          this.producto.imagen = img.imagen;
          return this.nuevoProducto();
        }

      }
    );
  }
}
