import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MetricFormValidators {
    static DeliveryOnTimeLimitValidator(limitStr: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if(!(/^[\d]*$/ig).test(control.value)){
                return {
                    [limitStr + 'Error']: `${limitStr}  value shoule be number`
                }
            }
            if(control.value > 365 || control.value < 0){
                return {
                    [limitStr + 'Error']: `${limitStr}  value shoule be 0 - 365 days`
                }
            }
            return null
        }
    }

    static DeliveryInfullMaxValidator(limitStr: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if(control.value > 100 || control.value < 0){
                return {
                    [limitStr + 'Error']: `${limitStr}  value shoule be 0 - 100`
                }
            }
            return null
        }
    }
}