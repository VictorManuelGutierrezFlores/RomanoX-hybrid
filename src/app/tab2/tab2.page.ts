import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  formulario: FormGroup;


  constructor(private alertController: AlertController) {
    this.formulario = new FormGroup({
      number: new FormControl('', Validators.required)
    });
  }
  async onSubmit() {
    let toInt: number = Number(this.formulario.value.number);
    let converted:string = decimalARomano(toInt);
    const alert = await this.alertController.create({
      header:'Número convertido',
      message:'El número ingresado en romano es '+converted,
      buttons:['Ok']
    });

    await alert.present();

  }


}

function decimalARomano(numero: number): string {
  const romansValues: string[] = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  const decimalValues: number[] = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  let decimalNumber = numero;
  let roman = ""

  for (let i = 0; i < romansValues.length; i++) {
    while (decimalNumber >= decimalValues[i]) {
      roman += romansValues[i];
      decimalNumber -= decimalValues[i];
    }
  }
  return roman
}