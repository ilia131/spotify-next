import { OverlayLeft } from "./OverlayLeft";
interface NavSliderLayoutProps {
  children: React.ReactNode;
}

export const NavSliderLayout = ({ children }: NavSliderLayoutProps) => {
  return (
    <section className="fixed w-full top-0 z-50 bg-[#121212] pt-7.5 pb-1.5 ">
      <div className="h-8.5 relative overflow-hidden ">
        <OverlayLeft />
        {children}
      </div>
    </section>
  );
};
