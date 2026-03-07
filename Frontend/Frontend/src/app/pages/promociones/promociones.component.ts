import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {

  promociones = [
    { imagen: 'promociones/promo1.jpg'},
    { imagen: 'promociones/promo2.jpg'},
    { imagen: 'promociones/promo3.jpg'},

    { imagen: 'promociones/promo4.jpg' },
    { imagen: 'promociones/promo5.jpg' },
    { imagen: 'promociones/promo6.jpg'},

    { imagen: 'promociones/promo7.jpg'},
    { imagen: 'promociones/promo8.jpg'},
    { imagen: 'promociones/promo9.jpg'},

    { imagen: 'promociones/promo10.jpg'},
    { imagen: 'promociones/promo11.jpg'},
    { imagen: 'promociones/promo12.jpg' },

    { imagen: 'promociones/promo13.jpg' },
    { imagen: 'promociones/promo14.jpg' },
    { imagen: 'promociones/promo15.jpg', titulo: '', precio: '' }
  ];

}



