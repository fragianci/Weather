import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Weather';
  weather: any;
  mySubscription: Subscription
  myTemp: any;
  myError: string;

  constructor(
    private weatherService: WeatherService,
    private httpClient: HttpClient
    ){}

  uploadFile(){
    this.mySubscription = this.httpClient.get('assets/weather.dat', { responseType: 'text' }).subscribe(
      data => {
        this.weather = JSON.stringify(data);
        this.myTemp = this.weatherService.takeTemp(this.weather);
      },
      error => {
        console.log(error)
        this.myError = "Whoops. File not found";
      },
      () => console.log("Subscription suceeded")
    );

    
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }



}
