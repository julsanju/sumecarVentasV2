
import { Component,  ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Usuarios } from '../../Interfaces/usuarios';
import { HttpHeaders } from '@angular/common/http';
import { Imagen } from '../../Interfaces/imagen';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
@Component({
  selector: 'app-register-sales',
  templateUrl: './register-sales.component.html',
  styleUrls: ['./register-sales.component.css']
})
export class RegisterSalesComponent {
  currentStep:number = 0;
  @ViewChild('fileInput') fileInput: ElementRef;
  datosCompletos: boolean = false;
  isSelectActive: boolean = false;
  registrationForm: FormGroup;
  selectedValue: Usuarios[] | undefined;
  formData = new FormData();
  uploadedImage!: File;
  imagenForm: FormGroup;

  users = [
    {value: 'cliente', viewValue: 'Cliente'}
  ];

  cardStates = {
    card1: true,
    card2: true,
    card3: true
  };

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
    this.fileInput = new ElementRef(null);

    this.imagenForm = this.formBuilder.group({
      imagen: [null] // Este FormControl se asocia con el input de tipo "file"
    });

    this.registrationForm = this.formBuilder.group({
      Identificacion: ['', Validators.required],
      Rol: ['', Validators.required],
      Nombre: ['', Validators.required],
      Ubicacion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Correo: ['', [Validators.required, Validators.email]],
      Usuario: ['', Validators.required],
      Contrasena: ['', Validators.required],

    });
  }

  /*Eventos par el manejo de cards*/
  /*nextStep() {
    if (this.currentStep < 4) { // Cambiar a 4 si hay más pasos
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }*/

  nextStep() {
    if (this.currentStep < 4) { // Cambiar a 4 si hay más pasos
      this.currentStep++;
      this.closeCurrentCard(); // Cierra la card actual
    }
  }
  
  closeCurrentCard() {
    switch (this.currentStep) {
      case 2:
        this.cardStates.card1 = false;
        break;
      case 3:
        this.cardStates.card2 = false;
        break;
      case 4:
        this.cardStates.card3 = false;
        break;
    }
  }

  onSubmit() {
    //if (this.registrationForm.valid) {
      const userData: Usuarios = this.registrationForm.value;

      // Llamada al servicio para registrar al usuario
      this.registerService.registerUser(userData).subscribe(
        response => {
          console.log(response);
          console.log("Registro exitoso");
        },
        error => {
          console.error("Error:", error);
          console.log(error.error)
          console.log("Error en el registro");
        },
        
      );
    //}
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Convierte el archivo a un arreglo de bytes (byte[])
      const imageByteArray = new Uint8Array(e.target?.result as ArrayBuffer);

      // Luego, puedes asignar este arreglo de bytes al campo 'imagen' en tu formulario
      this.imagenForm.get('imagen')?.setValue(imageByteArray);
    };

    reader.readAsArrayBuffer(file);
  }
  }
  

  uploadImage() {
    if (this.imagenForm.valid) {
      const formData = new FormData();
      formData.append('imageFile', this.imagenForm.get('imagen')?.value); // Cambia 'FileName' a 'imageFile'
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data' // Cambia 'image/jpeg' a 'multipart/form-data'
        })
      };
  
      this.registerService.agregarImagen(formData, httpOptions).subscribe(
        (response) => {
          console.log(response);
          console.log("Registro exitoso");
        },
        (error) => {
          console.error("Error:", error);
          console.log(error.error)
          console.log("Error en el registro");
        }
      );
    }
  }

  toggleSelect() {
    this.isSelectActive = !this.isSelectActive;
  }

  //abrir explorador de archivos
  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }
  

  
}

