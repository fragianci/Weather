import { Injectable } from '@angular/core';

interface Temp {
    day: number;
    diff: number;
}

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    colderT: number;

    // Estrae l'array con le temperature piu alte
    takeTemp(weather: any){
        let hotTemp = 0;
        let coldTemp = 0;
        let day = 0;
        let colIndex = 0;
        let temp: Temp[] = [];
        let rowIndex = 1;
        weather.split(" ").map(x => {
            if((x.match(/\d/g) && !x.match(/1HrP/g)) || x.match(/mo/g)){
                colIndex++;
            }
            if(colIndex == 1 && x != ""){
                day = +(x.match(/\d+/));
            }
            if(colIndex == 2 && x != ""){
                if(x.match(/..(?=(\*))/g)){
                    hotTemp = +(x.match(/..(?=(\*))/g));
                } else{
                    hotTemp = +(x);
                }
            }
            if(colIndex == 3 && x != ""){
                if(x.match(/..(?=(\*))/g)){
                    coldTemp = +(x.match(/..(?=(\*))/g));
                } else{
                    coldTemp = +(x);
                }
            }
            if(hotTemp && coldTemp) {
                let diff = hotTemp - coldTemp;
                let objTemp = {day, diff};
                temp.push(objTemp);
                hotTemp = 0;
                coldTemp = 0;
            }
            if(x.match(/\d{4}/g)){
                rowIndex++;
                colIndex = 0;
            }
        })
        console.log(temp)
        let myTemp = this.minTDay(temp);
        return myTemp;
    }

    // Estrae l'escursione termica piu piccola
    minTDay(temp: Temp[]){
        let i = 0
        this.colderT = temp[0].diff;
        temp.forEach((t)=>{
            if(t.diff < this.colderT){
                this.colderT = t.diff;
                i = t.day;
            }
        })
        return {day: i, diff: this.colderT};
    }



}