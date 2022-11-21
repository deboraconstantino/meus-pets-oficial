import { FormControl } from "@angular/forms";

export interface OwnerForm {
  id: FormControl<string>;
  name: FormControl<string>;
  rg: FormControl<string>;
  cpf: FormControl<string>;
  email: FormControl<string>;
  tel1: FormControl<string>;
  tel2: FormControl<string>;
}
