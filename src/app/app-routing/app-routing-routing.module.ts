import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KidsComponent } from '../categories/kids/kids.component';
import { ManComponent } from '../categories/man/man.component';
import { WomanComponent } from '../categories/woman/woman.component';
import { HomeComponent } from '../home/home.component';
import { ProductosComponent } from '../Productos/productos/productos.component'

export const routes: Routes = [
  { path: '', component:HomeComponent, pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'woman', component: WomanComponent},
  { path: 'man', component: ManComponent},
  { path: 'kids', component: KidsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
