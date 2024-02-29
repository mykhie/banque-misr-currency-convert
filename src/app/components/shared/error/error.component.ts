import {Component, Input} from '@angular/core';
import {BaseComponent} from "@app/components/base/base.component";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends BaseComponent {
  @Input() error: string | undefined;
}
