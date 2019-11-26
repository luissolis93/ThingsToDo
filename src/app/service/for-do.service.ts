import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ContentThing } from '../interface/thing.interface';

@Injectable({
  providedIn: 'root'
})
export class ForDoService {

  private UrlGlobal="http://10.2.47.9:5000";

  constructor(private http:HttpClient) { }

  public PostThing(thing){
    let url = `${this.UrlGlobal}/v1/things`
    return this.http.post(url,thing);
  }

  public GetThings():Observable<Object>{
    let url = `${this.UrlGlobal}/v1/things`
    return this.http.get(url);
  }

  public PutThing(thing:ContentThing){
    let url= `${this.UrlGlobal}/v1/things/${thing._id}`
    return this.http.put(url,thing);
  }

  public DeleteThing(thingID){
    let url= `${this.UrlGlobal}/v1/things/${thingID}`
    return this.http.delete(url);
  }






}
