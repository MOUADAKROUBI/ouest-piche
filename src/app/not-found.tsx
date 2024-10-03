import Link from "next/link";
import React from "react";

export default async function NotFound() {
  return (
    <div className="utility-page-wrap">
      <div className="background-video-2 w-background-video w-background-video-atom">
        <video
          id="23e5e4af-4b01-295c-78e5-f458b364f1f5-video"
          autoPlay
          loop
          style={{
            backgroundImage: `url('https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e45098c02d80783f73fc7c_video-poster-00001.jpg')`,
          }}
          muted
          playsInline
          data-object-fit="cover"
        >
          <source src="https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e45098c02d80783f73fc7c_video-transcode.mp4" />
          <source src="https://assets-global.website-files.com/60d4499d6dd4a589a869c2a8/60e45098c02d80783f73fc7c_video-transcode.webm" />
        </video>
      </div>
      <div className="_404-mask"></div>
      <h1 className="main-heading _404">Page Not Found</h1>
      <Link href="/" className="nav-link footer w-inline-block">
        <div className="text-link static">go to homepage</div>
      </Link>
    </div>
  );
}
