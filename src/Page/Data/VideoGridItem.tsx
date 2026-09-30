import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../../components/utils/FormatDuration";
import { formatTimeAgo } from "../../components/utils/FormatTimeAgo";

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VideoGridItem = ({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (!isVideoPlaying) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Don't attempt to play if there is no video source.
    if (!videoUrl) {
      console.warn(`No videoUrl provided for video: ${id}`);
      return;
    }

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error(`Could not play video: ${videoUrl}`, error);
      }
    };

    playVideo();
  }, [isVideoPlaying, videoUrl, id]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a
        href={`/watch?v=${id}`}
        className="relative block aspect-video overflow-hidden rounded-xl"
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className={`
            block h-full w-full object-cover
            transition-opacity duration-200
            ${isVideoPlaying ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* Video preview */}
        {videoUrl && (
          <video
            ref={videoRef}
            className={`
              absolute inset-0 block h-full w-full
              object-cover transition-opacity duration-200
              ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}
            `}
            muted
            playsInline
            preload="metadata"
            src={videoUrl}
          />
        )}

        {/* Duration */}
        <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-sm text-white">
          {formatDuration(duration)}
        </div>
      </a>

      <div className="flex gap-2">
        {/* Channel image */}
        <a href={`/@${channel.id}`} className="shrink-0">
          <img
            src={channel.profileUrl}
            alt={channel.name}
            className="h-12 w-12 rounded-full"
          />
        </a>

        <div className="flex min-w-0 flex-col">
          {/* Video title */}
          <a
            href={`/watch?v=${id}`}
            className="font-bold line-clamp-2"
          >
            {title}
          </a>

          {/* Channel */}
          <a
            href={`/@${channel.id}`}
            className="text-sm text-gray-400"
          >
            {channel.name}
          </a>

          {/* Views */}
          <div className="text-sm text-gray-500">
            {VIEW_FORMATTER.format(views)} Views •{" "}
            {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGridItem;