import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HousingLocationComponent } from './housing-location.component';
import { HousingLocation } from '../housinglocation';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { CommonModule } from '@angular/common';

describe('HousingLocationComponent', () => {
  let component: HousingLocationComponent;
  let fixture: ComponentFixture<HousingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HousingLocationComponent],
      providers: [
        provideRouter(routes)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingLocationComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display housing location details', () => {
    const mockHousingLocation: HousingLocation = {
      id: 1,
      name: 'Test House',
      city: 'Test City',
      state: 'Test State',
      photo: 'test.jpg',
      availableUnits: 5,
      wifi: true,
      laundry: false
    };
    component.housingLocation = mockHousingLocation;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.listing-heading')?.textContent).toContain('Test House');
    expect(compiled.querySelector('.listing-location')?.textContent).toContain('Test City, Test State');
  });

  // it('should render the image', fakeAsync(() => {
  //   const mockHousingLocation: HousingLocation = {
  //     id: 1,
  //     name: 'Test House',
  //     city: 'Test City',
  //     state: 'Test State',
  //     photo: '../../assets/angular.svg',
  //     availableUnits: 5,
  //     wifi: true,
  //     laundry: false
  //   };
  //   component.housingLocation = mockHousingLocation;
  //   fixture.detectChanges();      

  //   flush();
  //   fixture.detectChanges();

  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const image = compiled.querySelector('img');
  //   expect(image).toBeTruthy();
  //   expect(image?.getAttribute('src')).toBe('test.jpg');
  //   expect(image?.getAttribute('alt')).toBe('Exterior photo of Test House');
  // }));
  
  it('should have a link to details', () => {
    const mockHousingLocation: HousingLocation = {
      id: 1,
      name: 'Test House',
      city: 'Test City',
      state: 'Test State',
      photo: 'test.jpg',
      availableUnits: 5,
      wifi: true,
      laundry: false
    };
    component.housingLocation = mockHousingLocation;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('href')).toBe('/details/1');
    expect(link?.textContent).toBe('Learn More');
  });
});
