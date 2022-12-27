import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptions {
  sidebarHover = false;
  toggleSidebar = false;
  toggleSidebarMobile = false;
  toggleHeaderMobile = false;
  toggleFixedFooter = false;
  tax = 0.1925
}
