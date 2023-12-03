import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { PlaylistItem } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const apiKey = process.env.API_KEY;
  const baseURL = process.env.BASE_URL;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing playlistId" });
  }

  try {
    const fetchItems = async (pageToken = "") => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${id}&key=${apiKey}&pageToken=${pageToken}`,
      );

      const { items, nextPageToken } = response.data;

      if (!items || items.length === 0) {
        return [];
      }

      const filteredItems: PlaylistItem[] = items.filter(
        (item: PlaylistItem) => {
          return (
            item.snippet.title !== "Private video" &&
            item.snippet.description !== "This video is private."
          );
        },
      );

      const itemsArray = filteredItems;

      if (nextPageToken) {
        const nextItems = await fetchItems(nextPageToken);
        itemsArray.push(...nextItems);
      }

      return itemsArray;
    };

    const allItems = await fetchItems();

    if (allItems.length === 0) {
      return res.status(400).json({ error: "Playlist Not Found" });
    }

    // Make request to get all downloadlinks and add them to the object being sent to the client
    await Promise.all(
      allItems.map(async (item) => {
        const { videoId } = item.snippet.resourceId;
        const response = await axios.get(
          `${baseURL}/api/downloadLinks?videoId=${videoId}`,
        );
        item.downloadLinks = response.data.downloadLinks;
      }),
    );

    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
