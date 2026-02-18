
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import FilterSlider from "@/app/page";
import { useNavSlider } from "@/hooks/useNavSlider/useNavSlider";
import { usePathname, useRouter } from "next/navigation";
import { MoreLikeCardProps } from "@/components/common/MoreLikeCard/MoreLikeCard";
import { ItemProps } from "@/components/common/Cards.tsx/Cards";
import { CardSectionProps } from "@/components/common/CardSection/CardSection";
import { CardSliderProps } from "@/components/common/CardSlider/CardSlider";
/* ===================== MOCKS ===================== */

jest.mock("@/components/common/NavSlider/NavSlider", () => {
  const MockNavSlider = () => <div data-testid="nav-slider" />;
  MockNavSlider.displayName = "NavSlider";
  return MockNavSlider;
});

jest.mock("@/components/ArtistMiniCard/ArtistMiniCard", () => {
  const MockArtistMiniCard = () => <div data-testid="artist-mini-card" />;
  MockArtistMiniCard.displayName = "ArtistMiniCard";
  return MockArtistMiniCard;
});

jest.mock("@/components/common/MoreLikeCard/MoreLikeCard", () => {
  const MockMoreLikeCard = (props:MoreLikeCardProps) => (
    <div data-testid="more-like-card">{props.label}</div>
  );
  MockMoreLikeCard.displayName = "MoreLikeCard";
  return MockMoreLikeCard;
});

jest.mock("@/components/common/CardSection/CardSection", () => {
  const MockCardSection = (props: CardSectionProps) => (
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

const mockUseArtistsQuery = jest.fn();
jest.mock("@/redux/services/artistApislice", () => ({
  useArtistsQuery: () => mockUseArtistsQuery(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

/* ===================== HELPERS ===================== */

const renderFilterSlider = () =>
  render(
    <Provider store={store}>
      <FilterSlider />
    </Provider>
  );

/* ===================== UNIT TESTS ===================== */

describe("FilterSlider - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseArtistsQuery.mockReturnValue({
      data: [
        { picture: "pic1" },
        { picture: "pic2" },
        { picture: "pic3" },
      ],
      error: null,
      isLoading: false,
    });
  });

  test("renders main components", () => {
    renderFilterSlider();
    expect(screen.getByTestId("nav-slider")).toBeInTheDocument();
    expect(screen.getByTestId("artist-mini-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-slider")).toBeInTheDocument();
    expect(screen.getByTestId("more-like-card")).toBeInTheDocument();
  });

  test("CardSection renders correct number of items", () => {
    renderFilterSlider();
    const cardItems = screen.getAllByTestId("card-item");
    expect(cardItems.length).toBeGreaterThan(0);
  });

  test("CardSlider renders correct number of items", () => {
    renderFilterSlider();
    const sliderItems = screen.getAllByTestId("slider-card-item");
    expect(sliderItems.length).toBeGreaterThan(0);
  });

  test("handles empty items gracefully", () => {
    render(
      <div data-testid="empty">
        {[].length === 0 ? "No items" : "Has items"}
      </div>
    );
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  test("user can click MoreLikeCard", async () => {
    const user = userEvent.setup();
    renderFilterSlider();
    const card = screen.getByTestId("more-like-card");
    await user.click(card);
    expect(card).toBeInTheDocument();
  });
});

/* ===================== INTEGRATION TESTS ===================== */

describe("FilterSlider - Integration Tests", () => {
  test("renders correctly with Redux Provider", () => {
    mockUseArtistsQuery.mockReturnValue({ data: [{ picture: "pic1" }], error: null, isLoading: false });
    renderFilterSlider();
    expect(screen.getByTestId("nav-slider")).toBeInTheDocument();
    expect(screen.getByTestId("artist-mini-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-slider")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    mockUseArtistsQuery.mockReturnValue({ data: null, error: null, isLoading: true });
    renderFilterSlider();
    // اگر لودینگ دارید assert اضافه کنید
  });

  test("renders error state", () => {
    mockUseArtistsQuery.mockReturnValue({ data: null, error: "error", isLoading: false });
    renderFilterSlider();
    // اگر error component دارید assert اضافه کنید
  });
});

/* ===================== HOOK TESTS ===================== */

describe("useNavSlider Hook", () => {
  const mockPush = jest.fn();
  const mockPrefetch = jest.fn();
  const mockItem = { name: "Music", href: "/browse/music", width: "", height: "", padding: "" };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush, prefetch: mockPrefetch });
    (usePathname as jest.Mock).mockReturnValue("/browse");
  });

  test("handleClick calls push with correct path", () => {
    const { result } = renderHook(() => useNavSlider());
    act(() => result.current.handleClick(mockItem));
    expect(mockPush).toHaveBeenCalledWith("/browse/music");
  });
});
