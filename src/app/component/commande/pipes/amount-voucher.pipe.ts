import {Pipe, PipeTransform} from '@angular/core';
import {VoucherService} from "../../../_services/voucher/voucher.service";
import {TypeVoucher} from "../../../_model/typeVoucher";
import {analyzeNgModules} from "@angular/compiler";

@Pipe({
  name: 'amountVoucher'
})
export class AmountVoucherPipe implements PipeTransform {
  amount: TypeVoucher = new TypeVoucher();

  constructor(private voucherService: VoucherService) {
  }

  transform(idTypeVoucher: number): number {
    const amount = 0;
    this.voucherService.getTypevoucherByInternalRef(idTypeVoucher).subscribe((res: TypeVoucher) => {
      console.log('res', res)
      this.amount = res
      console.log('amount', this.amount)
    }, error => {},
      () => {
        return this.amount.amount;
      }

    );
    console.log('amount2', this.amount.amount)
    return this.amount.amount;
  }

}
