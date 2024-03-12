import {Component} from '@angular/core';
import {Article} from "./article";
import {ArticleService} from "./article.service";
import {NgForOf} from "@angular/common";
import {MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router, RouterLink} from "@angular/router";
import {GroupDto} from "../group/model";
import {GroupComponent} from "../group/group/group.component";
import {GroupFacadeService} from "../group/group-facade.service";
import {AuthFormFacade} from "../auth/auth.facade";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    FlexModule,
    MatCardImage,
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatMenuTrigger,
    MatMenu,
    MatButton,
    MatMenuItem,
    RouterLink,
    MatFabButton,
    GroupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  articlesList: Article[] = [];
  groups: GroupDto[] = [];

  constructor(
    private groupFacade:GroupFacadeService,
    private authFacade: AuthFormFacade,

    private articlesService:ArticleService,
    private router: Router,

  ) {
    this.articlesList = this.articlesService.getArticles();

    this.groupFacade.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
      },
      error: (error) => console.error(error)
    });
  }
  onLogout(){
    this.authFacade.logout()
    this.router.navigate(['/']);
  }


}
