import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;

  constructor() { }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      return true;
    }
    return false;
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const result = await this.startScan();
      console.log(result);
      if (result != null) {
        this.scannedResult = result;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
