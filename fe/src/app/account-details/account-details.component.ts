import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BalanceQueryService } from '../balance-query.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AgGridAngular, } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridApi, GridReadyEvent, ModuleRegistry, } from 'ag-grid-community'; // Column Definition Type Interface
import { Title } from '@angular/platform-browser';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Clipboard } from '@angular/cdk/clipboard';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-account-details',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [JsonPipe, AgGridAngular, MatCardModule, Highlight, HighlightLineNumbers, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
  // changeDetection: ChangeDetectionStrategy.,
})
export class AccountDetailsComponent implements OnInit {
  readonly range = new FormGroup({
    start: new FormControl<Date>(new Date()),
  });
  async dateChanged() {
    console.log(this.range.value)

    var start = this.range.value.start
    // start!.setDate(start!.getDate() - 7)
    const end_d = new Date()
    console.log("FETCHING NEW VALS")

    // this.postings = await this.BQS.getPostingsBatch(this.params.accountId, 0, 100, start!, end_d)
    this.balances = await this.BQS.getBalance(this.params.accountId, 0, 100, start!)

    console.log(this.balances)
    console.log(this.postings)
    // this.accountDetails = await this.BQS.getAccountDetail(this.params.accountId)

  }
  params: any;
  postings: any;
  accountDetails: any;
  pagination = true;
  paginationPageSize = 30;
  paginationPageSizeSelector = [30, 50, 100];
  balances: any;
  selectedPosting: any;
  modules: any = [ClientSideRowModelModule];
  picker: any;
  private gridApiPosting!: GridApi;
  private gridApiBalance!: GridApi;
  private gridApiPostingDetails!: GridApi;
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',


  });

  getPostingRowStyle(e: any) {
    // console.log(e)
    var temp;
    temp = e.data.account_id
    return { 'background-color': stringToColour(temp) }
  }
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
      field: "account_address", pinned: 'left', width: 250, headerName: "Address", sort: 'asc'
    },
    { field: "phase" },

    { field: "amount", valueFormatter: p => this.formatter.format(p.value) },
    { field: 'denomination', headerName: "denomination", width: 100 },
    { field: 'total_credit', headerName: "Credit", width: 180, valueFormatter: p => this.formatter.format(p.value) },
    { field: 'total_debit', headerName: "Debit", width: 180, valueFormatter: p => this.formatter.format(p.value) },
    { field: 'time_value', headerName: "Valued Timestamp", width: 280 }


  ];

  colDefs_PostingsDetails: ColDef[] = [
    {
      field: "account_address", pinned: 'left', width: 250, headerName: "Address", sort: 'asc'
    },
    { field: 'account_id' },
    { field: "phase", width: 150 },

    { field: "amount", valueFormatter: p => this.formatter.format(p.value) },
    // { field: 'denomination', headerName: "denomination", width: 100 },
    { field: 'credit', headerName: "Credit", width: 80 },
    { field: 'value_timestamp', headerName: "Valued Timestamp", width: 280 },
    { field: 'insertion_timestamp', headerName: "Insertion Timestamp", width: 280 }


  ];




  colDefs_Posting: ColDef[] = [
    {
      field: "posting_instructions", headerName: "Instructions", width: 400, valueGetter: (row: any) => {

        return JSON.stringify(row.data.postings_instructions[0].postings, null, 2)
      },

      onCellClicked: (event) => {

        // console.log(event.data.postings_instructions[0].postings)
        this.selectedPosting = event.data.postings_instructions[0].postings


      },
    },
    {
      field: "batch_id", width: 200, headerName: "Posting Batch ID", onCellClicked: (e) => {
        // console.log(e.data)
        this.clipboard.copy(e.data.batch_id)
      }
    },
    { field: "timestamp", width: 200, valueGetter: (e) => { return e.data.request_id.split('_')[e.data.request_id.split('_').length - 1] } },
    {
      field: "request_id", pinned: 'left', width: 350, headerName: "Request Batch ID", onCellClicked: (e) => {
        // console.log(e.data)
        this.clipboard.copy(e.data.batch_id)
      }
    },


    // { field: 'account_address', width: 280 },

    // { field: "amount", valueFormatter: p => this.formatter.format(p.value) },
    // { field: "credit", cellStyle: { textAlign: 'center' }, width: 100 },

    // { field: 'denomination', headerName: "denomination", width: 100 },
    // { field: 'insertion_timestamp', headerName: "Inserted Timestamp", width: 280, sort: "asc" },
    // { field: 'value_timestamp', headerName: "Valued Timestamp", width: 280 }


  ];
  constructor(private BQS: BalanceQueryService, private activatedRoute: ActivatedRoute, private titleService: Title, private clipboard: Clipboard) {

  }
  async ngOnInit() {
    var start = this.range.value.start
    start!.setDate(start!.getDate() - 7)
    const end_d = new Date()
    this.params = await firstValueFrom(this.activatedRoute.params)

    this.postings = await this.BQS.getPostingsBatch(this.params.accountId, 0, 100, start!, end_d)
    this.balances = await this.BQS.getBalance(this.params.accountId, 0, 100, end_d)
    this.accountDetails = await this.BQS.getAccountDetail(this.params.accountId)



    this.titleService.setTitle(`${this.accountDetails.product_id} - ${this.params.accountId}`)
    this.accountDetails = JSON.stringify(this.accountDetails, null, 4)
    // console.log(this.postings)
    // this.rowRules = this.postings.
  }
  onFilterTextBoxPostingChanged() {
    this.gridApiPosting.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box-posting") as HTMLInputElement).value,
    );
  }


  onFilterTextBoxBalanceChanged() {
    this.gridApiBalance.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box-balance") as HTMLInputElement).value,
    );
  }
  onPostingDetailsGridReady(params: GridReadyEvent) {
    this.gridApiPostingDetails = params.api;


  }
  onPostingGridReady(params: GridReadyEvent) {
    this.gridApiPosting = params.api;


  }
  onBalanceGridReady(params: GridReadyEvent) {
    this.gridApiBalance = params.api;

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