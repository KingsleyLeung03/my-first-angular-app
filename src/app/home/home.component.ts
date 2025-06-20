import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';

import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((HousingLocationList: HousingLocation[]) => {
      this.housingLocationList = HousingLocationList;
      this.filteredLocationList = HousingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => 
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
