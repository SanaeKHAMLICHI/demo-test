// group.service.ts
import { Injectable } from '@angular/core';
import { Team} from "../../teams/group";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
private player: Player | undefined;
private players: Player[] = [
  { id: 1, name: "Saad Al Sheeb" , teamsId:1 , poste:"Gardien de but",clubName:"Al-Sadd SC"},
  { id: 2, name: "Abdelkarim Hassan" , teamsId:1,poste:"Défenseur", clubName:"Persepolis FC"},
  { id: 3, name: "Boualem Khoukhi" , teamsId:1,poste:"Défenseur", clubName:"Al-Sadd SC"},
  { id: 4, name: "Hassan Al Haydos" , teamsId:1,poste:"Attaquant", clubName:"Al-Sadd SC"},
  { id: 5, name: "Akram Afif" , teamsId:1,poste:"Attaquant", clubName:"Al-Sadd SC"},

  { id: 6, name: "Alexander Dominguez", teamsId: 2, poste: "Gardien de but", clubName:"LDU Quito"},
  { id: 7, name: "Angelo Preciado", teamsId: 2, poste:"Défenseur" ,clubName:"AC Sparta Prague"},
  { id: 8, name: "Pervis Estupinan", teamsId: 2, poste:  "Défenseur", clubName:"Brighton & Hove Albion"},
  { id: 9, name: "Moisés Caicedo", teamsId: 2, poste:  "Milieu de terrain", clubName:"Chelsea FC"},
  { id: 10, name: "Enner Valencia", teamsId: 2, poste: "Attaquant",clubName:"Enner Valencia" },

  { id: 11, name: "Edouard Mendy", teamsId: 3, poste: "Gardien de but",clubName:"Al-Ahli SFC" },
  { id: 12, name: "Kalidou Koulibaly", teamsId: 3, poste: "Défenseur",clubName:"Al-Hilal SFC" },
  { id: 13, name: "Idrissa Gueye", teamsId: 3, poste: "Milieu de terrain" ,clubName:"FC Everton"},
  { id: 14, name: "Ismaila Sarr", teamsId: 3, poste: "Attaquant" ,clubName:"Olympique de Marseille"},
  { id: 15, name: "Sadio Mané", teamsId: 3, poste: "Attaquant" ,clubName:"Al-Nassr FC"},

  { id: 16, name: "Memphis Depay", teamsId: 4, poste: "Attaquant" ,clubName:"Atlético de Madrid"},
  { id: 17, name: "Virgil van Dijk", teamsId: 4, poste: "Défenseur" ,clubName:"FC Liverpool"},
  { id: 18, name: "Frenkie de Jong", teamsId: 4, poste: "Milieu de terrain" ,clubName:"FC Barcelone"},
  { id: 19, name: "Cody Gakpo", teamsId: 4, poste: "Attaquant",clubName:"FC Liverpool" },
  { id: 20, name: "Denzel Dumfries", teamsId: 4, poste: "Défenseur" ,clubName:"Inter Milan"},



  { id: 21, name: "Jordan Pickford", teamsId: 5, poste: "Gardien de but",clubName:"FC Everton" },
  { id: 22, name: "Harry Kane", teamsId: 5, poste: "Attaquant",clubName:"Bayern Munich" },
  { id: 23, name: "Raheem Sterling", teamsId: 5, poste: "Attaquant" ,clubName:"Chelsea FC"},
  { id: 24, name: "Harry Maguire", teamsId: 5, poste: "Défenseur" ,clubName:"Manchester United"},
  { id: 25, name: "Phil Foden", teamsId: 5, poste: "Milieu de terrain" ,clubName:"Manchester City"},

  { id: 26, name: "Alireza Beiranvand", teamsId: 6, poste: "Gardien de but" ,clubName:"Persepolis FC"},
  { id: 27, name: "Ehsan Hajsafi", teamsId: 6, poste: "Défenseur" ,clubName:"AEK Athènes"},
  { id: 28, name: "Sardar Azmoun", teamsId: 6, poste: "Attaquant" ,clubName:"AS Roma"},
  { id: 29, name: "Mehdi Taremi", teamsId: 6, poste: "Attaquant" ,clubName:"FC Porto"},
  { id: 30, name: "Alireza Jahanbakhsh", teamsId: 6, poste: "Milieu de terrain",clubName:"Feyenoord Rotterdam" },

  { id: 31, name: "Matt Turner", teamsId: 7, poste: "Gardien de but" ,clubName:"Nottingham Forest"},
  { id: 32, name: "Christian Pulisic", teamsId: 7, poste: "Attaquant" ,clubName:"AC Milan"},
  { id: 33, name: "Weston McKennie", teamsId: 7, poste: "Milieu de terrain" ,clubName:"Juventus Turin"},
  { id: 34, name: "Tyler Adams", teamsId: 7, poste: "Milieu de terrain",clubName:"AFC Bournemouth" },
  { id: 35, name: "Gio Reyna", teamsId: 7, poste: "Attaquant",clubName:"Nottingham Forest" },

  { id: 36, name: "Wayne Hennessey", teamsId: 8, poste: "Gardien de but",clubName:"Nottingham Forest" },
  { id: 37, name: "Gareth Bale", teamsId: 8, poste: "Attaquant" ,clubName:"-"},
  { id: 38, name: "Aaron Ramsey", teamsId: 8, poste: "Milieu de terrain" ,clubName:"Cardiff City"},
  { id: 39, name: "Daniel James", teamsId: 8, poste: "Attaquant" ,clubName:"Leeds United"},
  { id: 40, name: "Ethan Ampadu", teamsId: 8, poste: "Défenseur" ,clubName:"Leeds United"},




  { id: 41, name: "Mohammed Al-Owais", teamsId: 10, poste: "Gardien de but",clubName:"Al-Hilal SFC" },
  { id: 42, name: "Salem Al-Dawsari", teamsId: 10, poste: "Attaquant" ,clubName:"Al-Hilal SFC"},
  { id: 43, name: "Salman Al-Faraj", teamsId: 10, poste: "Milieu de terrain" ,clubName:"Al-Hilal SFC"},
  { id: 44, name: "Fahad Al-Muwallad", teamsId: 10, poste: "Attaquant",clubName:"Al-Shabab" },
  { id: 45, name: "Yasser Al-Shahrani", teamsId: 10, poste: "Défenseur" ,clubName:"Al-Hilal SFC"},

  { id: 46, name: "Emiliano Martinez", teamsId: 9, poste: "Gardien de but",clubName:"Aston Villa" },
  { id: 47, name: "Lionel Messi", teamsId: 9, poste: "Attaquant",clubName:"Inter Miami CF" },
  { id: 48, name: "Angel Di Maria", teamsId: 9, poste: "Milieu de terrain" ,clubName:"SL Benfica"},
  { id: 49, name: "Rodrigo De Paul", teamsId: 9, poste: "Milieu de terrain" ,clubName:"Atlético de Madrid"},
  { id: 50, name: "Nicolas Otamendi", teamsId: 9, poste: "Défenseur",clubName:"SL Benfica" },

  { id: 51, name: "Guillermo Ochoa", teamsId: 11, poste: "Gardien de but" ,clubName:"US Salernitana 1919"},
  { id: 52, name: "Hirving Lozano", teamsId: 11, poste: "Attaquant",clubName:"PSV Eindhoven" },
  { id: 53, name: "Andres Guardado", teamsId: 11, poste: "Milieu de terrain",clubName:"Club León FC" },
  { id: 54, name: "Raul Jimenez", teamsId: 11, poste: "Attaquant",clubName:"FC Fulham" },
  { id: 55, name: "Hector Moreno", teamsId: 11, poste: "Défenseur",clubName:"CF Monterrey" },

  { id: 56, name: "Wojciech Szczesny", teamsId: 12, poste: "Gardien de but",clubName:"Juventus Turin" },
  { id: 57, name: "Robert Lewandowski", teamsId: 12, poste: "Attaquant",clubName:"FC Barcelone" },
  { id: 58, name: "Piotr Zielinski", teamsId: 12, poste: "Milieu de terrain",clubName:"SSC Napoli" },
  { id: 59, name: "Grzegorz Krychowiak", teamsId: 12, poste: "Milieu de terrain",clubName:"Abha Club" },
  { id: 60, name: "Kamil Glik", teamsId: 12, poste: "Défenseur",clubName:"Cracovia" },

  { id: 61, name: "Hugo Lloris", teamsId: 13, poste: "Gardien de but",clubName:"Los Angeles FC" },
  { id: 62, name: "Kylian Mbappe", teamsId: 13, poste: "Attaquant" ,clubName:"PSG"},
  { id: 63, name: "Antoine Griezmann", teamsId: 13, poste: "Attaquant",clubName:"Atlético de Madrid" },
  { id: 64, name: "Raphael Varane", teamsId: 13, poste: "Défenseur",clubName:"Manchester United" },
  { id: 65, name: "Olivier Giroud", teamsId: 13, poste: "Attaquant",clubName:"AC Milan" },

  { id: 66, name: "Mathew Ryan", teamsId: 14, poste: "Gardien de but",clubName:"AZ Alkmaar" },
  { id: 67, name: "Aaron Mooy", teamsId: 14, poste: "Milieu de terrain",clubName:"-" },
  { id: 68, name: "Mathew Leckie", teamsId: 14, poste: "Attaquant",clubName:"Melbourne City FC" },
  { id: 69, name: "Harry Souttar", teamsId: 14, poste: "Défenseur",clubName:"Leicester City" },
  { id: 70, name: "Ajdin Hrustic", teamsId: 14, poste: "Milieu de terrain",clubName:"Heracles Almelo" },

  { id: 71, name: "Kasper Schmeichel", teamsId: 15, poste: "Gardien de but",clubName:"RSC Anderlecht" },
  { id: 72, name: "Christian Eriksen", teamsId: 15, poste: "Milieu de terrain" ,clubName:"Manchester United"},
  { id: 73, name: "Simon Kjaer", teamsId: 15, poste: "Défenseur" ,clubName:"AC Milan"},
  { id: 74, name: "Andreas Christensen", teamsId: 15, poste: "Défenseur",clubName:"FC Barcelone" },
  { id: 75, name: "Yussuf Poulsen", teamsId: 15, poste: "Attaquant",clubName:"RasenBallsport Leipzig" },

  { id: 76, name: "Wahbi Khazri", teamsId: 16, poste: "Attaquant" ,clubName:"Montpellier Hérault SC"},
  { id: 77, name: "Aissa Laidouni", teamsId: 16, poste: "Milieu de terrain",clubName:".FC Union Berlin" },
  { id: 78, name: "Yassine Meriah", teamsId: 16, poste: "Défenseur",clubName:"Espérance sportive de Tunis" },
  { id: 79, name: "Ellyes Skhiri", teamsId: 16, poste: "Milieu de terrain",clubName:"Eintracht Francfort" },
  { id: 80, name: "Mouez Hassen", teamsId: 16, poste: "Gardien de but",clubName:"Club Africain Tunis" }
];

}
export interface Player{
  id:number;
  name: string;
  teamsId: number;
  poste:string;
  clubName:string;
}
