import SectionTitle from "@/shared/SectionTitle/SectionTitle"

import { Album  } from "@/redux/services/artistApislice";
import CardSliderPA from "./card-slider-popular-album";
export interface CardSectionProps {
  items: Album[];
  title:string
}

const CardSectionPA = ({ title, items }: CardSectionProps) => {
  return (
    <section className="pt-5.75 grid gap-3 relative overflow-hidden">
      <SectionTitle title={title} />
      <CardSliderPA cardimages={items}  />    
    </section>
  );
};

export default CardSectionPA;
