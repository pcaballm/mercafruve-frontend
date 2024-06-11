import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridsEditMode } from 'devextreme/common/grids';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';
import { DomSanitizer } from '@angular/platform-browser';
import {
  DxDataGridComponent,
  DxFileUploaderComponent,
} from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-configuracion-productos',
  templateUrl: './configuracion-productos.component.html',
  styleUrl: './configuracion-productos.component.scss',
})
export class ConfiguracionProductosComponent implements OnInit, OnDestroy {
  @ViewChild('dataGrid')
  dataGrid!: DxDataGridComponent;
  @ViewChild('fileUploader', { static: false })
  fileUploader!: DxFileUploaderComponent;
  public dataSource: any;
  editando = false;
  columns = ['name', 'age'];
  editingSettings = {
    mode: 'form' as GridsEditMode, // Uso de casting para asegurar el tipo correcto
    allowUpdating: true,
    allowAdding: true,
    allowDeleting: true,
  };
  retryButtonVisible = false;
  private productoViejoActualizar: any;
  private file: any;

  constructor(
    private productosService: ProductosService,
    private sanitizer: DomSanitizer,
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
  sendRequestFind() {
    return this.productosService
      .obtenerTodos()
      .toPromise()
      .then((data) => {
        data.map((d: Producto) => {
          this.productosService.obtenerImagen(d.imagen).subscribe((data) => {
            const objectURL = URL.createObjectURL(data);
            d.imagenCargada = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          });
        });
        return data;
      });
  }
  sendRequestInsert(values: any) {
    let productor: any = this.authService.getDatosToken()?.sub;
    return this.productosService
      .insertarProducto(
        values.nombre,
        values.descripcion,
        values.precio,
        productor,
        values.tipo,
        this.file
      )
      .toPromise()
      .then()
      .catch((err) => '')
      .finally(() => {
        this.dataGrid.instance.cancelEditData();
        // this.dataGrid.instance.refresh();
        this.dataSource.load();
      });
  }

  sendRequestUpdate(values: Producto) {
    values = this.combineObjects(this.productoViejoActualizar, values);
    let productor: any = this.authService.getDatosToken()?.sub;
    return this.productosService
      .editarProducto(
        values.nombre,
        values.descripcion,
        values.precio,
        productor,
        values.tipo,
        this.file
      )
      .toPromise()
      .then()
      .catch((err) => console.log(err))
      .finally(() => {
        this.dataGrid.instance.cancelEditData();
        this.dataGrid.instance.refresh();
      });
  }

  sendRequestDelete(key: any) {
    return this.productosService
      .deleteProducto(key)
      .toPromise()
      .then()
      .finally(() => this.dataGrid.instance.refresh());
  }

  ngOnInit() {
    // this.obtenerProductos();
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
        dataField: 'precio',
        editorType: 'dxNumberBox',
        colSpan: 1,
        editorOptions: {},
      },
      {
        dataField: 'tipo',
        editorType: 'dxTextBox',
        colSpan: 2,
        editorOptions: {},
      },
      {
        dataField: 'imagen',
        colSpan: 2,
        template: 'editImageTemplate',
        editorOptions: {
          disabled: true,
        },
      },
    ];
    this.dataGrid.editing.form!.colCount = 10;
  }
  onEditorPreparing(event: any) {
    if (event.parentType === 'dataRow' && event.dataField === 'nombre') {
      if (event.editorOptions.value !== '') {
        event.editorOptions.disabled = true;
      }
    }
    if (
      event.parentType === 'dataRow' &&
      event.dataField === 'productor' &&
      this.editando
    ) {
      if (event.editorOptions.value !== '') {
        event.editorOptions.disabled = true;
      }
      this.editando = false;
    }
  }
  onEditingStart() {
    this.editando = true;
  }

  ngOnDestroy(): void {}

  getDataSourceKey(): any {
    return 'id';
  }
  onValueChangedImage(e: any): void {
    const reader: FileReader = new FileReader();
    reader.onload = (args) => {
      if (typeof args.target?.result === 'string') {
        // this.uploadedImageRef.src = args.target.result;
      }
    };
    reader.readAsDataURL(e.value![0]); // convert to base64 string
  }

  onClick(e: any): void {
    // The retry UI/API is not implemented. Use the private API as shown at T611719.
    // const fileUploaderInstance = this.fileUploaderRef.instance;
    // @ts-ignore
    for (let i = 0; i < fileUploaderInstance._files.length; i++) {
      // @ts-ignore
      delete fileUploaderInstance._files[i].uploadStarted;
    }
    // fileUploaderInstance.upload();
  }
  onUploadErrorImage(e: any): void {
    const xhttp = e.request;
    if (xhttp.status === 400) {
      e.message = e.error.responseText;
    }
    if (xhttp.readyState === 4 && xhttp.status === 0) {
      e.message = 'Connection refused';
    }
    this.retryButtonVisible = true;
  }

  onEditCanceled(e: any): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }

  onSaved(e: any): void {
    if (this.retryButtonVisible) {
      this.retryButtonVisible = false;
    }
  }

  onUploadedImage(e: any, cellInfo: any): void {
    // cellInfo.setValue('images/employees/' + e.request.responseText);
    this.file = e.file;

    this.retryButtonVisible = false;
  }

  loadImage(fileName: string) {
    this.productosService.obtenerImagen(fileName);
  }

  editRow(data: any) {
    this.dataGrid.instance.editRow(data.rowIndex);
  }

  onRowUpdated(event: any) {}

  onRowUpdating(event: any) {
    this.productoViejoActualizar = event.oldData;
  }

  private combineObjects(obj1: any, obj2: any) {
    let result: any = {};

    for (let key in obj1) {
      if (obj2.hasOwnProperty(key) && obj2[key] !== null) {
        result[key] = obj2[key];
      } else {
        result[key] = obj1[key];
      }
    }
    return result;
  }
}
