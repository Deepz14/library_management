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

    showList(){
        const d = ["deepz", "naweewe", "sefsdfsdf", "sdfsfsfs", "sfsdfsdfsdfsdf"]
        const swal_html = `<div>${d.forEach(n => `<div>${n}<div>`)}</div>`
        Swal.fire({title:"Good Job!", html: swal_html});
    }
  
}


