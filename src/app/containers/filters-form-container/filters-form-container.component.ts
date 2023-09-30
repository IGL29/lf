import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { ParamsService } from 'src/app/services/params/params.service';
import { IFormData } from 'src/app/services/params/types';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { IFiltersFormData } from '~components/filters-form/types';
import {
  LIGHT_PARAMS,
  EnumLight,
  EnumColor,
  COLOR_PARAMS,
  FORMAT_PARAMS,
  EnumFormat,
  FLOWER_PARAMS,
  EnumFlower
} from '~types/product';

@Component({
  selector: 'app-filters-form-container',
  templateUrl: './filters-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersFormContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  readonly filtersDefaultData: IFiltersFormData = {
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
      from: 1,
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

  protected initialFilterData = this.utilsService.deepClone(this.filtersDefaultData);
  protected initialFilterParams = this.paramsService.convertDataToParams(this.filtersDefaultData, {
    isRemovedEmpty: true
  });
  protected updatedFiltersData = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private paramsService: ParamsService
  ) {}

  ngOnInit(): void {
    this.subscribeToQueryParams();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToQueryParams() {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroySubject),
        map((params) => this.paramsService.convertParamsToData(params, this.initialFilterData))
      )
      .subscribe((dataFromParams) => {
        if (!dataFromParams) {
          return;
        }
        this.updatedFiltersData = dataFromParams;
      });
  }

  protected handlerResetFilters(): void {
    this.updatedFiltersData = this.initialFilterData;
  }

  protected handlerControlsValueChanged(
    this: this,
    changedFiltersData: typeof this.filtersDefaultData
  ): void {
    const dataWithoutDefault = this.paramsService.getDataWidthoutDefault(
      changedFiltersData,
      this.initialFilterData
    );
    const paramsFromForm = this.paramsService.convertDataToParams(
      <IFormData<string>>dataWithoutDefault
    );

    this.paramsService.setParams(paramsFromForm, this.initialFilterParams);
  }
}
