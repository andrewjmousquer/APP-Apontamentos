import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Cep } from '../models/cep.model';


declare let require: any;
const cepPromise = require('cep-promise');

@Injectable()
export class CepIntegrationService {
  constructor() { }

  getCep(cep: string): Observable<any> {
    const noMaskCep = cep.replace('-', '').replace('.', '');


    const subscription = from(cepPromise(noMaskCep)).pipe(
      map(this.cepExtractData),
      catchError((err) => {
        return Promise.reject(
          'Erro ao pesquisar CEP. O cep informado não existe ou o servidor estava inacessível.'
        );
      }),
      finalize(() => { })
    );
    return subscription;
  }

  private cepExtractData(body: any) {
    let result: Cep = null;
    if (body != null) {
      result = new Cep(
        body.cep,
        body.state,
        body.city,
        body.neighborhood,
        body.street
      );
    }

    return result;
  }
}
