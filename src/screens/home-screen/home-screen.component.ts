import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeScreenComponent { }
