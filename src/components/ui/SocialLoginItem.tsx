import Image, { StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
  icon: StaticImageData;
  text: string;
  iconWidth?: number;
  iconHeight?: number;
  alt: string;
}

const SocialLoginItem: React.FC<Props> = ({
  icon,
  text,
  iconHeight,
  iconWidth,
  alt,
}) => {
  return (
    <Button
      className=" flex  h-12     items-center   hover:ring-primary hover:ring-1 active:ring-2 py-2    "
      variant="ghost"
    >
      <div className="w-full  mx-auto flex gap-10 ">
        <Image
          src={icon}
          alt={alt}
          width={iconWidth ?? 20}
          height={iconHeight ?? 20}
        />
        <span className="text-sm font-medium">{text}</span>
      </div>
    </Button>
  );
};

export default SocialLoginItem;
