import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersFormComponent } from './filters-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LIGHT_PARAMS,
  EnumLight,
  COLOR_PARAMS,
  EnumColor,
  FORMAT_PARAMS,
  EnumFormat,
  FLOWER_PARAMS,
  EnumFlower
} from '~types/product';
import { IFiltersFormData } from './types';

describe('FiltersFormComponent', () => {
  let component: FiltersFormComponent;
  let fixture: ComponentFixture<FiltersFormComponent>;

  const filtersDefaultData: IFiltersFormData = {
    light: {
      [LIGHT_PARAMS[EnumLight.gentle]]: false,
      [LIGHT_PARAMS[EnumLight.bright]]: false
    },
    color: {
      [COLOR_PARAMS[EnumColor.white]]: false,
      [COLOR_PARAMS[EnumColor.yellow]]: false,
      [COLOR_PARAMS[EnumColor.green]]: false,
      [COLOR_PARAMS[EnumColor.red]]: false,
      [COLOR_PARAMS[EnumColor.orange]]: false,
      [COLOR_PARAMS[EnumColor.pink]]: false
    },
    format: {
      [FORMAT_PARAMS[EnumFormat.bouquet]]: false,
      [FORMAT_PARAMS[EnumFormat.vase]]: false,
      [FORMAT_PARAMS[EnumFormat.envelope]]: false,
      [FORMAT_PARAMS[EnumFormat.basket]]: false,
      [FORMAT_PARAMS[EnumFormat.hatbox]]: false,
      [FORMAT_PARAMS[EnumFormat.box]]: false
    },
    price: {
      from: 0,
      to: 1000
    },
    flower: {
      [FLOWER_PARAMS[EnumFlower.alstroemeria]]: false,
      [FLOWER_PARAMS[EnumFlower.anthurium]]: false,
      [FLOWER_PARAMS[EnumFlower.asparagus]]: false,
      [FLOWER_PARAMS[EnumFlower.astilba]]: false,
      [FLOWER_PARAMS[EnumFlower.astrance]]: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersFormComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersFormComponent);
    component = fixture.componentInstance;
    component.filtersData = filtersDefaultData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
