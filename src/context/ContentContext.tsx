import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("id", 1)
        .single();
      if (error) throw error;
      return data?.data as SiteContent;
    },
    // Fall back to defaults silently if Supabase is not configured
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Deep merge: stored data overrides defaults, but missing top-level keys fall back.
  // Special cases:
  // - hero: if Supabase row pre-dates the bullets field, use defaults entirely (migration)
  // - images.christaPortrait / images.dreamTeam: forced to "" so local bundled assets
  //   are always used (Supabase storage is full; new uploads not possible right now)
  // Ensure hero images always has 3 slots so all 3 local fallback slides are used
  const heroImages = (() => {
    const stored = data?.images?.hero ?? [];
    const slots = Math.max(stored.length, 4);
    return Array.from({ length: slots }, (_, i) => stored[i] ?? "");
  })();

  // Merge products: keep Supabase products (richer content) and append any products
  // from defaults that Supabase doesn't have yet (e.g. HD7)
  const mergedProducts = (() => {
    const supabaseProducts = data?.product?.products ?? [];
    const supabaseIds = new Set(supabaseProducts.map((p) => p.id));
    const newProducts = defaultContent.product.products.filter((p) => !supabaseIds.has(p.id));
    return [...supabaseProducts, ...newProducts];
  })();

  const mergedContent: SiteContent = data
    ? {
        ...defaultContent,
        ...data,
        // Hero: if Supabase pre-dates the bullets field, fall back to local defaults
        hero: data.hero?.bullets?.length
          ? { ...defaultContent.hero, ...data.hero }
          : defaultContent.hero,
        // Images: use Supabase logo (valid), force portrait/dreamTeam to "" so local
        // bundled assets are used (Supabase storage is full)
        images: {
          ...defaultContent.images,
          ...data.images,
          hero: heroImages,
          christaPortrait: "",
          dreamTeam: "",
        },
        product: {
          ...defaultContent.product,
          ...data.product,
          products: mergedProducts,
        },
        footer: {
          ...defaultContent.footer,
          ...data.footer,
        },
        team: data.team ?? defaultContent.team,
        header: {
          ...defaultContent.header,
          ...data.header,
          // Remove "Start" nav item — it's redundant (logo click goes home)
          navItems: (data.header?.navItems ?? defaultContent.header.navItems)
            .filter((item) => item.label !== "Start"),
        },
      }
    : defaultContent;

  return (
    <ContentContext.Provider
      value={{
        content: mergedContent,
        loading: isLoading,
        refetch,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
