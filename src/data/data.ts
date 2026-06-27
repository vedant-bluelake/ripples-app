export type BasketItem = {
  id: string;
  name: string;
  risk: "Low" | "Moderate" | "High";
  riskTag: string;
  horizon: string;
  returns: string;
  rating: number;
  funds: number;
  amcs: number;
  category: string;
  minSip: string;
  tag: string;
  amcList?: string[];
  highlights: { label: string; value: string }[];
  history: { label: string; value: string }[];
};

export const baskets: BasketItem[] = [
  {
    id: "b1",
    name: "Protected Prosperity",
    risk: "Moderate",
    riskTag: "Low to Moderate Risk",
    horizon: "4 - 5 Years",
    returns: "14.89%",
    rating: 5,
    funds: 3,
    amcs: 3,
    category: "Hybrid",
    minSip: "₹5,000",
    tag: "Curated",
    amcList: ["HDFC", "ICICI", "Axis"],
    highlights: [
      { label: "Alpha", value: "2.02%" },
      { label: "Beta", value: "0.94" },
      { label: "Mean", value: "13.33" },
      { label: "SD", value: "6.27" },
      { label: "Sharpe", value: "1.13" },
      { label: "Sortino", value: "1.75" },
      { label: "Mod Dur", value: "4.35" },
      { label: "YTM", value: "5.4" },
    ],
    history: [
      { label: "1M", value: "0.88%" },
      { label: "3M", value: "5.95%" },
      { label: "6M", value: "3.96%" },
      { label: "1Y", value: "6.86%" },
      { label: "3Y", value: "14.77%" },
      { label: "5Y", value: "14.89%" },
      { label: "7Y", value: "11.63%" },
      { label: "10Y", value: "10.71%" },
    ],
  },
  {
    id: "b2",
    name: "Wealth Builder",
    risk: "Moderate",
    riskTag: "Moderate Risk",
    horizon: "5 - 7 Years",
    returns: "18.40%",
    rating: 5,
    funds: 5,
    amcs: 4,
    category: "Equity",
    minSip: "₹5,000",
    tag: "Popular",
    amcList: ["SBI", "Kotak", "Mirae", "Nippon"],
    highlights: [
      { label: "Alpha", value: "3.41%" },
      { label: "Beta", value: "1.02" },
      { label: "Mean", value: "15.10" },
      { label: "SD", value: "8.10" },
      { label: "Sharpe", value: "1.28" },
      { label: "Sortino", value: "1.91" },
      { label: "Mod Dur", value: "—" },
      { label: "YTM", value: "—" },
    ],
    history: [
      { label: "1M", value: "1.42%" },
      { label: "3M", value: "6.75%" },
      { label: "6M", value: "9.40%" },
      { label: "1Y", value: "12.20%" },
      { label: "3Y", value: "17.60%" },
      { label: "5Y", value: "18.40%" },
      { label: "7Y", value: "14.80%" },
      { label: "10Y", value: "12.95%" },
    ],
  },
  {
    id: "b3",
    name: "Aggressive Alpha",
    risk: "High",
    riskTag: "High Risk",
    horizon: "7+ Years",
    returns: "24.70%",
    rating: 4,
    funds: 6,
    amcs: 5,
    category: "Equity",
    minSip: "₹10,000",
    tag: "High Return",
    amcList: ["Quant", "PPFAS", "Edelweiss", "DSP", "Tata"],
    highlights: [
      { label: "Alpha", value: "4.85%" },
      { label: "Beta", value: "1.18" },
      { label: "Mean", value: "19.50" },
      { label: "SD", value: "11.20" },
      { label: "Sharpe", value: "1.42" },
      { label: "Sortino", value: "2.05" },
      { label: "Mod Dur", value: "—" },
      { label: "YTM", value: "—" },
    ],
    history: [
      { label: "1M", value: "2.10%" },
      { label: "3M", value: "8.40%" },
      { label: "6M", value: "12.50%" },
      { label: "1Y", value: "18.30%" },
      { label: "3Y", value: "22.10%" },
      { label: "5Y", value: "24.70%" },
      { label: "7Y", value: "18.40%" },
      { label: "10Y", value: "16.20%" },
    ],
  },
  {
    id: "b4",
    name: "Tax Shield Pro",
    risk: "Moderate",
    riskTag: "Moderate Risk",
    horizon: "3 - 5 Years",
    returns: "15.80%",
    rating: 5,
    funds: 3,
    amcs: 3,
    category: "ELSS",
    minSip: "₹1,500",
    tag: "Tax Saver",
    amcList: ["Mirae", "Axis", "Canara"],
    highlights: [
      { label: "Alpha", value: "2.80%" },
      { label: "Beta", value: "0.98" },
      { label: "Mean", value: "14.20" },
      { label: "SD", value: "7.40" },
      { label: "Sharpe", value: "1.22" },
      { label: "Sortino", value: "1.80" },
      { label: "Mod Dur", value: "—" },
      { label: "YTM", value: "—" },
    ],
    history: [
      { label: "1M", value: "1.05%" },
      { label: "3M", value: "4.80%" },
      { label: "6M", value: "7.10%" },
      { label: "1Y", value: "10.40%" },
      { label: "3Y", value: "14.20%" },
      { label: "5Y", value: "15.80%" },
      { label: "7Y", value: "12.90%" },
      { label: "10Y", value: "11.40%" },
    ],
  },
];

export type PartnerItem = {
  id: string;
  name: string;
  firm: string;
  rating: number;
  aum: string;
  exp: string;
  strategies: number;
  tag: string;
  baskets: BasketItem[];
};

export const partners: PartnerItem[] = [
  {
    id: "p1",
    name: "PADMA",
    firm: "WealthCraft Advisors",
    rating: 0,
    aum: "₹400 Crore",
    exp: "18 years",
    strategies: 12,
    tag: "LOW MODERATE RISK",
    baskets: [
      {
        ...baskets[0],
        id: "p1-b1",
        name: "Low to moderate risk 1",
        risk: "Moderate",
        riskTag: "Low Moderate Risk",
        horizon: "4 - 5 Years",
        category: "Hybrid",
        funds: 3,
        amcs: 3,
        rating: 0,
        returns: "13.02%",
        tag: "MODERATE",
        highlights: [
          { label: "Alpha", value: "1.9%" },
          { label: "Beta", value: "0.94" },
          { label: "Mean", value: "12.5" },
          { label: "SD", value: "5.65" },
          { label: "Sharpe", value: "1.01" },
          { label: "Sortino", value: "1.62" },
          { label: "Mod Dur", value: "4.79" },
          { label: "YTM", value: "5.54" },
        ],
        history: [
          { label: "1M", value: "-0.53%" },
          { label: "3M", value: "1.83%" },
          { label: "6M", value: "1.97%" },
          { label: "1Y", value: "6.96%" },
          { label: "3Y", value: "12.74%" },
          { label: "5Y", value: "13.02%" },
          { label: "7Y", value: "12.21%" },
          { label: "10Y", value: "11.07%" },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "SUNITA CHOPRA",
    firm: "Bluepeak Capital",
    rating: 0,
    aum: "₹25 Crore",
    exp: "10 years",
    strategies: 9,
    tag: "LOW MODERATE RISK",
    baskets: [
      {
        ...baskets[1],
        id: "p2-b1",
        name: "Moderate 1",
        risk: "Moderate",
        riskTag: "Low Moderate Risk",
        horizon: "5 - 7 Years",
        category: "Hybrid",
        funds: 3,
        amcs: 3,
        rating: 0,
        returns: "14.77%",
        tag: "MODERATE",
        highlights: [
          { label: "Alpha", value: "1.84%" },
          { label: "Beta", value: "0.98" },
          { label: "Mean", value: "13.21" },
          { label: "SD", value: "6.33" },
          { label: "Sharpe", value: "1.13" },
          { label: "Sortino", value: "1.83" },
          { label: "Mod Dur", value: "5.16" },
          { label: "YTM", value: "5.14" },
        ],
        history: [
          { label: "1M", value: "0.68%" },
          { label: "3M", value: "5.11%" },
          { label: "6M", value: "4.32%" },
          { label: "1Y", value: "6.41%" },
          { label: "3Y", value: "14.6%" },
          { label: "5Y", value: "14.77%" },
          { label: "7Y", value: "11.58%" },
          { label: "10Y", value: "10.47%" },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "Ravi Iyer",
    firm: "Sage Investments",
    rating: 0,
    aum: "₹64 Crore",
    exp: "14 years",
    strategies: 7,
    tag: "LOW RISK",
    baskets: [{ ...baskets[0], id: "p3-b1", name: "Sage Conservative", tag: "CONSERVATIVE" }],
  },
];

export type MarketBasket = BasketItem & { partner: PartnerItem };

export const marketplaceBaskets: MarketBasket[] = partners.flatMap((p) =>
  p.baskets.map((b) => ({ ...b, partner: p })),
);

export type FundItem = {
  id: string;
  name: string;
  amc: string;
  cat: string;
  asset: "Equity" | "Debt" | "Hybrid";
  subCat: string;
  rating: number | "Unrated";
  nav: string;
  risk: { alpha: string; beta: string; mean: string; sd: string; sharpe: string; sortino: string };
  returns: { label: string; value: string }[];
};

export const funds: FundItem[] = [
  {
    id: "f1",
    name: "360 ONE Balanced Hybrid Fund Reg (G)",
    amc: "360 ONE Mutual Fund",
    cat: "Hybrid: Balanced Hybrid",
    asset: "Hybrid",
    subCat: "Balanced Hybrid",
    rating: "Unrated",
    nav: "12.45",
    risk: { alpha: "0", beta: "0", mean: "0", sd: "0", sharpe: "0", sortino: "0" },
    returns: [
      { label: "1M", value: "-0.59%" },
      { label: "3M", value: "-0.43%" },
      { label: "6M", value: "-1.4%" },
      { label: "1Y", value: "0.7%" },
      { label: "3Y", value: "—" },
      { label: "5Y", value: "—" },
      { label: "7Y", value: "—" },
      { label: "10Y", value: "—" },
    ],
  },
  {
    id: "f2",
    name: "360 One Dynamic Bond Fund Reg (G)",
    amc: "360 ONE Mutual Fund",
    cat: "Debt: Dynamic Bond",
    asset: "Debt",
    subCat: "Dynamic Bond",
    rating: "Unrated",
    nav: "28.95",
    risk: { alpha: "—", beta: "—", mean: "—", sd: "—", sharpe: "—", sortino: "—" },
    returns: [
      { label: "1M", value: "-0.43%" },
      { label: "3M", value: "-0.26%" },
      { label: "6M", value: "0.67%" },
      { label: "1Y", value: "3.21%" },
      { label: "3Y", value: "7.17%" },
      { label: "5Y", value: "6.42%" },
      { label: "7Y", value: "6.73%" },
      { label: "10Y", value: "6.69%" },
    ],
  },
  {
    id: "f3",
    name: "360 One ELSS Tax Saver Nifty 50 Index Fund Reg (G)",
    amc: "360 ONE Mutual Fund",
    cat: "Equity: ELSS",
    asset: "Equity",
    subCat: "ELSS",
    rating: 2,
    nav: "16.42",
    risk: { alpha: "-2.86", beta: "0.86", mean: "11.03", sd: "13.68", sharpe: "0.37", sortino: "0.48" },
    returns: [
      { label: "1M", value: "1.05%" },
      { label: "3M", value: "4.80%" },
      { label: "6M", value: "7.10%" },
      { label: "1Y", value: "10.40%" },
      { label: "3Y", value: "14.20%" },
      { label: "5Y", value: "15.80%" },
      { label: "7Y", value: "—" },
      { label: "10Y", value: "—" },
    ],
  },
  {
    id: "f4",
    name: "HDFC Mid Cap Opportunities",
    amc: "HDFC Mutual Fund",
    cat: "Equity: Mid Cap",
    asset: "Equity",
    subCat: "Mid Cap",
    rating: 5,
    nav: "162.30",
    risk: { alpha: "4.20", beta: "1.05", mean: "22.4", sd: "14.2", sharpe: "1.45", sortino: "2.10" },
    returns: [
      { label: "1M", value: "2.40%" },
      { label: "3M", value: "8.20%" },
      { label: "6M", value: "12.40%" },
      { label: "1Y", value: "18.20%" },
      { label: "3Y", value: "22.40%" },
      { label: "5Y", value: "20.80%" },
      { label: "7Y", value: "17.40%" },
      { label: "10Y", value: "16.20%" },
    ],
  },
  {
    id: "f5",
    name: "Axis Bluechip Fund",
    amc: "Axis Mutual Fund",
    cat: "Equity: Large Cap",
    asset: "Equity",
    subCat: "Large Cap",
    rating: 4,
    nav: "58.42",
    risk: { alpha: "1.80", beta: "0.92", mean: "15.10", sd: "9.40", sharpe: "1.10", sortino: "1.65" },
    returns: [
      { label: "1M", value: "1.20%" },
      { label: "3M", value: "4.50%" },
      { label: "6M", value: "7.80%" },
      { label: "1Y", value: "12.30%" },
      { label: "3Y", value: "15.10%" },
      { label: "5Y", value: "14.40%" },
      { label: "7Y", value: "12.20%" },
      { label: "10Y", value: "11.40%" },
    ],
  },
];