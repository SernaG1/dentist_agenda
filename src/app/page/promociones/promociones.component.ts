import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Promocion {
titulo: string;
precio: string;
imagen: string;
}


@Component({
selector: 'app-promociones',
standalone: true,
imports: [CommonModule],
templateUrl: './promociones.component.html',
styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {


promociones: Promocion[] = Array.from({ length: 15 }, (_, i) => ({
titulo: `Promoción ${i + 1}`,
precio: `$${(i + 1) * 50}.000`,
imagen: `https://picsum.photos/400/300?random=${i + 1}`
}));


}
