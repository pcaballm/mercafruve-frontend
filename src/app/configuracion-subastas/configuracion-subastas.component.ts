import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SubastaService } from '../../services/subasta.service';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { Subasta } from '../../modelos/subasta';
import { CommonFunctionsService } from '../../common/common-functions-service';

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
  constructor(
    private subastaService: SubastaService,
    private commonFunctionsService: CommonFunctionsService
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
          maxLength: 10,
        },
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
      },
      {
        dataField: 'productor',
        editorType: 'dxTextBox',
        colSpan: 2,
        editorOptions: {},
      },
      {
        dataField: 'cantidad',
        editorType: 'dxNumberBox',
        colSpan: 2,
        editorOptions: {},
      },
      {
        dataField: 'precioSalida',
        editorType: 'dxNumberBox',
        colSpan: 2,
        editorOptions: {},
      },
      {
        dataField: 'pujaMinima',
        editorType: 'dxNumberBox',
        colSpan: 2,
        editorOptions: {},
      },
      {
        dataField: 'fechaHoraLimite',
        editorType: 'dxDateBox',
        colSpan: 2,
        editorOptions: {
          type: 'datetime',
          displayFormat: 'yyyy/MM/dd HH:mm',
        },
      },
      {
        dataField: 'fechaHoraInicio',
        editorType: 'dxDateBox',
        colSpan: 2,
        editorOptions: {
          type: 'datetime',
          displayFormat: 'yyyy/MM/dd HH:mm',
        },
      },
    ];
    this.dataGrid.editing.form!.colCount = 10;
  }

  onEditingStart() {
    this.editando = true;
  }
  ngOnDestroy(): void {}
}
