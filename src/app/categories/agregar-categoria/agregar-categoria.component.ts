import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { AddCategorieView } from '../../Models/Models';
import { CategoriaService } from '../../services/categoria.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {

  public categoria: AddCategorieView;

  private file: File;
  public progress: number = 0;
  public fileName: string = '';


  constructor(private http: HttpClient,
    private categoriaService: CategoriaService,
    public dialog: MatDialog) {
      this.http = http;
      this.obtenerListaOpciones();
    }

  ngOnInit(): void {
    this.categoria = new AddCategorieView();
  }

  add(){
    console.log(this.categoria);
    this.subiraArchivo(this.file);
  }
  

  nuevaCategoria() {
    this.categoriaService.addNewCategorie(this.categoria).subscribe(
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

  obtenerListaOpciones(){
    this.categoriaService.listaOpciones().subscribe(
      result => {
        this.categoria = result;
        console.log(this.categoria);
      }, error => console.error(error)
    );
  }

  seleccionarImagen(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);
  }
  
  public subiraArchivo(file: File) {
    this.progress = 0;
    const postImageSubscr = this.categoriaService.cargarImagenCategoria(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          let img: AddCategorieView = event.body;
          this.categoria.imagen = img.imagen;
          return this.nuevaCategoria();
        }

      }
    );
  }

}
