import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner-native";

export type RiskProfile = "Conservative" | "Moderate" | "Aggressive";
export type ItemKind = "basket" | "partner" | "fund-lumpsum" | "fund-sip";
export type StoredItem = { id: string; kind: ItemKind; name: string; meta: string; amount: string };

type Ctx = {
  cart: StoredItem[];
  wishlist: StoredItem[];
  addToCart: (i: StoredItem) => void;
  addToWishlist: (i: StoredItem) => void;
  removeFromCart: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  inCart: (id: string) => boolean;
  inWishlist: (id: string) => boolean;
  riskProfile: RiskProfile;
  setRiskProfile: (r: RiskProfile) => void;
  tutorialSeen: boolean;
  markTutorialSeen: () => void;
  resetTutorial: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<StoredItem[]>([]);
  const [wishlist, setWishlist] = useState<StoredItem[]>([]);
  const [riskProfile, setRiskProfileState] = useState<RiskProfile>("Moderate");
  const [tutorialSeen, setTutorialSeen] = useState(false);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem("ripples_tutorial_seen");
      if (t === "1") setTutorialSeen(true);
      const r = (await AsyncStorage.getItem("ripples_risk")) as RiskProfile | null;
      if (r) setRiskProfileState(r);
    })();
  }, []);

  const addToCart = (i: StoredItem) => {
    setCart((c) => (c.find((x) => x.id === i.id) ? c : [...c, i]));
    toast.success("Added to cart", { description: i.name });
  };
  const addToWishlist = (i: StoredItem) => {
    setWishlist((c) => (c.find((x) => x.id === i.id) ? c : [...c, i]));
    toast.success("Added to wishlist", { description: i.name });
  };

  return (
    <AppCtx.Provider value={{
      cart, wishlist, addToCart, addToWishlist,
      removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
      removeFromWishlist: (id) => setWishlist((c) => c.filter((x) => x.id !== id)),
      inCart: (id) => cart.some((x) => x.id === id),
      inWishlist: (id) => wishlist.some((x) => x.id === id),
      riskProfile,
      setRiskProfile: (r) => { setRiskProfileState(r); AsyncStorage.setItem("ripples_risk", r); },
      tutorialSeen,
      markTutorialSeen: () => { setTutorialSeen(true); AsyncStorage.setItem("ripples_tutorial_seen", "1"); },
      resetTutorial: () => { setTutorialSeen(false); AsyncStorage.removeItem("ripples_tutorial_seen"); },
    }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
