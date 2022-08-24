import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AntennaService } from './services/antenna.service';
import { IAntenna, IFilterAntenna } from '../../shared/interfaces/IAntenna';
import { IResponse } from '../../shared/interfaces/IResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAntennaComponent } from './dialog-antenna/dialog-antenna.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-antenna',
  templateUrl: './antenna.component.html',
  styleUrls: ['./antenna.component.scss'],
})
export class AntennaComponent implements OnInit {
  dataAntennas!: IAntenna[]; // Información de las antenas
  tableDataSourceAntennas!: MatTableDataSource<any>; // Establecer datos en la tabla de las antenas
  tableDisplayedColumnsAntennas: string[] = [
    'i',
    'name_device',
    'antena_type',
    'device_ip',
    'device_location',
    'actions',
  ]; // Nombres de las colomnas de la tabla antenas

  // Formulario para el filtro de la tabla de las antenas
  formFilterAntennas: FormGroup;
  // ObjectKey para la funcionalidad del filtro de la tabla de las antenas
  filterKeyAntennas: IFilterAntenna;

  selectDataAntennas: string[] = ['AccessPoint', 'Station']; // Opciones del select
  selectedOptionAntenna: string = this.selectDataAntennas[0];

  filterView: boolean = false; // Mostramos el filtro

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AntennaService,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    // Establecemos los valores de los formularios
    this.formFilterAntennas = this.fb.group({
      selectModeOperation: this.selectDataAntennas[1],
      device_ip: '',
      name_device: '',
      ssid_sectorial: '',
    });

    await this.getDataAntennas();

    this.tableDataSourceAntennas.filterPredicate = (
      record,
      filter
    ): boolean => {
      const { mode_operation, device_ip, name_device, ssid_sectorial } = JSON.parse(filter);
      let mode_operationV = true, device_ipV = true, name_deviceV = true, ssid_sectorialV = true;
      if (mode_operation) record.mode_operation === mode_operation ? (mode_operationV = true) : (mode_operationV = false);
      if (device_ip) record.device_ip === device_ip ? (device_ipV = true) : (device_ipV = false);
      if (name_device) record.name_device === name_device ? (name_deviceV = true) : (name_deviceV = false);
      if (ssid_sectorial) record.ssid_sectorial === ssid_sectorial ? (ssid_sectorialV = true) : (ssid_sectorialV = false);
      return mode_operationV && device_ipV && name_deviceV && ssid_sectorialV;
    };
    this.filterModeOperationAntennas();
  }

  setPaginationForTable() {
    this.tableDataSourceAntennas.paginator = this.paginator;
    this.tableDataSourceAntennas.sort = this.sort;
  }

  async getDataAntennas() {
    await this.service
      .getAllListAntenna()
      .then((response: IResponse) => {
        if (response.others && response.others.length > 0) {
          this.dataAntennas = response.others;
          this.tableDataSourceAntennas = new MatTableDataSource(
            this.dataAntennas
          );
          this.setPaginationForTable();
        } else {
          this._snack.open(response.message, 'Cerrar');
        }
      })
      .catch((err) => this._snack.open('Error', 'Cerrar'));
  }

  openDialogAntenna(functionality: string) {
    let dataSend;
    switch (functionality) {
      case 'create':
        dataSend = null;
        break;
      case 'edit':
        break;

      default:
        break;
    }
    const dialogAntennas = this.dialog.open(DialogAntennaComponent, {
      width: '700px',
      height: '600px',
      data: { functionality, access_point: this.dataAntennas.filter(antenna => antenna.mode_operation === 'AccessPoint') },
    });

    dialogAntennas
      .afterClosed()
      .subscribe(async (result) =>
        result ? await this.getDataAntennas() : false
      );
  }

  filterModeOperationAntennas() {
    const valueFilter = this.formFilterAntennas.get(
      'selectModeOperation'
    ).value;
    if (!valueFilter || valueFilter.length === 0) return;
    this.filterKeyAntennas = {
      ...this.filterKeyAntennas,
      mode_operation: valueFilter,
    };
    this.tableDataSourceAntennas.filter = JSON.stringify(this.filterKeyAntennas);
  }

  filterInputsAntennas(input: string) {
    let valueFilter = this.formFilterAntennas.get(input)?.value;
    if (!valueFilter || valueFilter.length === 0) {
      this.tableDataSourceAntennas.filter = JSON.stringify({...this.filterKeyAntennas, [input]: valueFilter });
    }
    this.filterKeyAntennas = { ...this.filterKeyAntennas, [input]: valueFilter }
    this.tableDataSourceAntennas.filter = JSON.stringify(this.filterKeyAntennas);
  }

  // SPAN MENU
  showFilter() {
    this.filterView = !this.filterView;
  }
}
