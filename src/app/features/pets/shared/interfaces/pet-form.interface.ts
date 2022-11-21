import { FormControl } from '@angular/forms';

export interface PetForm {
  id: FormControl<string>;
  name: FormControl<string>;
  breed: FormControl<string>;
  color: FormControl<string>;
  sexo: FormControl<string>;
  specie: FormControl<string>;
  ownerid: FormControl<string>;
}
