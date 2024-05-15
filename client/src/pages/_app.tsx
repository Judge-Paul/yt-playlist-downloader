import "@/styles/globals.css";
import { TourProvider } from "@reactour/tour";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "sonner";

import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
	const steps = [
		{
			selector: ".first-step",
			content: "Enter a YouTube Playlist and press download.",
		},
	];

	return (
		<>
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-M1JQ6VXFH5"
			/>
			<Script id="google-analytics" strategy="lazyOnload">
				{`
          window.dataLayer = window.dataLayer || []
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-M1JQ6VXFH5', {
            page_path: window.location.pathname,
          })
      `}
			</Script>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<TourProvider steps={steps}>
					<Head>
						<title>YTPlaylistPro - Download YouTube Playlists</title>
						<meta
							name="description"
							content="YTPlaylistPro is a free, easy to use, open source, YouTube playlist downloader, no ads, no signup, very fast."
						/>

						<link rel="icon" href="/favicon.png" />
					</Head>
					<Layout>
						<Toaster richColors position="top-right" />
						<Component {...pageProps} />
					</Layout>
				</TourProvider>
				<Analytics />
				<SpeedInsights />
			</ThemeProvider>
		</>
	);
}
