import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let housingService: HousingService;

  const mockHousingLocation: HousingLocation = {
    id: 1,
    name: 'Test House',
    city: 'Test City',
    state: 'Test State',
    photo: 'test.jpg',
    availableUnits: 5,
    wifi: true,
    laundry: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DetailsComponent, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 1 },
            },
          },
        },
        {
          provide: HousingService,
          useValue: {
            getHousingLocation: jasmine.createSpy('getHousingLocation').and.returnValue(Promise.resolve(mockHousingLocation)),
            submitApplication: jasmine.createSpy('submitApplication')
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    housingService = TestBed.inject(HousingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch housing location details on init', fakeAsync(() => {
    tick();
    expect(housingService.getHousingLocation).toHaveBeenCalledWith(1);
    expect(component.housingLocation).toEqual(mockHousingLocation);
  }));

  it('should display housing location details', fakeAsync(async() => {
    tick();
    fixture.detectChanges();

    const deferBlock = (await fixture.getDeferBlocks())[0];
    await deferBlock.render(2);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.listing-heading')?.textContent).toContain('Test House');
    expect(compiled.querySelector('.listing-location')?.textContent).toContain('Test City, Test State');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe('test.jpg');
    expect(compiled.querySelector('img')?.getAttribute('alt')).toBe('Exterior photo of Test House');
    expect(compiled.querySelector('li:nth-child(1)')?.textContent).toContain('Units available: 5');
    expect(compiled.querySelector('li:nth-child(2)')?.textContent).toContain('Does this location have wifi: true');
    expect(compiled.querySelector('li:nth-child(3)')?.textContent).toContain('Does this location have laundry: false');
  }));

  it('should call submitApplication on form submit', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';

    component.applyForm.patchValue({ firstName, lastName, email });
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(housingService.submitApplication).toHaveBeenCalledWith(firstName, lastName, email);
  });

  it('should have form controls', () => {
    expect(component.applyForm.get('firstName')).toBeTruthy();
    expect(component.applyForm.get('lastName')).toBeTruthy();
    expect(component.applyForm.get('email')).toBeTruthy();
  });

});
