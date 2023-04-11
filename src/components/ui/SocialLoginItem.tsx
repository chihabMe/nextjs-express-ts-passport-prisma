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
    <a
      href={authUrl}
      target="_blank"
      className="flex rounded-md  h-12     items-center   hover:ring-primary hover:ring-1 active:ring-2 py-2    "
    >
      <Button
        className="w-full max-w-[300px] active:ring-0 focus:ring-0  flex mx-auto  justify-center  relative     "
        variant="ghost"
      >
        <Image
          className="  !absolute left-0 "
          src={icon}
          alt={alt}
          width={iconWidth ?? 20}
          height={iconHeight ?? 20}
        />
        <span className="text-sm font-medium">{text}</span>
      </Button>
    </a>
  );
};

export default SocialLoginItem;
