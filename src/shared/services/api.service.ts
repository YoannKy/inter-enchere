import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryParam } from '@/shared/models/model';

const BASE_URL = 'http://localhost:3000';

export default class ApiService {
  static list<T>(
    resource: string,
    Type: (new (args: any) => T),
    params: QueryParam[] = [],
  ): Observable<T[]> {
    const query = ApiService.formatQuery(resource, params);
    return from(
      fetch(`${BASE_URL}/${query}`).then((response) => {
        if (response.status > 299) {
          return [];
        }
        return response.json();
      }),
    )
      .pipe(
        map((entities: any[]) => entities.map((entity: any) => new Type(entity))),
      );
  }

  static post<T>(resource: string, Type: (new (args: any) => T), body: any): Observable<T> {
    return from(
      fetch(`${BASE_URL}/${resource}`,
        {
          body: JSON.stringify(body),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json()),
    ).pipe(
      map((entity: any) => new Type(entity)),
    );
  }

  static formatQuery(resource: string, queryParams: QueryParam[]): string {
    return queryParams.reduce((queryParamAcc: string, param) => `${queryParamAcc}${param.name}=${param.value}`, queryParams.length ? `${resource}?` : `${resource}`);
  }
}
