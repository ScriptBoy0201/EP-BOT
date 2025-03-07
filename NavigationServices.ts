import { Injectable, Inject } from '@angular/core';
import { ILocationService } from 'angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(@Inject('$location') private $location: ILocationService) {}

  goToUrl(url: string, params?: Record<string, string | number | boolean>) {
    try {
      if (params && Object.keys(params).length > 0) {
        this.$location.search(params); // Apply query parameters properly
      } else {
        this.$location.search({}); // Clears query params when no params are provided
      }

      this.$location.url(url);
      console.log(`Navigated to: ${url} with params:`, params || 'No Params');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  }
}

