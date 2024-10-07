import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BalanceQueryService } from '../balance-query.service';

import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridApi } from 'ag-grid-community'; // Column Definition Type Interface
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-get-accounts',
  standalone: true,
  imports: [AgGridAngular, JsonPipe],
  templateUrl: './get-accounts.component.html',
  styleUrl: './get-accounts.component.css'
})
export class GetAccountsComponent implements OnInit {
  data: any;
  displayData = new MatTableDataSource([]);
  params: any = { 'status': 'all' };
  private gridApi!: GridApi;
  colDefs: ColDef[] = [
    {
      field: "id", pinned: 'left', width: 350, headerName: "Account ID", onCellClicked: ((e) => { this.router.navigate([`/details/${e.data.id}`]) })
    },
    { field: "status" },
    { field: "product_id" },
    { field: 'opening_timestamp', headerName: "Opened at", sort: 'desc' },


  ];

  getRowStyle(e: any) {
    console.log(e.data)
    var temp;
    if (e.data.product_id) {
      temp = e.data.product_id
    }
    else {
      temp = e.data.status
    }
    return { 'background-color': stringToColour(temp) }
  }
  pagination = true;
  paginationPageSize = 30;
  paginationPageSizeSelector = [30, 50, 100];

  constructor(private BQS: BalanceQueryService, private route: ActivatedRoute, private router: Router) {

  }

  async ngOnInit() {
    this.route.params.subscribe((re) => {
      this.params = re

      if (re['length'] === 0) {
        this.params = { 'status': 'all' }
      }
    })


    this.data = await this.BQS.getAllAccount(this.params.status,6, 100)

    // this.data = await this.data.array.forEach((element: any) => {
    //   element['opening_timestamp'] = (new Date(element['opening_timestamp'])).getUTCDate()
    //   return element
    // });
    this.data.forEach((e: any) => {

      e['opening_timestamp'] = (new Date(e['opening_timestamp'] * 1000)).toDateString()
      return e
    })


  }

}
function stringToColour(str: string) {
  console.log(str)
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour + "55"
}