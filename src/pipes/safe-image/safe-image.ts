import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the SafeImagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safeImage',
})
export class SafeImagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

  constructor(private sanitizer: DomSanitizer) { 
  }

  transform(value: string, ...args) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
