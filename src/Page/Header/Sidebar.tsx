import React, { useState, type ElementType, type ReactNode } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiFilm,
  FiHome,
  FiRepeat,
} from "react-icons/fi";
import {
  BiHistory,
  BiLibrary,
  BiMusic,
  BiPodcast,
  BiRadio,
  BiShoppingBag,
  BiTrophy,
  BiVideoPlus,
} from "react-icons/bi";
import {
  FaClock,
  FaGamepad,
  FaLightbulb,
  FaNewspaper,
  FaShirt,
  FaVideo,
} from "react-icons/fa6";
import { IoFlame, IoVideocam } from "react-icons/io5";

import { playlists, subscriptions } from "../Data/sidebar";
import { useSidebarContext } from "../../context/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const SmallSidebarItem = ({
  Icon,
  title,
  url,
}: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className="ghost flex flex-col items-center gap-1 rounded-lg py-4"
    >
      <Icon className="h-5 w-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
};

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      {/* Small sidebar */}
      <aside
        className={`
          sticky top-0 ml-1 flex w-15 shrink-0 flex-col
          justify-center overflow-hidden overscroll-none
          pb-4 scrollbar-hidden
          ${isLargeOpen ? "lg:hidden" : "lg:flex"}
          ${isSmallOpen ? "hidden" : "flex"}
        `}
      >
        <SmallSidebarItem
          Icon={FiHome}
          title="Home"
          url="/"
        />

        <SmallSidebarItem
          Icon={FiRepeat}
          title="Shorts"
          url="/shorts"
        />

        <SmallSidebarItem
          Icon={BiVideoPlus}
          title="Subscribe"
          url="/subscriptions"
        />

        <SmallSidebarItem
          Icon={BiLibrary}
          title="Library"
          url="/library"
        />
      </aside>

      {/* Mobile overlay */}
      {isSmallOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-[998] bg-gray-950/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Large sidebar */}
      <aside
        className={`
          fixed top-0 z-[999] flex h-screen w-56 flex-col
          overflow-y-auto gap-2 bg-white px-2 pb-4
          scrollbar-hidden dark:bg-zinc-950

          lg:sticky lg:z-auto lg:h-auto

          ${isLargeOpen ? "lg:flex" : "lg:hidden"}
          ${isSmallOpen ? "flex" : "hidden"}
        `}
      >
        {/* Header inside mobile sidebar */}
        <div className="sticky top-0 bg-white px-2 pb-4 pt-2 dark:bg-zinc-950 lg:hidden">
          <PageHeaderFirstSection />
        </div>

        {/* Main */}
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={FiHome}
            title="Home"
            url="/"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiVideoPlus}
            title="Subscribe"
            url="/subscriptions"
          />
        </LargeSidebarSection>

        <hr />

        {/* You */}
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={BiLibrary}
            title="Library"
            url="/library"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiHistory}
            title="History"
            url="/history"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaVideo}
            title="Your Videos"
            url="/your-videos"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaClock}
            title="Watch Later"
            url="/playlist?list=WL"
          />

          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={IoVideocam}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>

        <hr />

        {/* Subscriptions */}
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>

        <hr />

        {/* Explore */}
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={IoFlame}
            title="Trending"
            url="/trending"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiShoppingBag}
            title="Shopping"
            url="/shopping"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiMusic}
            title="Music"
            url="/music"
          />

          <LargeSidebarItem
            IconOrImgUrl={FiFilm}
            title="Movies & TV"
            url="/movies-tv"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiRadio}
            title="Live"
            url="/live"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaGamepad}
            title="Gaming"
            url="/gaming"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaNewspaper}
            title="News"
            url="/news"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiTrophy}
            title="Sports"
            url="/sports"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaLightbulb}
            title="Learning"
            url="/learning"
          />

          <LargeSidebarItem
            IconOrImgUrl={FaShirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />

          <LargeSidebarItem
            IconOrImgUrl={BiPodcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default Sidebar;

/* -------------------------------------------------------------------------- */
/* Large Sidebar Section                                                     */
/* -------------------------------------------------------------------------- */

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = React.Children.toArray(children);

  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const showExpandButton =
    childrenArray.length > visibleItemCount;

  const ButtonIcon = isExpanded
    ? FiChevronUp
    : FiChevronDown;

  return (
    <div>
      {title && (
        <div className="mb-1 ml-4 mt-2 text-lg">
          {title}
        </div>
      )}

      {visibleChildren}

      {showExpandButton && (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          className="ghost flex w-full flex-row items-center gap-4 rounded-lg p-3"
        >
          <ButtonIcon className="h-6 w-6" />

          <div>
            {isExpanded ? "Show Less" : "Show More"}
          </div>
        </button>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Large Sidebar Item                                                        */
/* -------------------------------------------------------------------------- */

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

const LargeSidebarItem = ({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={`
        ghost mb-3 flex w-full flex-row
        items-center gap-4 rounded-lg p-3
        ${isActive ? "bg-gray-100 font-bold dark:bg-zinc-800" : ""}
      `}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img
          src={IconOrImgUrl}
          alt={`${title} channel`}
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <IconOrImgUrl className="h-5 w-6 shrink-0" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
};