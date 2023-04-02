import { Component } from '@angular/core';

interface NavItem{
  icon: string;
  text: string;
  router: string;
}

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public links: NavItem[] = [
    { icon: "search", text: "Buscar", router: "" },
    { icon: "star_border", text: "Artistas", router: "" },
    { icon: "book", text: "Albums", router: "" },
    { icon: "settings", text: "Mis Datos", router: "" },
  ];
}
