export type Product = {
  name: string;
  description: string;
  price: string;
};

export type Category = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  items: Product[];
};

export const categories: Category[] = [
  {
    id: "beef",
    title: "Beef",
    blurb: "Locally sourced, dry-aged where the cut deserves it.",
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Dry-aged beef cuts on a wooden board",
    items: [
      {
        name: "Scotch Fillet",
        description: "Marbled and tender. Perfect on the grill.",
        price: "$44–$55 / kg",
      },
      {
        name: "Eye Fillet",
        description: "The cleanest, leanest cut. Special-occasion meat.",
        price: "$65–$80 / kg",
      },
      {
        name: "Rump Steak",
        description: "Big flavour, honest price. A weeknight hero.",
        price: "$32–$40 / kg",
      },
      {
        name: "T-Bone",
        description: "Two cuts, one bone. Built for the BBQ.",
        price: "$28–$35 / kg",
      },
      {
        name: "Premium Beef Mince",
        description: "Coarse-ground daily. Burgers, bolognese, all the classics.",
        price: "$14–$18 / kg",
      },
      {
        name: "Diced Beef",
        description: "Slow-cook gold. Cubed for stews and curries.",
        price: "$22–$28 / kg",
      },
    ],
  },
  {
    id: "lamb",
    title: "Lamb",
    blurb: "Sweet, grass-fed lamb cut to order.",
    image:
      "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Lamb chops with fresh herbs on a board",
    items: [
      {
        name: "Lamb Cutlets",
        description: "French-trimmed and ready for the grill.",
        price: "$50–$65 / kg",
      },
      {
        name: "Lamb Loin Chops",
        description: "Quick to cook, hard to beat.",
        price: "$28–$38 / kg",
      },
      {
        name: "Leg of Lamb (Roast)",
        description: "Bone-in or butterflied. Sunday roast sorted.",
        price: "$22–$28 / kg",
      },
      {
        name: "Lamb Shoulder",
        description: "Slow-roast 'til it falls apart.",
        price: "$18–$24 / kg",
      },
      {
        name: "Lamb Mince",
        description: "Lean and flavoursome. Perfect for koftas and ragù.",
        price: "$20–$25 / kg",
      },
    ],
  },
  {
    id: "pork",
    title: "Pork",
    blurb: "Free-range when we can get it. Always fresh.",
    image:
      "https://images.unsplash.com/photo-1611059263765-f57653f3bba3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Fresh raw pork cuts in a butcher shop",
    items: [
      {
        name: "Pork Loin Chops",
        description: "Thick-cut. Ask for the bone left in.",
        price: "$18–$25 / kg",
      },
      {
        name: "Pork Belly",
        description: "Skin scored and ready for crackling.",
        price: "$22–$28 / kg",
      },
      {
        name: "Pork Loin Roast",
        description: "Boneless or bone-in. We'll prep it your way.",
        price: "$18–$22 / kg",
      },
      {
        name: "Pork Spare Ribs",
        description: "American-style or sticky Asian — they take a marinade beautifully.",
        price: "$20–$26 / kg",
      },
      {
        name: "Streaky Bacon",
        description: "House-cured. The reason your kitchen smells incredible on Saturdays.",
        price: "$20–$26 / kg",
      },
    ],
  },
  {
    id: "chicken",
    title: "Chicken",
    blurb: "Fresh daily — never frozen.",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Whole fresh chicken with herbs",
    items: [
      {
        name: "Whole Chicken",
        description: "Free-range and ready for the roast tin.",
        price: "$9–$14 / kg",
      },
      {
        name: "Chicken Breast",
        description: "Skinless, boneless, butterfly-cut on request.",
        price: "$16–$22 / kg",
      },
      {
        name: "Chicken Thighs",
        description: "Boneless. The cook's-friend cut.",
        price: "$14–$18 / kg",
      },
      {
        name: "Chicken Drumsticks",
        description: "Family-pack favourites. Marinade-ready.",
        price: "$9–$13 / kg",
      },
      {
        name: "Chicken Wings",
        description: "Whole or split. Friday-night material.",
        price: "$10–$14 / kg",
      },
    ],
  },
  {
    id: "house-made",
    title: "House-Made Specialties",
    blurb: "Made on-site. The reason locals keep coming back.",
    image:
      "https://images.unsplash.com/photo-1601001815853-3835274403b3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "House-made gourmet sausages",
    items: [
      {
        name: "Lamb Schnitzel — Garlic & Rosemary",
        description: "Crumbed, seasoned, ready for the pan.",
        price: "$24–$30 / kg",
      },
      {
        name: "Honey & Macadamia Chicken Scrolls",
        description: "Sweet, nutty, a little bit fancy. Sells out fast.",
        price: "$22–$28 / kg",
      },
      {
        name: "Chicken Kievs",
        description: "Garlic-butter centres. Crumbed and ready.",
        price: "$22–$28 / kg",
      },
      {
        name: "BBQ Rissoles",
        description: "Hand-rolled. The benchmark for backyard burgers.",
        price: "$14–$18 / kg",
      },
      {
        name: "Italiano Meatballs",
        description: "Pork & beef with herbs and parmesan.",
        price: "$16–$20 / kg",
      },
      {
        name: "Beef Wellingtons",
        description: "Made to order — give us 24 hours notice.",
        price: "POA",
      },
      {
        name: "Fresh Pork Sausages",
        description: "Made daily. Real meat, real casings, no nonsense.",
        price: "$14–$18 / kg",
      },
    ],
  },
];
