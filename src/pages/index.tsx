import Image from "next/image";
import { Inter } from "next/font/google";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { URLSchema } from "@/lib/zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getPlaylistId } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { URL } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const URL: string | null = params.get("playlist");
      URLSchema.parse(URL);
      let playlistId: string;
      playlistId = getPlaylistId(URL as URL);
      if (playlistId) {
        router.push(`/download/${playlistId}?quality=medium`);
        toast.info("Generating Playlist Downloads...");
      } else {
        toast.error("Error Generating Playlist Downloads...");
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error("Enter a Valid YouTube Playlist URL");
      setIsLoading(false);
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

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="px-4 md:w-[36rem] lg:w-[44rem] lg:px-0">
        <h2 className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-center text-3xl font-bold text-transparent lg:text-6xl">
          Download any YouTube Playlist in a few clicks
        </h2>
        <p className="text-md mt-5 text-center">
          Our easy-to-use tool allows you to download as many YouTube videos as
          you want in only a few clicks. Just create a playlist or paste an
          already existing playlist into the input below and download videos
          immediately.
        </p>
        <div className="mt-5 flex gap-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 p-1">
          <form
            onSubmit={handleSubmit}
            className="flex w-full gap-2 rounded-full bg-background p-1.5"
          >
            <input
              onChange={handleChange}
              className="text-md w-full rounded-l-full bg-transparent py-2.5 pl-4 pr-2 focus:outline-none md:text-xl"
              placeholder="Enter a valid YouTube Playlist"
            />
            <Button
              disabled={isLoading}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-500 px-4 text-sm font-semibold hover:scale-95 active:scale-90 dark:text-white md:px-7 md:text-lg"
            >
              <Download className="mr-2" />
              Download
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
