import { useState } from "react";
import "./index.css";

import PageHeader from "./Page/Header/PageHeader";
import Sidebar from "./Page/Header/Sidebar";
import CategoryPills from "./Page/Category/CategoryPills";
import VideoGridItem from "./Page/Data/VideoGridItem";

import { categories, videos } from "./Page/Data/Home";
import SidebarProvider from "./context/SidebarContext";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden">
        {/* Header */}
        <PageHeader />

        {/* Main content */}
        <div className="flex min-h-0 flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Main */}
          <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
            {/* Categories */}
            <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-2 dark:bg-zinc-950">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Videos */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {videos.map((video) => (
                <VideoGridItem
                  key={video.id}
                  {...video}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;