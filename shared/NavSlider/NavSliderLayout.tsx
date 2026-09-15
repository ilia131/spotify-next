import { OverlayLeft } from "./OverlayLeft";
interface NavSliderLayoutProps {
  children: React.ReactNode;
}

export const NavSliderLayout = ({ children }: NavSliderLayoutProps) => {
  return (
    <section
      className="
        fixed
        top-0
        z-50
        w-110
        pt-7.5
        pb-1.5
        pl-4
        max-[440]:w-full
        bg-black/20
        backdrop-blur-xl
        border-b
        border-white/5
      "
    >
      <div className="relative h-8.5 overflow-hidden">
        <OverlayLeft />
        {children}
      </div>
    </section>
  );
};