import {Component} from '@angular/core';
import {SearchContainerComponent} from './features/search/containers/search.container/search.container.component';

@Component({
  selector: 'app-root',
  imports: [SearchContainerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SmartScroll';
}
