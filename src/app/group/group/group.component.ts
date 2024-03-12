import {Component, inject} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GroupDto} from "../model";
import {Router, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {GroupFacadeService} from "../group-facade.service";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatMenuTrigger,
    MatButton,
    MatMenu,
    RouterLink,
    MatMenuItem,
    MatFabButton,
    NgForOf,
    MatIcon
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  groups: GroupDto[] = [];

  constructor(private router: Router,private groupFacade : GroupFacadeService) {

    this.groupFacade.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => console.error(error)
    });
  }
  goToGroupCreationForm() {
    this.router.navigate(['/home/group-form']);
  }
}
