import { Component, OnInit } from '@angular/core';
import { BalanceQueryService } from '../balance-query.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AgGridAngular, } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, } from 'ag-grid-community'; // Column Definition Type Interface
import { Title } from '@angular/platform-browser';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [JsonPipe, AgGridAngular, MatCardModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})


export class AccountDetailsComponent implements OnInit {
  params: any;
  postings: any;
  accountDetails: any;
  pagination = true;
  paginationPageSize = 30;
  paginationPageSizeSelector = [30, 50, 100];
  balances: any;

  modules: any = [ClientSideRowModelModule];
  private gridApiPosting!: GridApi;
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',


  });
  getRowStyle(e: any) {

    var temp;
    if (e.data.posting_instruction_id) {
      temp = e.data.posting_instruction_id
    }
    else {
      temp = e.data.account_address
    }
    return { 'background-color': stringToColour(temp) }
  }
  colDefs_Balance: ColDef[] = [
    {
      field: "account_address", pinned: 'left', width: 350, headerName: "Address", sort: 'asc'
    },
    { field: "phase" },

    { field: "amount", valueFormatter: p => this.formatter.format(p.value) },
    { field: 'denomination', headerName: "denomination", width: 100 },
    { field: 'total_credit', headerName: "Credit", width: 280, valueFormatter: p => this.formatter.format(p.value) },
    { field: 'total_debit', headerName: "Debit", width: 280, valueFormatter: p => this.formatter.format(p.value) },
    { field: 'time_value', headerName: "Valued Timestamp", width: 280 }


  ];
  colDefs_Posting: ColDef[] = [
    {
      field: "posting_instruction_id", pinned: 'left', width: 350, headerName: "Posting ID"
    },
    { field: 'account_address', width: 280 },

    { field: "amount", valueFormatter: p => this.formatter.format(p.value) },
    { field: "credit", cellStyle: { textAlign: 'center' }, width: 100 },

    { field: 'denomination', headerName: "denomination", width: 100 },
    { field: 'insertion_timestamp', headerName: "Inserted Timestamp", width: 280, sort: "asc" },
    { field: 'value_timestamp', headerName: "Valued Timestamp", width: 280 }


  ];
  constructor(private BQS: BalanceQueryService, private activatedRoute: ActivatedRoute, private titleService: Title) {

  }
  async ngOnInit() {
    var start = new Date()
    start.setDate(start.getDate() - 7)
    const end_d = new Date()
    this.params = await firstValueFrom(this.activatedRoute.params)
    this.postings = await this.BQS.getPostings(this.params.accountId, 0, 1000, start, end_d)
    this.balances = await this.BQS.getBalance(this.params.accountId, 0, 100)
    this.accountDetails = await this.BQS.getAccountDetail(this.params.accountId)
    this.titleService.setTitle(`${this.accountDetails.product_id} - ${this.params.accountId}`)

    // this.rowRules = this.postings.
  }
  onFilterTextBoxPostingChanged() {
    this.gridApiPosting.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApiPosting = params.api;

  }

}
function stringToColour(str: string) {

  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour + "44"
}