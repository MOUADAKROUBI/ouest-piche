export type Position = {
    latitude: number;
    longitude: number;
};

export interface CarouselProps {
    children: React.ReactNode;
    autoSlide?: boolean;
    authoSlideInterval?: number;
    tips?: boolean;
    hiddenArrows?: boolean;
};