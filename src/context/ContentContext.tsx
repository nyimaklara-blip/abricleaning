import { createContext, useContext, ReactNode } from "react";
import { defaultContent } from "@/content/defaults";
import type { SiteContent } from "@/types/content";

interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  refetch: () => void;
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  loading: false,
  refetch: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider
      value={{
        content: defaultContent,
        loading: false,
        refetch: () => {},
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
