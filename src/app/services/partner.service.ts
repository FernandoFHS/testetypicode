import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CompanyPartner,
  ExternalBankAccount,
  CompanyContact,
} from 'src/app/models/Company';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private _addPartner = new Subject<CompanyPartner>();
  private _editPartner = new Subject<{
    partner: CompanyPartner;
    index: number;
  }>();
  private _addBank = new Subject<CompanyPartner>();
  private _editBank = new Subject<{
    bank: ExternalBankAccount;
    index: number;
  }>();
  private _addPhone = new Subject<CompanyPartner>();
  private _editPhone = new Subject<{
    phone: CompanyContact;
    index: number;
  }>();
  private _backToCompany = new Subject<void>();

  private _partners: CompanyPartner[] = [];
  private _banks: ExternalBankAccount[] = [];
  private _phones: CompanyContact[] = [];

  constructor() {}

  onAddPartner() {
    return this._addPartner.asObservable();
  }

  addPartner(partner) {
    this._addPartner.next(partner);
  }

  editPartner(params: { partner: CompanyPartner | any; index: number }) {
    this._editPartner.next(params);
  }

  onEditPartner() {
    return this._editPartner.asObservable();
  }

  onAddBanks() {
    return this._addPartner.asObservable();
  }

  addBanks(bank) {
    this._addBank.next(bank);
  }

  editBanks(params: { bank: ExternalBankAccount | any; index: number }) {
    this._editBank.next(params);
  }

  onEditBank() {
    return this._editBank.asObservable();
  }

  onAddPhone() {
    return this._addPhone.asObservable();
  }

  addPhone(phone) {
    this._addPhone.next(phone);
  }

  editPhone(params: { phone: CompanyContact | any; index: number }) {
    this._editPhone.next(params);
  }

  onEditPhone() {
    return this._editPhone.asObservable();
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
    return this._banks;
  }

  setBanks(bank) {
    this._banks.push(bank);
  }

  getPhones() {
    return this._phones;
  }

  setPhones(phone) {
    this._phones.push(phone);
  }

  setAllPartners(partners) {
    this._partners = partners;
  }

  setAllBanks(banks) {
    this._banks = banks;
  }

  setAllPhones(phones) {
    this._phones = phones;
  }
}
