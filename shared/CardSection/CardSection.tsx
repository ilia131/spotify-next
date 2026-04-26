import SectionTitle from "../SectionTitle/SectionTitle"
import CardSlider from "../CardSlider/CardSlider"
import TrackCardSlider from "../TrackCardSlider/TrackCardSlider"
import { Song } from "@/redux/features/playerSlice";
import { Artist } from "@/redux/services/artistApislice";
export interface CardSectionProps<T> {
  title: string;
  items: T[];
}

const CardSection = <T,>({ title, items }: CardSectionProps<T>) => {
  return (
    <section className="pt-5.75 grid gap-3 relative overflow-hidden">
      <SectionTitle title={title} />

      {title === "Fresh Track Friday!" || title === "Trending Hits"
        ? <TrackCardSlider cardimages={items as Song[]} title={title} />
        : <CardSlider cardimages={items as Artist[]} title={title} />}
    </section>
  );
};

export default CardSection;
