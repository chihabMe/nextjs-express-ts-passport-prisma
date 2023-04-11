import Image, { StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
  icon: StaticImageData;
  text: string;
  iconWidth?: number;
  iconHeight?: number;
  alt: string;
  authUrl: string;
}

const SocialLoginItem: React.FC<Props> = ({
  icon,
  text,
  iconHeight,
  iconWidth,
  alt,
  authUrl,
}) => {
  return (
    <Button
      className="  flex  h-12     items-center   hover:ring-primary hover:ring-1 active:ring-2 py-2    "
      variant="ghost"
    >
      <a
        href={authUrl}
        target="_blank"
        className="w-full max-w-[300px]  flex mx-auto  justify-center  relative     "
      >
        <Image
          className="  !absolute left-0 "
          src={icon}
          alt={alt}
          width={iconWidth ?? 20}
          height={iconHeight ?? 20}
        />
        <span className="text-sm font-medium">{text}</span>
      </a>
    </Button>
  );
};

export default SocialLoginItem;
