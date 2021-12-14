import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing/app-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';



import { HomeComponent } from './home/home.component';
import { WomanComponent } from './categories/woman/woman.component';
import { ManComponent } from './categories/man/man.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { KidsComponent } from './categories/kids/kids.component';
import { AddProductoPopUpComponent } from './categories/woman/add-producto-pop-up/add-producto-pop-up.component';
import { ProductosComponent } from './Productos/productos/productos.component';
import { AgregarProductoComponent } from './Productos/agregar-producto/agregar-producto.component';
import { AgregarCategoriaComponent } from './categories/agregar-categoria/agregar-categoria.component';
import { CategoriasComponent } from './categories/categorias/categorias.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WomanComponent,
    ManComponent,
    NavbarMenuComponent,
    KidsComponent,
    AddProductoPopUpComponent,
    ProductosComponent,
    AgregarProductoComponent,
    AgregarCategoriaComponent,
    CategoriasComponent,
    EditarProductoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditarProductoComponent
  ]
})
export class AppModule { }
