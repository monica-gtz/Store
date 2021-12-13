import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { AddCategorieView } from '../Models/Models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrlCategorias: string = "https://localhost:5001/api/Categorias";
  private apiUrlAddNewCategorie: string = "https://localhost:5001/api/Categorias/addCategorieNew";
  private apiUrlListaEstatus: string = "https://localhost:5001/api/Categorias/GetAddCategorie";
  private apiUrlCategoriaImagen: string = "https://localhost:5001/api/Productos/Image";
  private apiUrlImageServer: string = "https://localhost:5001";

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<AddCategorieView[]>(this.apiUrlCategorias);
  }

  listaOpciones(){
    return this.http.get<AddCategorieView>(this.apiUrlListaEstatus);
  }

  addNewCategorie(newCategorie: AddCategorieView){
    return this.http.post<AddCategorieView>(this.apiUrlAddNewCategorie, newCategorie);
  }

  //Servicio para guardar imagen al servidor
  cargarImagenCategoria(file: File): Observable<HttpEvent<AddCategorieView>> {
    if (!file)
      return;
    const formData = new FormData();
    formData.append(file.name, file); //Agrega el archivo al formulario

    const uploadReq = new HttpRequest('POST',
      this.apiUrlCategoriaImagen, formData, {
      reportProgress: true
    });                         

    return this.http.request<AddCategorieView>(uploadReq);
  }
  getImageUrl(fileName: string): string {
    return this.apiUrlImageServer + fileName;
  }
}
