import { useState } from "react";
import {
  FiArrowLeft,
  FiBell,
  FiMenu,
  FiMic,
  FiSearch,
  FiUpload,
  FiUser,
  FiYoutube,
} from "react-icons/fi";
import { useSidebarContext } from "../../context/SidebarContext";
const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex gap-8 lg:gap-15 justify-between pt-2 mb-6 mx-3">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      
      <form
        className={`gap-4 grow justify-center ${showFullWidthSearch ? "flex" : "hidden md:flex"}`}
      >
        {showFullWidthSearch && (
          <button
            onClick={() => setShowFullWidthSearch(false)}
            className="shrink-0 text-2xl p-2.5 rounded-full "
          >
            <FiArrowLeft />
          </button>
        )}
        <div className="flex grow max-w-150">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-neutral-300 py-1 px-4 text-lg w-full shadow-inner focus:border-green-500 shadow-neutral-200 outline-none"
          />
          <button className="bg-neutral-300 py-2 px-4 rounded-r-full border-l-0 shrink-0 border-neutral-300">
            <FiSearch />
          </button>
        </div>
        <button className="shrink-0 p-2.5 rounded-full bg-neutral-300">
          <FiMic />
        </button>
      </form>
      <div
        className={`items-center gap-3 shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
        <button
          onClick={() => setShowFullWidthSearch(true)}
          className="flex items-center h-10 w-10 md:hidden"
        >
          <FiSearch />
        </button>
        <button className="flex items-center h-10 w-10 md:hidden">
          <FiMic />
        </button>
        <button className="flex items-center h-10 w-10">
          <FiUpload />
        </button>
        <button className="flex items-center h-10 w-10">
          <FiBell />
        </button>
        <button className="flex items-center h-10 w-10">
          <FiUser />
        </button>
      </div>
    </div>
  );
};

export default PageHeader;

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({ hidden = false }: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-2 items-center shrink-0 ${hidden ? "hidden" : "flex"}`}
    >
      <button
        onClick={toggle}
        className="bg-gray-300 w-10 h-10 rounded-full flex items-center p-2.5 text-xl"
      >
        <FiMenu />
      </button>
      <a href="/" className="flex gap-2 items-center font-black text-2xl">
        <FiYoutube className="font-black text-red-600" />
        IceTube
      </a>
    </div>
  );
}
