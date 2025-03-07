import { Injectable } from '@angular/core';
import { $location } from 'angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private $location: ng.ILocationService) {}

  goToUrl(url: string, params?: any) {
    if (params) {
      // Correct use of $location.search without arguments
      this.$location.search({});
    }
    this.$location.url(url);
  }
}
