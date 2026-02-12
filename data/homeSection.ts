import { MediaKey,  MediaLibrary } from "./media";
import images from "@/public/images";
 


export const mediaLibrary: MediaLibrary = {
  cc: { picture: images.cc, desc: "Centeral Cee, Sprinter , Lilbaby,", name: 'Centeral Cee', profile_pic: images.cc, id: "cc", bio: "" },
  bilie: { picture: images.Bilie, desc: "Bilie, Bilie2, Bilie3, Bili3e, Bilie4", name: 'Bilie', profile_pic: images.Bilie, id: "bilie", bio: "" },
  vini: { picture: images.vini, desc: "Vinak ,  Bodow Baw , BloodParty", name: 'Vinak', profile_pic: images.vini, id: "vini", bio: "" },
  vini2: { picture: images.vini2, desc: "Vinak X Kagan , Pore pool ,", name: 'Vinak', profile_pic: images.vini2, id: "vini2", bio: "" },
  dorcci: { picture: images.dorcci, desc: "Dorcci X Kagan , Too late , red, Tariktarin", name: 'dorcci', profile_pic: images.dorcci, id: "dorcci", bio: "" },
  dorcci2: { picture: images.dorcci2, desc: "Dorcci X Kagan , Damn things , Pile", name: 'dorcci', profile_pic: images.dorcci2, id: "dorcci2", bio: "" },
  hiphoplogist: { picture: images.hip2, desc: "hiphopologist , Cardi3 , EX", name: 'Hiphopologist', profile_pic: images.hip2, id: "hiphoplogist", bio: "" },
  hiphoplogist2: { picture: images.hip3, desc: "hiphopologist , Shemroon , Cardi2", name: 'Hiphopologist', profile_pic: images.hip3, id: "hiphoplogist2", bio: "" },
  gucci: { picture: images.gucci, desc: "Gucci Flame X kagan, Naro , North Till i Die,", name: 'Gucci Flame', profile_pic: images.gucci, id: "gucci", bio: "" },
  gucci2: { picture: images.gucci2, desc: "Gucci Flame , Too late , red,", name: 'Gucci Flame', profile_pic: images.gucci2, id: "gucci2", bio: "" },
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



