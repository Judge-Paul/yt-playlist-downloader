import Image from "next/image";
import { Inter } from "next/font/google";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URLSchema } from "@/lib/zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  // https://www.youtube.com/playlist?list=PLDcLgcF8urTLDDfde1p9W5BJxPvWDSlQn
  function handleClick() {
    const URL = params.get("playlist");
    const result = URLSchema.safeParse(URL);
    if (!result.success) {
      toast.error("Enter a Valid YouTube Playlist URL");
    } else {
      toast.success("Downloading Playlist...");
    }
  }
  function handleChange(event: any) {
    const { value } = event.target;
    if (value) {
      router.push(`/?playlist=${value}`);
    } else {
      router.push("/");
    }
  }
  // console.log(
  //   URLSchema.safeParse(
  //     "https://www.youtube.com/playlist?list=PLDcLgcF8urTLDDfde1p9W5BJxPvWDSlQn",
  //   ),
  // );
  // console.log(
  //   URLSchema.safeParse(
  //     "https://youtu.be/playlist?list=PLDcLgcF8urTLDDfde1p9W5BJxPvWDSlQn",
  //   ),
  // );
  // console.log(URLSchema.safeParse("https://www.youtube.com/watch?v=VIDEOID"));
  // console.log(URLSchema.safeParse("invalid-url-format"));
  // console.log(URLSchema.safeParse(""));
  // console.log(
  //   URLSchema.safeParse(
  //     "https://www.youtube.com/playlist?list=PLDcLgcF8urTLDDfde1p9W5BJxPvWDSlQn&index=1",
  //   ),
  // );
  // console.log(
  //   URLSchema.safeParse("https://www.youtube.com/playlist?video=VIDEOID"),
  // );

  return (
    <main>
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="px-4 md:w-[36rem] lg:w-[44rem] lg:px-0">
          <h2 className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-center text-3xl font-bold text-transparent lg:text-6xl">
            Download any YouTube Playlist in a few clicks
          </h2>
          <p className="text-md mt-5 text-center">
            Our easy-to-use tool allows you to download as many YouTube videos
            as you want in only a few clicks. Just create a playlist or paste an
            already existing playlist into the input below and download videos
            immediately.
          </p>
          <div className="mt-5 flex gap-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 p-1">
            <div className="flex w-full gap-2 rounded-full bg-background p-1.5">
              <input
                onChange={handleChange}
                className="text-md w-full rounded-l-full bg-transparent py-2.5 pl-4 pr-2 focus:outline-none md:text-xl"
                placeholder="Enter a valid YouTube Playlist"
              />
              <Button
                onClick={handleClick}
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-4 text-sm font-semibold hover:scale-95 dark:text-white md:px-7 md:text-lg"
              >
                <Download className="mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
