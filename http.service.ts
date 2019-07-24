import {Injectable} from '@angular/core';

// npm install @angular/http  --save
import { debounceTime, filter, map,switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// configure headers
const httpOptions = {
    headers: new HttpHeaders(
        { 'Content-Type': 'application/json'})
};

@Injectable({providedIn:'root'})
export class HttpService {    
    constructor(private http:HttpClient) {
        console.log("Http Service injected")
    }
  
    base_url='http://localhost:3000'

    // Uses http.get() to load data from a single API endpoint
    getFoods():any{      
        return this.http.get(this.base_url+'/api/food')
        .pipe(debounceTime(5000))        
        .pipe(filter(response =>response != undefined ))
        .pipe(map((response:any) => {
            console.log(response);
             return response
        })) 
    }

    // send a POST request to the API to create a new data object
    createFood(food) {
        let body = JSON.stringify(food);
        return this.http.post(this.base_url+'/api/food/', body, httpOptions);
    }
    // send a PUT request to the API to update a data object
    updateFood(food) {
        let body = JSON.stringify(food);
        return this.http.put(
            this.base_url+'/api/food/' + food.id, body, httpOptions);
    }
    // send a DELETE request to the API to delete a data object
    deleteFood(food) {
        return this.http.delete(this.base_url+'/api/food/' + food.id);
    }
}//end


