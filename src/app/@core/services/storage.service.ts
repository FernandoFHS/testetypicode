import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private http: HttpClient
  ) { }

  private _encryptKey: string = 'a7fd5ddbc7137790f3b61549ea14ed54';

  setItem(key: string, value: string): void {
    // const keyEncrypted = this.encryptData(key);
    // const valueEncrypted = this.encryptData(value);
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    // const keyEncrypted = this.encryptData(key);
    const data = localStorage.getItem(key);
    return data;
  }

  clear(): void {
    localStorage.clear();
  }

  private encryptData(value: string): string {
    try {
      return CryptoJS.AES.encrypt(value, this._encryptKey).toString();
    } catch (e) {
      console.log(e);
      throw 'Encrypt invalid!';
    }
  }

  private decryptData(value: string): string {
    try {
      if (!value) {
        return null;
      }

      const bytes = CryptoJS.AES.decrypt(value, this._encryptKey);

      if (bytes.toString()) {
        return bytes.toString(CryptoJS.enc.Utf8);
      }

      return value;
    } catch (e) {
      console.log(e);
      throw 'Encrypt invalid!'
    }
  }
}
