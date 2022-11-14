import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "../../../_services/users/users.service";
import {ISignup} from "../../../_interfaces/signup";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {StoreService} from "../../../_services/store/store.service";
import {Store} from "../../../_interfaces/store";

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.css']
})
export class IndexUsersComponent implements OnInit {

  users: ISignup[] = []
  stores: Store[] = []
  constructor(private modalService: NgbModal, private userService: UsersService, private notifsService: NotifsService,
              private storeService: StoreService) { }

  ngOnInit(): void {
    this.getUsers()
    this.getStores()
  }

  // openCommandModal(content: any){
  //   const modal = true;
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titles', size: 'xl', });
  // }

  getUsers(): void{
    this.userService.getUsers().subscribe(
      resp => {
        this.users = resp.content;
        this.notifsService.onSuccess('liste des utilisateurs')
      },
      error => {
        // this.notifsService.onError(error.error.message, "échec de chargement des utilisateurs")
      }
    )
  }

  getStores(){
    this.storeService.getStore().subscribe(
      resp => {
        this.stores = resp.content
      },
      error => {
        // this.notifsService.onError(error.error.message, 'échec chargement magasins')
      }
    )
  }
}
