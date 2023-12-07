import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
 
    showSuccessPrompt(message: string) {
        Swal.fire({
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    showWarningPrompt(message: string) {
        Swal.fire({
            icon: "warning",
            title: message,
            showConfirmButton: true,
        });
    }

    showErrorPrompt(message: string) {
        Swal.fire({
            icon: "error",
            title: message,
            showConfirmButton: true,
        });
    }

    showInfoPrompt(message: string) {
        Swal.fire({
            icon: "info",
            title: message,
            showConfirmButton: true,
        });
    }

    showList(type, d){
        Swal.fire({
            title: type,
            html: "<div id='save-popup-message'></div>",
            confirmButtonText: "Ok",
         });
        let popupTextElement = document.getElementById("save-popup-message");
        d.forEach(val => popupTextElement.innerHTML = popupTextElement.innerHTML + "<h1 class='name-display'>" + val + "</h1>");
        
    }
  
}


