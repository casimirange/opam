import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandeRoutingModule } from './commande-routing.module';
import { AddCommandComponent } from './add/add-command.component';
import { CommandLayoutComponent } from './command-layout/command-layout.component';
import {SharedModule} from "../shared/shared.module";

// import {RouterModule} from "@angular/router";
import { EditComponent } from './edit/edit.component';
import {IndexCommandComponent} from "./index-command/index-command.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ClientService} from "../../_services/clients/client.service";
import { ClientNameFilterPipe } from './pipes/client-name-filter.pipe';
import { ClientRefFilterPipe } from './pipes/client-ref-filter.pipe';
import { OrderRefFilterPipe } from './pipes/order-ref-filter.pipe';
import { OrderDateFilterPipe } from './pipes/order-date-filter.pipe';
import {NgxPaginationModule} from "ngx-pagination";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {AppModule} from "../../app.module";
// import {AmountVoucherPipe} from "../../pipe/amount-voucher.pipe";


@NgModule({
    declarations: [
        AddCommandComponent,
        CommandLayoutComponent,
        IndexCommandComponent,
        EditComponent,
        ClientNameFilterPipe,
        ClientRefFilterPipe,
        OrderRefFilterPipe,
        OrderDateFilterPipe,
        // AmountVoucherPipe
    ],
    imports: [
        CommonModule,
        CommandeRoutingModule,
        SharedModule,
        // SweetAlert2Module.forChild(),
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        NgxIntlTelInputModule,
    ],
    exports: [
        OrderDateFilterPipe
    ],
    providers: [
        // ClientService
    ]
    // exports: [RouterModule]
})
export class CommandeModule { }
