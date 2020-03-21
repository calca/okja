import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveProfileService } from 'active-profile.service';
import { Profile } from 'models/profile';
import { AgmMap } from '@agm/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
declare const google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  @ViewChild('AgmMap', { static: true }) agmMap: AgmMap;

  activeProfile: Profile[] = [];
  lat: Number;
  lng: Number;

  map: any;

  constructor(
    public router: Router,
    private activeProfileSerive: ActiveProfileService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ionViewDidEnter() {
    this.activeProfileSerive.getActiveProfile()
      .pipe(untilDestroyed(this))
      .subscribe(x => {
        console.log(x);
        this.activeProfile = x;
        // this.repositionMap();
      });
    this.repositionMap();
  }

  repositionMap() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: Position) => {  
        if (position) {
          this.lat = position.coords.latitude;  
          this.lng = position.coords.longitude; 
        }  
      })  
    }
  //   console.log(this.agmMap);
  //   this.agmMap.mapReady.subscribe(map => {
  //     const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
  //     for (const mm of this.activeProfile) {
  //       bounds.extend(new google.maps.LatLng(mm.position.lat, mm.position.lng));
  //     }
  //     map.fitBounds(bounds);
  //   });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  mapReady(event: any) {
    this.map = event;
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('Profile'));
}
}
