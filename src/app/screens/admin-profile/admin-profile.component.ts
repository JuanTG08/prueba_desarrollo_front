import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminProfileService } from './admin-profile.service';
import { Router } from '@angular/router';
import { IResponse } from '../../shared/interfaces/IResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogAccessComponent } from './dialog-access/dialog-access.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  rolesList: any;
  pagesListFront: any;
  pagesListBack: any;

  /* Tables */
  displayedColumnsAll: string[] = ['#', 'name', 'method', 'checked', 'edit'];
  dataSorceFront!: MatTableDataSource<any>;
  dataSorceBack!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AdminProfileService,
    private route: Router,
    private dialog: MatDialog,
    private _snack: MatSnackBar
  ) {}

  async ngOnInit() {
    // Obtenemos todos los roles
    await this.service
      .getAllRoles()
      .then((res: IResponse) => {
        if (res.error || !res.payload || res.payload.length <= 0)
          return this.route.navigate(['/home']);
        this.rolesList = res.payload;
      })
      .catch((err) => this._snack.open('Error de Conexión', 'Cerrar'));

    await this.getDataAccessPage();
  }

  async getDataAccessPage() {
    // Obtenemos el listado de acceso a las paginas
    await this.service
      .getAllAccessPages()
      .then((res: IResponse) => {
        const front = res.payload
          .filter((item) => item.from == 'front')
          .sort(this.sorted);
        const back = res.payload
          .filter((item) => item.from == 'back')
          .sort(this.sorted);
        this.pagesListFront = front.length > 0 ? front : null;
        this.pagesListBack = back.length > 0 ? back : null;

        this.dataSorceFront = new MatTableDataSource(front);
        this.dataSorceBack = new MatTableDataSource(back);
      })
      .catch((err) => {
        this._snack.open('Error de Conexión', 'Cerrar');
      });
  }

  sorted(a: any, b: any) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSorceFront.filter = filterValue.trim().toLowerCase();
    this.dataSorceBack.filter = filterValue.trim().toLowerCase();

    if (this.dataSorceFront.paginator)
      this.dataSorceFront.paginator.firstPage();
    if (this.dataSorceBack.paginator) this.dataSorceBack.paginator.firstPage();
  }

  openDialogAccess(funcionality: string, access_page: any | null = null) {
    const dialogAccess = this.dialog.open(DialogAccessComponent, {
      width: '700px',
      height: '600px',
      data: { funcionality, access_page },
    });
    dialogAccess
      .afterClosed()
      .subscribe(async (result) =>
        result ? await this.getDataAccessPage() : false
      );
  }

  renderSelectCheckbox(rolePath: any, access_page: any): boolean {
    return rolePath.filter(
      ([{ path, method }]) =>
        path === access_page.path && method === access_page.method
    ).length == 0
      ? false
      : true;
  }
}