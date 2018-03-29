import { GadgetService } from './gadget.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  head: string;
  accessPoint: string;
  schoolInfo: any;
  loading: boolean;
  error: any;

  langs = ['英文', '中文', '日文'];

  constructor(
    private gadget: GadgetService) {
  }

  async ngOnInit() {

    this.head = 'Hello Gadget!';

    try {
      this.loading = true;

      // 取得 contract 連線。
      const contract = await this.gadget.getContract('basic.public');

      this.accessPoint = contract.getAccessPoint;

      // 呼叫 service。
      this.schoolInfo = await contract.send('beta.GetSystemConfig', {
        Name: '學校資訊'
      });

    } catch (err) {
      this.error = err;
    } finally {
      this.loading = false;
    }
    
  }
}
