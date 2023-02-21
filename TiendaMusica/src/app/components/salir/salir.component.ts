import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalirService } from 'src/app/Services/salir.service';
import { Salir } from 'src/app/interfaces/salir';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent {

}
