// article.service.ts
import { Injectable } from '@angular/core';
import {Article} from "./article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'L\'épopée historique du Maroc à la Coupe du Monde 2022',
      description: 'Le Maroc a marqué l\'histoire en devenant la première équipe africaine à se qualifier pour les ' +
        'demi-finales de la Coupe du Monde. Leur parcours a été salué mondialement, symbolisant non seulement un ' +
        'triomphe sportif mais aussi un moment de fierté culturelle et nationale. La défense solide, la stratégie ' +
        'efficace, et l\'esprit d\'équipe ont été les clés de leur succès remarquable.',
      picture: 'https://media.sudouest.fr/13281533/1000x500/20221206192106-44622812.jpg?v=1670359700'
    },
    {
      id: 2,
      title: 'La passion argentine mène à la gloire',
      description: 'L\'Argentine a remporté la Coupe du Monde 2022, une victoire emblématique menée par Lionel Messi. ' +
        'Ce tournoi a été le théâtre d\'une passion et d\'un talent incroyable, où l\'équipe a démontré une combinaison' +
        ' parfaite de compétence individuelle et de cohésion d\'équipe. Leur chemin vers la gloire a été marqué par ' +
        'des moments de magie footballistique qui resteront gravés dans l\'histoire du sport.',
      picture: 'https://th.bing.com/th/id/R.f53a81bebdf2418bba96ea354a93e587?rik=frobUgU5DOwtow&pid=ImgRaw&r=0'
    },
    {
      id: 3,
      title: 'Le Qatar, un hôte plein de surprises',
      description: 'Le Qatar a proposé une Coupe du Monde spectaculaire, marquée par une organisation sans faille et' +
        ' des stades à la pointe de la technologie. Cet événement a été une vitrine pour le pays, démontrant sa capacité' +
        ' à accueillir des événements d\'envergure mondiale. L\'hospitalité qatarie et les innovations apportées ont' +
        ' contribué à une expérience mémorable pour les fans et les joueurs.',
      picture: 'https://th.bing.com/th/id/OIP.OMiBRLYtXHQT3t4FIiDn6AHaD8?rs=1&pid=ImgDetMain'
    },
    {
      id: 4,
      title: 'La France défend son titre avec brio',
      description: 'La France, tenant du titre, a abordé la Coupe du Monde 2022 avec une équipe talentueuse, déterminée ' +
        'à défendre son statut. Malgré des défis, l\'équipe a montré sa profondeur tactique et son esprit de combat,' +
        ' atteignant les phases finales grâce à des performances clés de ses étoiles. La compétition a souligné la ' +
        'richesse du football français et son impact constant sur le football mondial.',
      picture: 'https://th.bing.com/th/id/OIP.enu23Ptpotiq66hByoOvcwHaEn?rs=1&pid=ImgDetMain'
    },
    {
      id: 5,
      title: 'L\'Italie, l\'absente remarquée du tournoi',
      description: 'Malgré son absence surprenante à la Coupe du Monde 2022, l\'Italie reste dans les cœurs des fans avec son histoire riche en football.',

      picture: 'https://i.eurosport.com/2021/09/06/3214253.jpg'
    }
  ];

  getArticles() {
    return this.articles;
  }
}
