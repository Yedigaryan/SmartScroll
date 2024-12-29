import {Component} from '@angular/core';

import {SearchContainerComponent} from './features/search/containers/search.container/search-container.component';
import {SearchService} from './features/search/services/search.service';

@Component({
  selector: 'app-root',
  imports: [SearchContainerComponent],
  providers: [SearchService],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
