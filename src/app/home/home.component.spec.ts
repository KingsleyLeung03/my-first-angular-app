import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HousingService } from '../housing.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [HousingService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter location list by city', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
  
    component.housingLocationList = [
      { id: 1, name: 'Test1', city: 'TestCity', state: 'TestState', photo: 'test.jpg', availableUnits: 1, wifi: true, laundry: false },
      { id: 2, name: 'Other1', city: 'OtherCity', state: 'OtherState', photo: 'other.jpg', availableUnits: 2, wifi: false, laundry: true },
    ];
  
    fixture.detectChanges();
  
    component.filterResults('TestCity');
    expect(component.filteredLocationList.length).toBe(1);
    expect(component.filteredLocationList[0].city).toEqual('TestCity');
  });
});
