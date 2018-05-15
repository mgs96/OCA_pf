import { NgModule } from '@angular/core';
import { SafeImagePipe } from './safe-image/safe-image';
@NgModule({
	declarations: [SafeImagePipe],
	imports: [],
	exports: [SafeImagePipe]
})
export class PipesModule {}
