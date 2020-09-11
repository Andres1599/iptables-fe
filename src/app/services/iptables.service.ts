import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IptablesService {

  constructor(
    private http: HttpClient
  ) { }

  getRules(): Observable<any> {
    return this.http.get(environment.apiBase + '/iptables/');
  }

  getRulesOut(): Observable<any> {
    return this.http.get(environment.apiBase + '/iptables/out');
  }

  getRulesFor(): Observable<any> {
    return this.http.get(environment.apiBase + '/iptables/for');
  }

  getInterfaces(): Observable<any> {
    return this.http.get(environment.apiBase + '/interfaces/');
  }

  newRule(data: any): Observable<any> {
    return this.http.post(environment.apiBase + '/iptables/', data);
  }

  editRule(data: any): Observable<any> {
    return this.http.put(environment.apiBase + '/iptables/', data);
  }

  deleteRule(data: any): Observable<any> {
    return this.http.post(environment.apiBase + '/iptables/delete/', data);
  }
}
