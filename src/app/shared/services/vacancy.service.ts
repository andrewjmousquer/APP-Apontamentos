import { Injectable } from '@angular/core';
import { FavoriteJob } from '../models/favorite-job.model';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class VacancyService {
  constructor(private http: DefaultHttpService) { }

  getFavoriteJob(data) {
    return this.http.post<FavoriteJob[]>(`/protected/favorite-job/search`, data);
  }

  saveFavoriteJob(data) {
    return this.http.post<FavoriteJob>(`/protected/favorite-job/save`, data);
  }

  removeFavoriteJob(id) {
    return this.http.delete<Boolean>(`/protected/favorite-job/` + id);
  }

}