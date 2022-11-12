import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../_services/clients/client.service";
import {IClient, TypeClient} from "../../../_interfaces/client";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  client: IClient;
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) {
    this.client = new class implements IClient {
      address: string;
      companyName: string;
      completeName: string;
      createdAt: Date;
      email: string;
      gulfcamAccountNumber: string;
      id: number;
      internalReference: number;
      phone: string;
      rccm: string;
      typeClient: TypeClient;
      updateAt: Date;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.clientService.findClient(params['id']).subscribe(
        res => {
          this.client = res;
          console.log(res)
        }
      )
    })
  }

}
