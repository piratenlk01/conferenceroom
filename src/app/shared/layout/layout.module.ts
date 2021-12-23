import { NgModule, Input, Component, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
// import { IdentityService } from '../../shared/identity-service/identity.service';
import { NavClickToggleDirective } from './nav.directive';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
// import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any

@Component({
  selector: 'layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {
    
    @Input('Logo') Logo:string;
    @Input('ProjectName') ProjectName:string;
    @Input('ProjectCode') ProjectCode:string;
    @ViewChild('sidebar') SideBar: ElementRef;
    @ViewChild('content') Content: ElementRef;
    @ViewChild('overlay') Overlay: ElementRef;

    constructor(
        // public _IdService: IdentityService,
        private title: Title,
        // public LS:LocalStorageService,
        private _Router: Router
    ) {
    }

    ngOnInit() {
        this.title.setTitle(this.ProjectName);
    }

    RedirectPortal() {
        // this._IdService.RedirectPortal();
    }

    ToggleSidebar() {
        this.SideBar.nativeElement.classList.add('small-collapse');
        this.SideBar.nativeElement.classList.toggle('large-collapse');
        this.Content.nativeElement.classList.toggle('large-collapse');
        this.Overlay.nativeElement.style.display = 'block';
    }

    Dismiss() {
        this.Overlay.nativeElement.style.display = '';
        this.SideBar.nativeElement.classList.remove('small-collapse');
    }

    routerlink(nav:any, event: Event) {
        if(nav.Code == 'ManagementEquipmentGroup' || nav.Code == 'ManagementStationaryOfficeEquipment' || nav.Code == 'ManagementStationaryOfficeUnit'){
            window.open(nav.RouterLink, '_blank')
        }else{
            this._Router.navigate([nav.RouterLink])
        }
        event.preventDefault();
    }
}



@NgModule({
    imports: [
        CommonModule,
        MenuModule
    ],
    declarations: [
        LayoutComponent,
        NavClickToggleDirective
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule { }


