import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Producto, AddProductView } from '../Models/Models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrlProducto: string = "https://localhost:5001/api/Productos";
  private apiUrlProductoImagen: string = "https://localhost:5001/api/Productos/Image";
  private apiUrlImageServer: string = "https://localhost:5001";
  private apiUrlListaOpciones: string = "https://localhost:5001/api/Productos/GetAddProductNew";
  private apiUrlAddNewProduct: string = "https://localhost:5001/api/Productos/addProductNew";

  private updateForm = new BehaviorSubject<Producto>({} as any);
  private isLoadingSubject: BehaviorSubject<boolean>;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<AddProductView[]>(this.apiUrlProducto);
  }

  listaOpciones(){
    return this.http.get<AddProductView>(this.apiUrlListaOpciones);
  }

  addNewProduct(newProduct: AddProductView){
    return this.http.post<AddProductView>(this.apiUrlAddNewProduct, newProduct);
  }
  //Servicio para guardar imagen al servidor
  cargarImagenProducto(file: File): Observable<HttpEvent<AddProductView>> {
    if (!file)
      return;
    const formData = new FormData();
    formData.append(file.name, file); //Agrega el archivo al formulario

    const uploadReq = new HttpRequest('POST',
      this.apiUrlProductoImagen, formData, {
      reportProgress: true
    });                         

    return this.http.request<AddProductView>(uploadReq);
  }
  getImageUrl(fileName: string): string {
    return this.apiUrlImageServer + fileName;
  }
}
