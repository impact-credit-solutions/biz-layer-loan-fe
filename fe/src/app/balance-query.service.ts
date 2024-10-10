import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class BalanceQueryService {
  private baseUrl = 'http://localhost:8010/proxy'
  // private baseUrl = 'https://1vjgvvlg-8010.asse.devtunnels.ms/proxy'
  constructor(private http: HttpClient) { }


  async getBalance(accountId: string, page: number, size: number, fromTime: Date) {
    return await firstValueFrom(this.http.get(
      this.baseUrl + "/v2/accounts/" + accountId + '/balance/live', { params: { page, size, effectiveTime: fromTime.toISOString() } }
    ))
  }
  async getPostingsByBatch(batchId: string) {
    return await lastValueFrom(this.http.get(`${this.baseUrl}/postings`, { params: { batchId } }))
  }
  async getPostingsBatch(accountId: string, page: number, size: number, start: Date, end: Date) {
    return await lastValueFrom(this.http.get(`${this.baseUrl}/postings/${accountId}/postings-batch`, { params: { page, size, start: start.toISOString(), end: end.toISOString() } }))
  }
  async getAccountDetail(accountId: string) {
    return await lastValueFrom(this.http.get(`${this.baseUrl}/accounts/${accountId}`))
  }
  async getAllAccount(status: string, page: number, size: number) {
    console.log(`GETTING ACCOUNTS ${status} ${page} ${size}`)

    if (status === 'all') {
      return await lastValueFrom(this.http.get(
        this.baseUrl + '/accounts', { params: { page, size, sort: 'opening_timestamp,desc' } }
      ))
    }

    else {

      return await lastValueFrom(this.http.get(
        this.baseUrl + '/accounts', { params: { status: status.toUpperCase(), page, size, sort: 'opening_timestamp,desc' } }
      ))

    }
  }
}

