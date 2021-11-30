import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProductoPopUpComponent } from '../woman/add-producto-pop-up/add-producto-pop-up.component'

@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})
export class WomanComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addProducto() {
    this.dialog.open(AddProductoPopUpComponent);
  }
}
