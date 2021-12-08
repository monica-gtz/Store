import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Producto } from '../Models/Models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrlProducto: string = "https://localhost:5001/api/Productos";
  private apiUrlProductoImagen: string = "https://localhost:5001/api/Productos/Image";
  private apiUrlImageServer: string = "https://localhost:5001";
  private apiUrlProductoCateogira: string = "https://localhost:5001/api/ProductoCategorias"

  private updateForm = new BehaviorSubject<Producto>({} as any);
  private isLoadingSubject: BehaviorSubject<boolean>;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllProductos() {
    return this.http.get<Producto[]>(this.apiUrlProducto);
  }

  addNewProducto(newProducto: Producto) {
    return this.http.post<Producto>(this.apiUrlProducto, newProducto);
  }

  //Servicio para guardar imagen al servidor
  cargarImagenProducto(file: File): Observable<HttpEvent<Producto>> {
    if (!file)
      return;
    const formData = new FormData();
    formData.append(file.name, file); //Agrega el archivo al formulario

    const uploadReq = new HttpRequest('POST',
      this.apiUrlProductoImagen, formData, {
      reportProgress: true
    });

    return this.http.request<Producto>(uploadReq);
  }
  getImageUrl(fileName: string): string {
    return this.apiUrlImageServer + fileName;
  }
}
