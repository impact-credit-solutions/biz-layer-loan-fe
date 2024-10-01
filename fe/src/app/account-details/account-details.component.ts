import { Component, OnInit } from '@angular/core';
import { BalanceQueryService } from '../balance-query.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AgGridAngular, } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef, GridApi, GridOptions } from 'ag-grid-community'; // Column Definition Type Interface
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
  pagination = true;
  paginationPageSize = 30;
  paginationPageSizeSelector = [30, 50, 100];
  balances: any;
  getRowStyle(e: any) {
    console.log(e.data)
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
      field: "account_address", pinned: 'left', width: 350, headerName: "Address"
    },
    { field: 'account_address', width: 280 },
    { field: "phase" },
    { field: "amount" },
    { field: 'denomination', headerName: "denomination" },
    { field: 'total_credit', headerName: "Credit", width: 280 },
    { field: 'total_debit', headerName: "Debit", width: 280 }


  ];
  colDefs_Posting: ColDef[] = [
    {
      field: "posting_instruction_id", pinned: 'left', width: 350, headerName: "Posting ID"
    },
    { field: 'account_address', width: 280 },
    { field: "credit" },
    { field: "amount" },
    { field: 'denomination', headerName: "denomination" },
    { field: 'insertion_timestamp', headerName: "Inserted Timestamp", width: 280 },
    { field: 'value_timestamp', headerName: "Valued Timestamp", width: 280 }


  ];
  constructor(private BQS: BalanceQueryService, private activatedRoute: ActivatedRoute) {

  }
  async ngOnInit() {
    this.params = await firstValueFrom(this.activatedRoute.params)
    this.postings = await this.BQS.getPostings(this.params.accountId)
    this.balances = await this.BQS.getBalance(this.params.accountId, 0, 100)
    console.log(this.balances)
    // this.rowRules = this.postings.
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
  return colour + "44"
}