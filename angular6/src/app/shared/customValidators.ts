import {AbstractControl, FormControl} from "@angular/forms";

export const CustomValidators = {
  REGEX_DATE: /^\d+[-\/]\d+[-\/]\d+/,

  validDate(control: FormControl): any {
    const today = new Date();
    if (!control.value) {
      return null;
    } else if (control.value >= today) {
      return null;
    }
    return {'invalidDate': true};
  },

  endDateAfterStartDate(c: AbstractControl): any {
    if (!c.get('startDate').value || !c.get('endDate').value) {
      return null;
    } else if (c.get('endDate').value >= c.get('startDate').value) {
      return null;
    }
    return {'invalidDate': true};
  }
};
