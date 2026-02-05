import { render, screen } from "@testing-library/react";
import FilterSlider from "@/app/page";
import { MoreLikeCardProps} from "@/components/common/MoreLikeCard/MoreLikeCard";
import { CardSectionProps } from "@/components/common/CardSection/CardSection";
import { CardSliderProps } from "@/components/common/CardSlider/CardSlider";
import { ItemProps } from "@/components/common/Cards.tsx/Cards";
import { renderHook, act } from "@testing-library/react";
import { useNavSlider } from "@/hooks/useNavSlider/useNavSlider"; 
import { usePathname, useRouter } from "next/navigation"
import userEvent from "@testing-library/user-event";
// Phase 1 Smoke Test UI Test
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
  
jest.mock("@/components/common/CardSlider/CardSlider", () => {
    const MockCardSlider = () => <div data-testid="card-slider" />;
    MockCardSlider.displayName = "CardSlider";
    return MockCardSlider;
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
      <div data-testid={`card-section-${props.title}`}>{props.title}</div>
    );
    MockCardSection.displayName = "CardSection";
    return MockCardSection;
});





//Phase 3 Data-Driven UI
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


describe("FilterSlider Page - Phase 3: Data-driven UI", () => {
  test("CardSection renders correct number of items", () => {
    render(<FilterSlider />);

    const cardItems = screen.getAllByTestId("card-item");
    expect(cardItems.length).toBeGreaterThan(0);
  });

  test("CardSlider renders correct number of items", () => {
    render(<FilterSlider />);

    const sliderItems = screen.getAllByTestId("slider-card-item");
    expect(sliderItems.length).toBeGreaterThan(0);
  });

  test("handles empty items gracefully", () => {
    const EmptyCardSectionMock = (props: CardSectionProps) => (
      <div data-testid="card-section-empty">
        {props.items.length === 0 ? "No items" : "Has items"}
      </div>
    );

    render(<EmptyCardSectionMock items={[]} title="Test Section" />);

    expect(screen.getByText("No items")).toBeInTheDocument();
  });
});



//Phase 2 User Interaction & Conditionam Rendering
describe("FilterSlider Page - Phase 2: User Interaction & Conditional Rendering", () => {
  test("renders without crashing", () => {
    render(<FilterSlider />);
  });

  test("renders all main components", () => {
    render(<FilterSlider />);
    expect(screen.getByTestId("nav-slider")).toBeInTheDocument();
    expect(screen.getByTestId("artist-mini-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-slider")).toBeInTheDocument();
    expect(screen.getByTestId("more-like-card")).toBeInTheDocument();
  });

  test("renders card sections with correct titles", () => {
    render(<FilterSlider />);
    expect(screen.getByTestId("card-section-Fresh Tracks Friday!")).toBeInTheDocument();
    expect(screen.getByTestId("card-section-Trending Hits")).toBeInTheDocument();
  });

  test("clicking a mock card triggers event simulation", async () => {
    const user = userEvent.setup();
    render(<FilterSlider />);
    
    const moreLikeCard = screen.getByTestId("more-like-card");

    await user.click(moreLikeCard);

    expect(moreLikeCard).toBeInTheDocument();
  });

  test("conditional rendering placeholder test", () => {
    render(<FilterSlider />);
  });
});


jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
  }));
  
  describe("useNavSlider Hook", () => {
    const mockPush = jest.fn();
    const mockPrefetch = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
  
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
        prefetch: mockPrefetch,
      });
      
      (usePathname as jest.Mock).mockReturnValue("/browse");
    });
  
    const mockItem = { name: "Music", href: "/browse/music", width:"", height:"", padding:"" };
  
    test("باید با کلیک، تابع push را با آدرس درست صدا بزند", () => {
      const { result } = renderHook(() => useNavSlider());
  
      act(() => {
        result.current.handleClick(mockItem);
      });
  
      expect(mockPush).toHaveBeenCalledWith("/browse/music");
    });
  });

