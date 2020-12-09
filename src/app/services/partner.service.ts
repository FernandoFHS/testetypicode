import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyPartner, ExternalBankAccount, CompanyContact } from 'src/app/models/Company';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private _addPartner = new Subject<CompanyPartner>();
  private _editPartner = new Subject<{ partner: CompanyPartner, index: number}>();
  private _backToCompany = new Subject<void>();

  private _partners: CompanyPartner[] = [];
  private banks: ExternalBankAccount[] = [];
  private phones: CompanyContact[] = [];

  constructor() { }

  onAddPartner() {
   return this._addPartner.asObservable();
  }

  addPartner(partner) {
    this._addPartner.next(partner);
  }

  editPartner(params: { partner: CompanyPartner|any, index: number}) {
    this._editPartner.next(params);
  }

  onEditPartner() {
    return this._editPartner.asObservable();
   }

   backCompany() {
    this._backToCompany.next();
   }

   onBackCompany() {
    return this._backToCompany.asObservable();
   }

   getPartners() {
     return this._partners;
   }

   setPartners(partner) {
    this._partners.push(partner);
   }

   getBanks() {
    return this.banks;
  }

  setBanks(bank) {
   this.banks.push(bank);
  }

  getPhones() {
    return this.phones;
  }

  setPhones(phone) {
   this.phones.push(phone);
  }

   setAllPartners(partners) {
    this._partners = partners;
   }
 
}
