import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import * as JsBarcode from 'jsbarcode';
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  qrCodeString = 'This is a secret qr code message';
  barCodeString = 'This is secret bar code message';
  scannedResult: any;
  barScannedResult: any;
  content_visibility = '';

  constructor() { }

  ngOnInit(): void {
    JsBarcode("#barcode", "1234", {
      //format: "pharmacode",
      //lineColor: "#0aa",
      //width: 4,
      //height: 40,
      displayValue: false
    });
  }

  /*
  startScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }
  */
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
      this.content_visibility = 'hidden';
      const result = await this.startScan();
      console.log(result);
      this.content_visibility = '';
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
    this.content_visibility = '';
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
