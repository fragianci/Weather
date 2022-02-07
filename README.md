# Weather

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

# What it does?

With the button 'Upload' the weather.dat file get uploaded from the assets folder and on the app-component.ts we access the data with the HttpClient of HttpClientModule which is also how we handle the eventual error

In the WeatherService the file data can be elaborated through the use of regular expression.
Thanks to reg ex we run over the data (which is a long string) like a matrix with rowIndex and colIndex and we estract only the temperatures that we are willing to take

