import { render, screen } from "@testing-library/react";
import Music from "@/components/MusicFilterSlider/MusicFilterSlider";

jest.mock("@/data/homeSection", () => ({
  sectionsConfig: [
    { title: "Made For ilia gholami !", items: [] },
    { title: "Popular Albums", items: [] },
    { title: "Should Not Render", items: [] },
  ],
}));

jest.mock("../FilterSlider/FilterSlider", () => ({
  artists: [{ id: 1 }, { id: 2 }, { id: 3 }],
}));

jest.mock("@/components/FilterSlider/utils", () => ({
  mapItems: (items: any) => items,
}));

jest.mock("@/components/common/CardSection/CardSection", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid="card-section">{title}</div>
  ),
}));

jest.mock("./RecentMusics", () => ({
  __esModule: true,
  default: () => <div data-testid="recent-musics" />,
}));

jest.mock("@/components/common/MoreLikeCard/MoreLikeCard", () => ({
  __esModule: true,
  default: () => <div data-testid="more-like-card" />,
}));

jest.mock("@/components/common/CardSlider/CardSlider", () => ({
  __esModule: true,
  default: () => <div data-testid="card-slider" />,
}));

jest.mock("../FilterSlider/BigCardArtist/BigCardArtist", () => ({
  __esModule: true,
  default: () => <div data-testid="big-card-artist" />,
}));

describe("Music component", () => {
  it("renders only allowed special sections", () => {
    render(<Music />);

    expect(
      screen.getByText("Made For ilia gholami !")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Popular Albums")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Should Not Render")
    ).not.toBeInTheDocument();
  });

  it("renders static child components", () => {
    render(<Music />);

    expect(screen.getByTestId("recent-musics")).toBeInTheDocument();
    expect(screen.getByTestId("more-like-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-slider")).toBeInTheDocument();
  });

  it("renders BigCardArtist for each artist", () => {
    render(<Music />);
    const artists = screen.getAllByTestId("big-card-artist");
    expect(artists).toHaveLength(3);
  });
});
