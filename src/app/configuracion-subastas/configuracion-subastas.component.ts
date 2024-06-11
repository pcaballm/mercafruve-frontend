import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SubastaService } from '../../services/subasta.service';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subasta } from '../../models/subasta';
import { CommonFunctionsService } from '../../helpers/common-functions-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracion-subastas',
  templateUrl: './configuracion-subastas.component.html',
  styleUrl: './configuracion-subastas.component.scss',
  providers: [CommonFunctionsService, SubastaService],
})
export class ConfiguracionSubastasComponent implements OnInit, OnDestroy {
  @ViewChild('dataGrid')
  dataGrid!: DxDataGridComponent;
  public dataSource: any;
  private productoViejoActualizar: any;
  editando: boolean = false;
  fechaHoraInicio: any;
  fechaHoraLimite: any;
  constructor(
    private subastaService: SubastaService,
    private commonFunctionsService: CommonFunctionsService,
    private authService: AuthService
  ) {
    this.dataSource = new CustomStore({
      key: this.getDataSourceKey(),
      loadMode: 'raw',
      load: () => this.sendRequestFind(),
      insert: (values) => this.sendRequestInsert(values),
      update: (key, values) =>
        this.sendRequestUpdate(Object.assign({ id: key }, values)),
      remove: (key) => this.sendRequestDelete(key),
    });
  }
  ngOnInit(): void {}
  sendRequestFind() {
    return this.subastaService
      .obtenerTodos()
      .toPromise()
      .then((data) => data);
  }
  sendRequestInsert(values: any) {
    let productor: any = this.authService.getDatosToken()?.sub;
    return this.subastaService
      .insertarSubasta(values)
      .toPromise()
      .then()
      .catch((err) => '')
      .finally(() => {
        this.dataGrid.instance.cancelEditData();
        // this.dataGrid.instance.refresh();
        this.dataSource.load();
      });
  }

  sendRequestUpdate(values: Subasta) {
    let productor: any = this.authService.getDatosToken()?.sub;
    values = this.commonFunctionsService.combineObjects(
      this.productoViejoActualizar,
      values
    );
    return this.subastaService
      .editarSubasta(values)
      .toPromise()
      .then()
      .catch((err) => console.log(err))
      .finally(() => {
        this.dataGrid.instance.cancelEditData();
        this.dataGrid.instance.refresh();
      });
  }

  sendRequestDelete(key: any) {
    return this.subastaService
      .deleteSubasta(key)
      .toPromise()
      .then()
      .finally(() => this.dataGrid.instance.refresh());
  }
  getDataSourceKey(): any {
    return 'id';
  }

  onInitialized() {
    this.dataGrid.editing.form!.items = [
      {
        dataField: 'nombre',
        editorType: 'dxTextBox',
        colSpan: 2,
        editorOptions: {
          maxLength: 20,
        },
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'descripcion',
        editorType: 'dxTextBox',
        colSpan: 4,
        editorOptions: {
          maxLength: 254,
        },
      },
      {
        dataField: 'producto',
        editorType: 'dxTextBox',
        colSpan: 1,
        editorOptions: {},
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'cantidad',
        editorType: 'dxNumberBox',
        colSpan: 2,
        editorOptions: {},
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'precioSalida',
        editorType: 'dxNumberBox',
        colSpan: 2,
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'pujaMinima',
        editorType: 'dxNumberBox',
        colSpan: 2,
        editorOptions: {},
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'fechaHoraInicio',
        editorType: 'dxDateBox',
        colSpan: 2,
        editorOptions: {
          type: 'datetime',
          displayFormat: 'yyyy/MM/dd HH:mm',
        },
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
      {
        dataField: 'fechaHoraLimite',
        editorType: 'dxDateBox',
        colSpan: 2,
        editorOptions: {
          type: 'datetime',
          displayFormat: 'yyyy/MM/dd HH:mm',
        },
        validationRules: [{ type: 'required', message: 'Campo obligatorio.' }],
      },
    ];
    this.dataGrid.editing.form!.colCount = 10;
  }

  onEditingStart() {
    this.editando = true;
  }

  onEditorPreparing(e: any) {
    console.log('onEditorPreparing');
    if (e.parentType === 'dataRow' && e.dataField === 'fechaHoraInicio') {
      this.fechaHoraInicio = e.value;
    }
    if (e.parentType === 'dataRow' && e.dataField === 'fechaHoraLimite') {
      this.fechaHoraLimite = e.value;
    }
    if (e.parentType === 'dataRow' && e.dataField === 'nombre') {
      if (e.editorOptions.value !== '') {
        e.editorOptions.disabled = true;
      }
    }
  }

  customizePrice = (cellInfo: any) => {
    return `${cellInfo.value} €`;
  };

  onRowUpdating(event: any) {
    console.log('se va a actualizar', event);
    this.productoViejoActualizar = event.oldData;
  }
  ngOnDestroy(): void {}
}
