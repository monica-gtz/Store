import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Producto } from '../Models/Models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrlProducto: string = "https://localhost:5001/api/Productos";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllProductos() {
    return this.http.get<Producto[]>(this.apiUrlProducto);
  }

  addNewProducto(newProducto: Producto){
    return this.http.post<Producto>(this.apiUrlProducto, newProducto);
  }
}
