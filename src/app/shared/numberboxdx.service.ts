import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberboxdxService {

  constructor() { }

    // DevExtreme
    selectNumber(e) {
        let inp = e.element.querySelector("input.dx-texteditor-input"); 
        if (inp) {
            inp.addEventListener('focus', function (event) {
                inp.select();
            });
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
    }
}
