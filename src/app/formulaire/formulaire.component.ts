import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  isValid:boolean = false
  profilGroup = new FormGroup({
    user : new FormControl(''),
    password : new FormControl('')

  })

  onValidate(){
    this.isValid = !this.isValid
  }
}
