import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'st-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
}
