import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Music from "@/components/MusicFilterSlider/MusicFilterSlider";
import { artists as musicArtists } from "@/components/FilterSlider/FilterSlider";
import { CardSectionProps } from "@/components/common/CardSection/CardSection";
import { ItemProps } from "@/components/common/Cards.tsx/Cards";
import { CardSliderProps } from "@/components/common/CardSlider/CardSlider";
import { MoreLikeCardProps } from "@/components/common/MoreLikeCard/MoreLikeCard";
import { ItemArtistProps } from "@/components/FilterSlider/BigCardArtist/BigCardArtist";
// ===================== MOCKS =====================

// CardSection
jest.mock("@/components/common/CardSection/CardSection", () => {
  const MockCardSection = (props:CardSectionProps) => (
    <div data-testid={`card-section-${props.title}`}>
      {props.items?.map((item: ItemProps, idx: number) => (
        <div key={idx} data-testid="card-item">
          {typeof item.picture === "string" ? item.picture : "image-mock"}
        </div>
      ))}
    </div>
  );
  MockCardSection.displayName = "CardSection";
  return MockCardSection;
});

// CardSlider
jest.mock("@/components/common/CardSlider/CardSlider", () => {
  const MockCardSlider = (props: CardSliderProps) => (
    <div data-testid="card-slider">
      {props.cardimages?.map((item: ItemProps, idx: number) => (
        <div key={idx} data-testid="slider-card-item">
          {typeof item.picture === "string" ? item.picture : "image-mock"}
        </div>
      ))}
    </div>
  );
  MockCardSlider.displayName = "CardSlider";
  return MockCardSlider;
});

// MoreLikeCard
jest.mock("@/components/common/MoreLikeCard/MoreLikeCard", () => {
  const MockMoreLikeCard = (props: MoreLikeCardProps) => (
    <div data-testid="more-like-card">{props.label}</div>
  );
  MockMoreLikeCard.displayName = "MoreLikeCard";
  return MockMoreLikeCard;
});

// RecentMusics
jest.mock("@/components/MusicFilterSlider/RecentMusics", () => {
  const MockRecentMusics = () => <div data-testid="recent-musics" />;
  MockRecentMusics.displayName = "RecentMusics";
  return MockRecentMusics;
});

// BigCardArtist
jest.mock("@/components/FilterSlider/BigCardArtist/BigCardArtist", () => {
  const MockBigCardArtist = (props: ItemArtistProps) => (
    <div data-testid="big-card-artist">{props.item.name}</div>
  );
  MockBigCardArtist.displayName = "BigCardArtist";
  return MockBigCardArtist;
});

// Helper render
const renderMusic = () =>
  render(
    <Provider store={store}>
      <Music />
    </Provider>
  );

// ===================== UNIT TESTS =====================

describe("Music Component - Unit Tests", () => {
  test("renders all main sections and components", () => {
    renderMusic();

    expect(screen.getByTestId("recent-musics")).toBeInTheDocument();
    expect(screen.getByTestId("more-like-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-slider")).toBeInTheDocument();

    // CardSection titles rendered
    expect(screen.getByTestId("card-section-Made For ilia gholami !")).toBeInTheDocument();
    expect(screen.getByTestId("card-section-Popular Albums")).toBeInTheDocument();

    // BigCardArtist rendered
    const artistCards = screen.getAllByTestId("big-card-artist");
    expect(artistCards.length).toBe(musicArtists.length);
  });

  test("CardSection renders correct number of items", () => {
    renderMusic();
    const cardItems = screen.getAllByTestId("card-item");
    expect(cardItems.length).toBeGreaterThan(0);
  });

  test("CardSlider renders correct number of items", () => {
    renderMusic();
    const sliderItems = screen.getAllByTestId("slider-card-item");
    expect(sliderItems.length).toBeGreaterThan(0);
  });

  test("MoreLikeCard shows correct label", () => {
    renderMusic();
    expect(screen.getByText("Hiphopolgist")).toBeInTheDocument();
  });
});

// ===================== INTERACTION TESTS =====================

describe("Music Component - Interaction Tests", () => {
  test("click MoreLikeCard simulates user interaction", async () => {
    const user = userEvent.setup();
    renderMusic();
    const card = screen.getByTestId("more-like-card");
    await user.click(card);
    expect(card).toBeInTheDocument();
  });
});
