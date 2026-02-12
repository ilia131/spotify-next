import { MediaKey,  MediaLibrary } from "./media";
import images from "@/public/images";
 


export const mediaLibrary: MediaLibrary = {
  cc: { picture: images.cc, desc: "Centeral Cee, Sprinter , Lilbaby,", name:'Centeral Cee'},
  bilie: { picture: images.Bilie, desc: "Bilie, Bilie2, Bilie3, Bili3e, Bilie4", name:'Bilie' },
  vini: { picture: images.vini, desc: "Vinak ,  Bodow Baw , BloodParty", name:'Vinak' },
  vini2: { picture: images.vini2, desc: "Vinak X Kagan , Pore pool , " , name:'Vinak'},
  dorcci: { picture: images.dorcci, desc: "Dorcci X Kagan , Too late , red, Tariktarin", name:'dorcci' }, 
  dorcci2: { picture: images.dorcci2, desc: "Dorcci X Kagan , Damn things , Pile", name:'dorcci' },
  hiphoplogist: { picture: images.hip2, desc: "hiphopologist , Cardi3 , EX", name:'Hiphopologist' },  
  hiphoplogist2: { picture: images.hip3, desc: "hiphopologist , Shemroon , Cardi2", name:'Hiphopologist' },
  gucci: { picture: images.gucci, desc: "Gucci Flame X kagan, Naro , North Till i Die, ", name:'Gucci Flame' }, 
  gucci2: { picture: images.gucci2, desc: "Gucci Flame , Too late , red, ", name:'Gucci Flame' }, 
};

export interface SectionConfig {
  title: string;
  items: MediaKey[];
  variant?: "artist" | "card";
}

export const sectionsConfig: SectionConfig[] = [
  { title: "Fresh Tracks Friday!", items: ["vini2", "dorcci", "vini" ,"dorcci2"] },
  { title: "Made For ilia gholami !", items: ["dorcci2", "hiphoplogist2", "hiphoplogist" ,"vini2"] },
  { title: "Popular Albums", items: ["gucci", "vini2", "hiphoplogist" ,"vini2"] },
  { title: "Trending Hits", items: ["hiphoplogist", "vini", "gucci"] },
  { title: "Recommended Today", items: ["hiphoplogist2", "gucci2", "cc"] },
  { title: "Your Favorite Artists", items: ["hiphoplogist", "vini", "dorcci", "dorcci2"], variant: "artist" },
];



