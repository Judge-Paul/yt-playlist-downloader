import { ArrowUpRightSquare, Download } from "lucide-react";
import { VideoCardProps } from "@/types";
import Image from "next/image";
export default function VideoCard({
  thumbnails,
  title,
  description,
}: VideoCardProps) {
  return (
    <div className="mb-2 justify-between gap-3 border border-secondary p-5 sm:flex">
      <Image
        src={thumbnails.default.url}
        width={thumbnails.default.width}
        height={thumbnails.default.height}
        className="h-40 w-full bg-secondary sm:h-28 sm:w-40"
        alt="Example Image"
      />
      {/* <div className="h-40 w-full bg-secondary sm:h-24 sm:w-36"></div> */}
      <div className="mt-3 sm:mt-0 sm:w-3/4">
        <h4 className="line-clamp-2 h-12 w-full font-semibold sm:w-2/3 md:w-1/2">
          {title}
        </h4>
        {/* <div className="h-8 w-full bg-secondary sm:w-2/3 md:w-1/2"></div> */}
        <p className="mt-4 line-clamp-3 h-12 w-full text-xs md:w-2/3">
          {description}
        </p>
      </div>
      <div className="mt-3 flex justify-between sm:flex-col">
        <Download className="h-8 w-8 cursor-pointer hover:scale-[.90] active:scale-[.85]" />
        <ArrowUpRightSquare className="h-8 w-8 cursor-pointer hover:scale-[.90] active:scale-[.85]" />
      </div>
    </div>
  );
}