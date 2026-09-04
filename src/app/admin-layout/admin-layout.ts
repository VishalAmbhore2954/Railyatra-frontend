import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftSidebar } from '../left-sidebar/left-sidebar';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    LeftSidebar
  ],
  templateUrl: './admin-layout.html'
})
export class AdminLayout {

}