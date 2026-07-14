export type CategorySeed = {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  gradient: string;
};

export type ProductSeed = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  priceCents: number;
  compareAtCents?: number;
  categorySlug: string;
  emoji: string;
  gradient: string;
  unit: string;
  origin: string;
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  featured: boolean;
  organic: boolean;
  tags: string[];
  imageUrl?: string;
};

export type ReviewSeed = {
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
};

export const categorySeed: CategorySeed[] = [
  {
    name: "Atta, Rice & Grains",
    slug: "atta-rice-grains",
    emoji: "🌾",
    description: "Whole wheat atta, basmati rice and daily-use grains for every kitchen.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Dal & Pulses",
    slug: "dal-pulses",
    emoji: "🫘",
    description: "Toor, moong, chana, masoor — unpolished, clean and sorted pulses.",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    name: "Oils & Ghee",
    slug: "oils-ghee",
    emoji: "🫙",
    description: "Cooking oils, mustard, sunflower and pure desi ghee.",
    gradient: "from-yellow-300 to-amber-400",
  },
  {
    name: "Spices & Masalas",
    slug: "spices-masalas",
    emoji: "🌶️",
    description: "Freshly ground and whole spices, plus ready-to-use masalas.",
    gradient: "from-red-400 to-orange-500",
  },
  {
    name: "Sugar, Salt & Jaggery",
    slug: "sugar-salt",
    description: "Sugar, rock salt, sendha namak and natural gud.",
    emoji: "🧂",
    gradient: "from-stone-300 to-amber-400",
  },
  {
    name: "Tea, Coffee & Beverages",
    slug: "tea-coffee",
    emoji: "☕",
    description: "Premium chai patti, instant coffee, cold drinks and fruit squashes.",
    gradient: "from-amber-700 to-orange-600",
  },
  {
    name: "Biscuits & Snacks",
    slug: "biscuits-snacks",
    emoji: "🍪",
    description: "Tea-time biscuits, chips, namkeen and your favourite munchies.",
    gradient: "from-orange-400 to-rose-400",
  },
  {
    name: "Fresh Produce",
    slug: "fresh-produce",
    emoji: "🥬",
    description: "Daily fresh vegetables, fruits, onions, potatoes and green chillies.",
    gradient: "from-emerald-400 to-lime-500",
  },
  {
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    emoji: "🥛",
    description: "Amul milk, curd, paneer, cheese, white butter and farm eggs.",
    gradient: "from-slate-100 to-yellow-200",
  },
  {
    name: "Bakery & Breakfast",
    slug: "bakery-breakfast",
    emoji: "🍞",
    description: "Bread, pav, buns, poha, rawa, oats and cornflakes.",
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    name: "Personal Care",
    slug: "personal-care",
    emoji: "🧴",
    description: "Soaps, shampoo, toothpaste, creams and daily hygiene essentials.",
    gradient: "from-sky-400 to-pink-400",
  },
  {
    name: "Household & Cleaning",
    slug: "household",
    emoji: "🧹",
    description: "Detergent, dish wash, floor cleaners, agarbatti and pooja items.",
    gradient: "from-cyan-400 to-emerald-400",
  },
];

export const productSeed: ProductSeed[] = [
  // Atta, Rice & Grains
  {
    name: "Ashirwad Whole Wheat Atta",
    slug: "ashirwad-whole-wheat-atta",
    description: "Soft, fluffy rotis every single time.",
    longDescription:
      "Premium whole wheat atta made from hand-picked wheat grains. Ground to the perfect granulation for rotis that stay soft and puffed for hours. 100% whole grain, no maida blend.",
    priceCents: 32900,
    compareAtCents: 35000,
    categorySlug: "atta-rice-grains",
    emoji: "🌾",
    gradient: "from-amber-200 to-orange-300",
    unit: "5 kg pack",
    origin: "India",
    stock: 90,
    rating: 4.7,
    reviewCount: 3,
    badge: "Bestseller",
    featured: true,
    organic: false,
    tags: ["daily", "wheat", "family-pack"],
    imageUrl: "/images/products/ashirwad-atta.jpg",
  },
  {
    name: "India Gate Basmati Rice",
    slug: "india-gate-basmati-rice",
    description: "Long, aromatic grains for biryani & pulao.",
    longDescription:
      "Aged long-grain basmati that fluffs up beautifully, with a delicate aroma. Perfect for biryani, pulao, jeera rice and weekly pulavs. The household favourite.",
    priceCents: 59900,
    categorySlug: "atta-rice-grains",
    emoji: "🍚",
    gradient: "from-yellow-100 to-amber-200",
    unit: "5 kg bag",
    origin: "Haryana",
    stock: 60,
    rating: 4.8,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["basmati", "premium", "biryani"],
    imageUrl: "/images/products/india-gate-rice.jpg",
  },
  {
    name: "Fortune Sona Masoori Rice",
    slug: "fortune-sona-masoori",
    description: "Light, daily-cook rice at a great price.",
    longDescription:
      "Sona masoori is the everyday rice for dal-bhat, curd rice and khichdi. Light, easy to digest and cooks in minutes. A true south-Indian kitchen staple.",
    priceCents: 42900,
    categorySlug: "atta-rice-grains",
    emoji: "🍚",
    gradient: "from-white to-amber-100",
    unit: "5 kg bag",
    origin: "Andhra Pradesh",
    stock: 85,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["daily", "white-rice"],
  },
  {
    name: "Suji / Rawa",
    slug: "suji-rawa",
    description: "Fine rawa for upma, halwa and idli.",
    longDescription:
      "Double-sorted fine suji made from durum wheat. Free from grit, perfect for rawa upma, halwa, idli and even as a substitute for breadcrumbs.",
    priceCents: 7900,
    categorySlug: "atta-rice-grains",
    emoji: "🌾",
    gradient: "from-yellow-100 to-amber-200",
    unit: "1 kg pack",
    origin: "India",
    stock: 120,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["breakfast", "kitchen-staple"],
  },
  {
    name: "Poha (Flattened Rice)",
    slug: "poha-flattened-rice",
    description: "Thick poha for classic kanda-poha breakfast.",
    longDescription:
      "Premium thick-flake poha that doesn't turn mushy. Makes the perfect Maharashtrian kanda poha, poha chivda or dahi-poha. Light and easy to digest.",
    priceCents: 6900,
    categorySlug: "atta-rice-grains",
    emoji: "🍚",
    gradient: "from-yellow-100 to-orange-200",
    unit: "1 kg pack",
    origin: "Madhya Pradesh",
    stock: 140,
    rating: 4.6,
    reviewCount: 2,
    featured: false,
    organic: false,
    tags: ["breakfast", "maharashtrian"],
  },

  // Dal & Pulses
  {
    name: "Toor Dal (Arhar)",
    slug: "toor-dal",
    description: "Oily unpolished toor dal, rich in protein.",
    longDescription:
      "Unpolished toor dal, the everyday dal in most Indian homes. Cooks creamy and delicious, perfect for simple dal tadka, sambar or dal fry. No artificial polish.",
    priceCents: 14900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-yellow-200 to-amber-300",
    unit: "1 kg pack",
    origin: "Karnataka",
    stock: 100,
    rating: 4.7,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["protein", "daily", "unpolished"],
  },
  {
    name: "Moong Dal Yellow",
    slug: "moong-dal-yellow",
    description: "Split & skinned moong dal — light and easy.",
    longDescription:
      "Yellow moong dal cooks fast and is easy on the stomach. Great for dal khichdi, moong-dal halwa, dosa batter or simple comforting dal with ghee rice.",
    priceCents: 13900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-lime-200 to-yellow-300",
    unit: "1 kg pack",
    origin: "Rajasthan",
    stock: 95,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["protein", "light", "khichdi"],
  },
  {
    name: "Chana Dal",
    slug: "chana-dal",
    description: "Nutty, hearty chana dal for fry & vada.",
    longDescription:
      "Bold, nutty split chickpeas. Used in chana dal fry, sundal, besan making, or delicious chana-dal vadas. High in protein and fibre.",
    priceCents: 9900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-yellow-200 to-orange-300",
    unit: "1 kg pack",
    origin: "India",
    stock: 110,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["protein", "daily"],
  },
  {
    name: "Whole Masoor Dal (Red Lentils)",
    slug: "masoor-dal",
    description: "Quick-cooking red lentils, perfect for soups.",
    longDescription:
      "Whole masoor dal cooks quickly and turns into a creamy, comforting bowl. Great for weeknight dal, lentil soups and pairing with steamed rice.",
    priceCents: 11900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-rose-200 to-orange-300",
    unit: "1 kg pack",
    origin: "Madhya Pradesh",
    stock: 100,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["protein", "quick-cook"],
  },
  {
    name: "Kabuli Chana (Chole)",
    slug: "kabuli-chana",
    description: "Large white chickpeas for chole masala.",
    longDescription:
      "Plump, large-kernel kabuli chana. Soak overnight and cook for a classic Punjabi chole, chana masala, or hummus. Whips up fluffy with every grain separate.",
    priceCents: 12900,
    compareAtCents: 14900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-stone-100 to-amber-200",
    unit: "1 kg pack",
    origin: "India",
    stock: 80,
    rating: 4.5,
    reviewCount: 1,
    badge: "Sale",
    featured: false,
    organic: false,
    tags: ["chole", "protein"],
  },
  {
    name: "Rajma (Red Kidney Beans)",
    slug: "rajma-red",
    description: "Jammu-style rajma for rajma-chawal nights.",
    longDescription:
      "Deep red kidney beans, the classic partner for basmati rice. Makes a thick, flavorful rajma masala that tastes best with rice, onion and a squeeze of lime.",
    priceCents: 15900,
    categorySlug: "dal-pulses",
    emoji: "🫘",
    gradient: "from-red-300 to-rose-400",
    unit: "1 kg pack",
    origin: "Jammu & Kashmir",
    stock: 70,
    rating: 4.7,
    reviewCount: 1,
    badge: "Premium",
    featured: true,
    organic: false,
    tags: ["protein", "punjabi"],
  },

  // Oils & Ghee
  {
    name: "Fortune Sunflower Oil",
    slug: "fortune-sunflower-oil",
    description: "Light, heart-friendly cooking oil. 5L can.",
    longDescription:
      "Refined sunflower oil, low in saturated fat and high in vitamin E. Light flavour that lets your spices shine. Great for daily sautéing, frying and tadka.",
    priceCents: 74900,
    categorySlug: "oils-ghee",
    emoji: "🫙",
    gradient: "from-yellow-200 to-amber-300",
    unit: "5 litre can",
    origin: "India",
    stock: 50,
    rating: 4.6,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["cooking-oil", "family-pack", "daily"],
    imageUrl: "/images/products/fortune-oil.jpg",
  },
  {
    name: "Dhara Kachi Ghani Mustard Oil",
    slug: "dhara-mustard-oil",
    description: "Pungent, authentic sarson ka tel for Bengali cooking.",
    longDescription:
      "Cold-pressed kacchi ghani mustard oil with that sharp, authentic flavour. Essential for Bengali fish curries, pickles, sarson ka saag and North Indian cooking.",
    priceCents: 14900,
    categorySlug: "oils-ghee",
    emoji: "🫙",
    gradient: "from-yellow-300 to-amber-400",
    unit: "1 litre bottle",
    origin: "India",
    stock: 75,
    rating: 4.7,
    reviewCount: 2,
    featured: false,
    organic: false,
    tags: ["mustard", "cold-pressed", "regional"],
  },
  {
    name: "Amul Pure Cow Ghee",
    slug: "amul-cow-ghee",
    description: "The golden ghee every grandmother trusts.",
    longDescription:
      "Pure cow ghee made from fresh cream, with that signature rich aroma. Ideal for tadkas, laddoos, halwa, or a spoon on your dal-bhat. A household essential.",
    priceCents: 59900,
    categorySlug: "oils-ghee",
    emoji: "🧈",
    gradient: "from-yellow-200 to-amber-400",
    unit: "1 litre jar",
    origin: "India",
    stock: 55,
    rating: 4.9,
    reviewCount: 2,
    badge: "Bestseller",
    featured: true,
    organic: false,
    tags: ["ghee", "desi", "premium"],
    imageUrl: "/images/products/amul-ghee.jpg",
  },
  {
    name: "Saffola Gold Pro Oil",
    slug: "saffola-gold",
    description: "Heart-healthy blended oil, 1L pouch.",
    longDescription:
      "A heart-healthy blend of rice bran and sunflower oil with oryzanol. Light on the stomach, easy on the conscience. The everyday oil for health-conscious families.",
    priceCents: 15900,
    categorySlug: "oils-ghee",
    emoji: "🫙",
    gradient: "from-amber-200 to-yellow-300",
    unit: "1 litre pouch",
    origin: "India",
    stock: 90,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["heart-healthy", "blended"],
  },

  // Spices & Masalas
  {
    name: "Everest Kitchen King Masala",
    slug: "everest-kitchen-king",
    description: "The masala that makes every sabzi taste amazing.",
    longDescription:
      "The iconic all-in-one sabzi masala. A balanced blend of 20+ spices that turns even a simple aloo-sabzi into something special. A dhaba-style favourite.",
    priceCents: 19900,
    categorySlug: "spices-masalas",
    emoji: "🌶️",
    gradient: "from-red-300 to-orange-400",
    unit: "200 g tin",
    origin: "India",
    stock: 120,
    rating: 4.8,
    reviewCount: 2,
    badge: "Bestseller",
    featured: true,
    organic: false,
    tags: ["masala", "sabzi", "essential"],
    imageUrl: "/images/products/everest-masala.jpg",
  },
  {
    name: "MDH Deggi Mirch",
    slug: "mdh-deggi-mirch",
    description: "Bright red mild chilli powder for curries.",
    longDescription:
      "The classic Deggi Mirch — mild heat, deep red colour. Adds that signature restaurant-style red hue to your curries without setting your mouth on fire.",
    priceCents: 14900,
    categorySlug: "spices-masalas",
    emoji: "🌶️",
    gradient: "from-red-400 to-rose-500",
    unit: "200 g pack",
    origin: "India",
    stock: 130,
    rating: 4.7,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["chilli", "curry"],
  },
  {
    name: "Turmeric Powder (Haldi)",
    slug: "turmeric-powder",
    description: "Pure, bright haldi for everyday cooking.",
    longDescription:
      "High-curcumin turmeric powder, stone-ground and unadulterated. Earthy, warm and an essential part of every Indian kitchen. Anti-inflammatory and golden.",
    priceCents: 9900,
    categorySlug: "spices-masalas",
    emoji: "🟡",
    gradient: "from-yellow-300 to-orange-400",
    unit: "200 g pack",
    origin: "Erode, TN",
    stock: 160,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["haldi", "essential", "healthy"],
  },
  {
    name: "Jeera (Cumin Seeds)",
    slug: "jeera-cumin",
    description: "Bold flavour whole jeera for tadka.",
    longDescription:
      "Clean, bold-flavour cumin seeds. The backbone of every Indian tadka. Dry roast for extra depth or grind fresh into zeera powder.",
    priceCents: 11900,
    categorySlug: "spices-masalas",
    emoji: "🌾",
    gradient: "from-amber-200 to-yellow-300",
    unit: "200 g pack",
    origin: "Rajasthan",
    stock: 150,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["cumin", "tadka", "whole-spice"],
  },
  {
    name: "Kitchen Queen Garam Masala",
    slug: "kitchen-queen-garam-masala",
    description: "Aromatic garam masala to finish every dish.",
    longDescription:
      "Freshly ground warm garam masala — cinnamon, cardamom, cloves, black pepper and more. Sprinkle at the end to add warmth and depth to curries and biryani.",
    priceCents: 13900,
    categorySlug: "spices-masalas",
    emoji: "✨",
    gradient: "from-amber-400 to-orange-500",
    unit: "100 g pack",
    origin: "India",
    stock: 140,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["garam-masala", "finishing"],
  },
  {
    name: "Chaat Masala",
    slug: "chaat-masala",
    description: "Tangy masala for fruits, salads and chaat.",
    longDescription:
      "Zingy, tangy chaat masala with black salt, amchur and roasted cumin. Sprinkle on fruit, papdi chaat, bhel, buttermilk, even on fries. The flavour bomb.",
    priceCents: 7900,
    categorySlug: "spices-masalas",
    emoji: "🥗",
    gradient: "from-rose-200 to-red-300",
    unit: "100 g pack",
    origin: "India",
    stock: 140,
    rating: 4.7,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["chaat", "tangy"],
  },

  // Sugar, Salt & Jaggery
  {
    name: "Madhur Pure Sugar",
    slug: "madhur-pure-sugar",
    description: "Crystal-clear, free-flowing cheeni.",
    longDescription:
      "Pure, sulphur-free sugar refined to a clean, sweet taste. Free-flowing crystals for tea, coffee, desserts and mithai making.",
    priceCents: 44900,
    categorySlug: "sugar-salt",
    emoji: "🍬",
    gradient: "from-white to-stone-200",
    unit: "5 kg pack",
    origin: "India",
    stock: 80,
    rating: 4.6,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["sugar", "family-pack", "essential"],
  },
  {
    name: "Tata Salt Iodized",
    slug: "tata-salt",
    description: "Desh ka namak. Sealed for freshness.",
    longDescription:
      "India's most trusted iodized salt, vacuum evaporated for purity. The correct balance of iodine, iron and everyday flavour. Essential in every kitchen.",
    priceCents: 2400,
    categorySlug: "sugar-salt",
    emoji: "🧂",
    gradient: "from-stone-200 to-blue-200",
    unit: "1 kg pack",
    origin: "India",
    stock: 200,
    rating: 4.8,
    reviewCount: 3,
    featured: true,
    organic: false,
    tags: ["salt", "iodized", "essential"],
  },
  {
    name: "Sendha Namak (Rock Salt)",
    slug: "sendha-namak",
    description: "Pink rock salt for vrat & fasting.",
    longDescription:
      "Pure pink rock salt (sendha namak) used during Navratri and other fasts. Lower in sodium than regular salt and with a distinctive mineral taste.",
    priceCents: 4900,
    categorySlug: "sugar-salt",
    emoji: "🧂",
    gradient: "from-pink-200 to-rose-300",
    unit: "500 g pack",
    origin: "India",
    stock: 100,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["vrat", "rock-salt"],
  },
  {
    name: "Natural Gur (Jaggery)",
    slug: "natural-jaggery",
    description: "Chemical-free, soft gud for sweets.",
    longDescription:
      "Soft, chemical-free jaggery (gur) made from sugarcane. A healthier substitute for sugar in tea, til-laddoos, gur ki roti and payasam.",
    priceCents: 8900,
    categorySlug: "sugar-salt",
    emoji: "🟫",
    gradient: "from-amber-700 to-orange-800",
    unit: "1 kg block",
    origin: "Kolhapur",
    stock: 90,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: true,
    tags: ["jaggery", "natural", "sweetener"],
  },

  // Tea, Coffee & Beverages
  {
    name: "Tata Tea Gold",
    slug: "tata-tea-gold",
    description: "The 7 AM chai of India.",
    longDescription:
      "A carefully blended mix of Assam teas with a handful of tender young leaves. Strong, aromatic, and perfect with milk and sugar — the 7 AM pick-me-up.",
    priceCents: 27900,
    categorySlug: "tea-coffee",
    emoji: "🍵",
    gradient: "from-amber-700 to-orange-800",
    unit: "500 g pack",
    origin: "Assam",
    stock: 130,
    rating: 4.8,
    reviewCount: 2,
    badge: "Bestseller",
    featured: true,
    organic: false,
    tags: ["chai", "daily", "assam"],
    imageUrl: "/images/products/tata-tea-gold.jpg",
  },
  {
    name: "Red Label Brooke Bond Tea",
    slug: "red-label-tea",
    description: "Strong kadak chai for every season.",
    longDescription:
      "India's favourite kadak chai. Blend of Assam and Dooars teas that brews a strong, robust cup to kick-start the morning or welcome evening guests.",
    priceCents: 14900,
    categorySlug: "tea-coffee",
    emoji: "🍵",
    gradient: "from-red-400 to-rose-600",
    unit: "250 g pack",
    origin: "India",
    stock: 180,
    rating: 4.7,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["chai", "kadak", "value"],
  },
  {
    name: "Nescafé Classic Coffee",
    slug: "nescafe-classic",
    description: "Rich instant coffee for hot or cold brew.",
    longDescription:
      "The iconic instant coffee made from premium Robusta beans. Great for morning black coffee, beaten cold coffee with cream, or a quick espresso kick.",
    priceCents: 19900,
    compareAtCents: 22900,
    categorySlug: "tea-coffee",
    emoji: "☕",
    gradient: "from-amber-900 to-stone-800",
    unit: "100 g jar",
    origin: "India",
    stock: 110,
    rating: 4.6,
    reviewCount: 2,
    badge: "Sale",
    featured: true,
    organic: false,
    tags: ["coffee", "instant", "morning"],
  },
  {
    name: "Bru Instant Coffee",
    slug: "bru-instant-coffee",
    description: "Aromatic South Indian blend with chicory.",
    longDescription:
      "Bru is a traditional south-Indian style coffee blended with a hint of chicory for depth. Try it as frothy South Indian filter-style or a quick cold coffee.",
    priceCents: 16900,
    categorySlug: "tea-coffee",
    emoji: "☕",
    gradient: "from-amber-800 to-stone-700",
    unit: "100 g jar",
    origin: "India",
    stock: 100,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["coffee", "south-indian", "chicory"],
  },
  {
    name: "Coca-Cola Original",
    slug: "coca-cola-original",
    description: "The classic chilled refreshment, 2L.",
    longDescription:
      "The real thing, ice-cold Coca-Cola. Perfect for parties, with biryani, or just a hot afternoon sip. The 2-litre family bottle for shared moments.",
    priceCents: 8900,
    categorySlug: "tea-coffee",
    emoji: "🥤",
    gradient: "from-red-400 to-red-700",
    unit: "2 litre bottle",
    origin: "India",
    stock: 120,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["cold-drink", "party"],
  },
  {
    name: "Real Mix Fruit Juice",
    slug: "real-mixed-fruit-juice",
    description: "100% juice, no added preservatives.",
    longDescription:
      "Mixed fruit nectar made from real mangoes, oranges, pineapples, grapes and apples. A wholesome lunch-box option that kids and adults both love.",
    priceCents: 11900,
    categorySlug: "tea-coffee",
    emoji: "🧃",
    gradient: "from-orange-300 to-red-400",
    unit: "1 L tetra pack",
    origin: "India",
    stock: 90,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["juice", "family"],
  },

  // Biscuits & Snacks
  {
    name: "Parle-G Original Gluco Biscuits",
    slug: "parle-gluco-biscuits",
    description: "The world's best-selling biscuit since 1939.",
    longDescription:
      "The iconic Parle-G — the biscuit that's been in every Indian kitchen since 1939. Simple, sweet and the perfect companion for cutting chai. An emotion.",
    priceCents: 1000,
    categorySlug: "biscuits-snacks",
    emoji: "🍪",
    gradient: "from-yellow-200 to-amber-300",
    unit: "80 g pack",
    origin: "India",
    stock: 300,
    rating: 4.9,
    reviewCount: 3,
    badge: "Iconic",
    featured: true,
    organic: false,
    tags: ["biscuit", "chai-time", "classic"],
    imageUrl: "/images/products/parle-g.jpg",
  },
  {
    name: "Britannia Good Day Cashew",
    slug: "good-day-cashew",
    description: "Buttery cashew cookies for a happy tea break.",
    longDescription:
      "Rich, buttery Good Day cookies loaded with real kaju bits. Crunchy, melt-in-mouth and perfect when guests drop by for chai.",
    priceCents: 3000,
    categorySlug: "biscuits-snacks",
    emoji: "🍪",
    gradient: "from-yellow-200 to-orange-300",
    unit: "200 g pack",
    origin: "India",
    stock: 220,
    rating: 4.7,
    reviewCount: 2,
    featured: false,
    organic: false,
    tags: ["cookies", "chai-time"],
  },
  {
    name: "Haldiram's Aloo Bhujia",
    slug: "haldiram-aloo-bhujia",
    description: "Crispy, spicy bhujia for chai-time snacking.",
    longDescription:
      "The legendary aloo bhujia — thin, crispy potato sev dusted with a perfect spice mix. Munch straight, top chaats or serve with chai.",
    priceCents: 5900,
    categorySlug: "biscuits-snacks",
    emoji: "🥨",
    gradient: "from-orange-200 to-red-300",
    unit: "200 g pack",
    origin: "India",
    stock: 200,
    rating: 4.8,
    reviewCount: 2,
    badge: "Bestseller",
    featured: true,
    organic: false,
    tags: ["namkeen", "snacks", "chai-time"],
    imageUrl: "/images/products/haldiram-bhujia.jpg",
  },
  {
    name: "Lay's Classic Salted Chips",
    slug: "lays-classic-salted",
    description: "Light, crispy, wafer-thin potato chips.",
    longDescription:
      "Classic Lay's — light, crispy and sprinkled with just the right amount of salt. The universal munchie for movies, cricket matches and car trips.",
    priceCents: 2000,
    categorySlug: "biscuits-snacks",
    emoji: "🥔",
    gradient: "from-yellow-200 to-amber-300",
    unit: "52 g pack",
    origin: "India",
    stock: 260,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["chips", "crunchy"],
  },
  {
    name: "Uncle Chips Spicy",
    slug: "uncle-chips-spicy",
    description: "The nostalgic spicy wafers everyone loves.",
    longDescription:
      "India's original spicy chips — that bold, desi masala kick that brings back childhood memories. Hearty wafers with an authentic old-school taste.",
    priceCents: 2000,
    categorySlug: "biscuits-snacks",
    emoji: "🌶️",
    gradient: "from-red-300 to-orange-400",
    unit: "52 g pack",
    origin: "India",
    stock: 200,
    rating: 4.7,
    reviewCount: 2,
    badge: "New",
    featured: false,
    organic: false,
    tags: ["chips", "spicy", "nostalgic"],
  },
  {
    name: "Hide & Seek Chocolate Chip",
    slug: "hide-seek-cookies",
    description: "Chocolate chip cookies, perfect with cold milk.",
    longDescription:
      "Thin, crispy cookies baked with generous chocolate chips. Loved by kids and grown-ups alike. Dunk in milk or enjoy as a sweet pick-me-up.",
    priceCents: 4000,
    categorySlug: "biscuits-snacks",
    emoji: "🍪",
    gradient: "from-amber-800 to-orange-700",
    unit: "200 g pack",
    origin: "India",
    stock: 180,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["cookies", "chocolate", "kids"],
  },
  {
    name: "Cadbury Dairy Milk Silk",
    slug: "cadbury-silk",
    description: "Smooth, silky milk chocolate for sweet moments.",
    longDescription:
      "Cadbury Dairy Milk Silk — smoother, richer and more indulgent than the original. The perfect meetha after a meal, or a little gift to a loved one.",
    priceCents: 14900,
    categorySlug: "biscuits-snacks",
    emoji: "🍫",
    gradient: "from-purple-400 to-pink-400",
    unit: "150 g bar",
    origin: "India",
    stock: 150,
    rating: 4.8,
    reviewCount: 2,
    badge: "Sweet",
    featured: true,
    organic: false,
    tags: ["chocolate", "cadbury", "treat"],
  },
  {
    name: "Kurkure Masala Munch",
    slug: "kurkure-masala-munch",
    description: "Spicy, tangy, crunchy puffs.",
    longDescription:
      "Crunchy rice puffs tossed in a zingy masala blend. The all-time favourite desi snack — bold, loud, and full of chatpata flavour.",
    priceCents: 2000,
    categorySlug: "biscuits-snacks",
    emoji: "🧀",
    gradient: "from-orange-400 to-red-500",
    unit: "75 g pack",
    origin: "India",
    stock: 250,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["snacks", "crunchy", "spicy"],
  },

  // Fresh Produce
  {
    name: "Onions",
    slug: "onions",
    description: "Fresh pink onions — kitchen essential.",
    longDescription:
      "Plump, medium-sized pink onions fresh from the mandi. The base of every Indian curry, salad and sambhar. Hand-sorted, no rotten bulbs.",
    priceCents: 3900,
    categorySlug: "fresh-produce",
    emoji: "🧅",
    gradient: "from-rose-200 to-pink-300",
    unit: "1 kg",
    origin: "Nashik",
    stock: 300,
    rating: 4.6,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["essential", "daily", "kitchen"],
  },
  {
    name: "Potatoes",
    slug: "potatoes",
    description: "All-purpose aloo for sabzi, fry & bhaji.",
    longDescription:
      "Farm-fresh potatoes perfect for aloo sabzi, jeera aloo, samosa filling, or dum aloo. Boil, mash, fry, bake — these do it all.",
    priceCents: 2900,
    categorySlug: "fresh-produce",
    emoji: "🥔",
    gradient: "from-yellow-200 to-stone-300",
    unit: "1 kg",
    origin: "Punjab",
    stock: 320,
    rating: 4.5,
    reviewCount: 1,
    featured: true,
    organic: false,
    tags: ["essential", "daily", "kitchen"],
  },
  {
    name: "Tomatoes",
    slug: "tomatoes",
    description: "Red, ripe tamatar for curries & salad.",
    longDescription:
      "Red and ripe hybrid tomatoes, picked firm for a day's ripening at home. Critical for everyday curries, rasam, salad and sandwich.",
    priceCents: 3900,
    categorySlug: "fresh-produce",
    emoji: "🍅",
    gradient: "from-red-300 to-rose-400",
    unit: "1 kg",
    origin: "Pune",
    stock: 200,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["essential", "curry-base"],
  },
  {
    name: "Banana (Robusta)",
    slug: "banana-robusta",
    description: "Sweet yellow bananas, a dozen.",
    longDescription:
      "Naturally ripened yellow Robusta bananas — sweet, filling and a healthy breakfast option. Kids love them, lunch-box friendly.",
    priceCents: 4900,
    categorySlug: "fresh-produce",
    emoji: "🍌",
    gradient: "from-yellow-200 to-amber-300",
    unit: "1 dozen",
    origin: "Jalgaon",
    stock: 100,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["fruit", "daily", "lunchbox"],
  },
  {
    name: "Corriander Leaves (Dhania)",
    slug: "coriander-leaves",
    description: "Fresh green dhania bunch to garnish.",
    longDescription:
      "A fresh bunch of fragrant green coriander, the final flourish on dal, sabzi, chutneys and bhel. Chilled straight to your door for maximum freshness.",
    priceCents: 1000,
    categorySlug: "fresh-produce",
    emoji: "🌿",
    gradient: "from-emerald-200 to-green-300",
    unit: "1 bunch",
    origin: "Local",
    stock: 200,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["fresh", "garnish"],
  },
  {
    name: "Green Chillies (Hari Mirch)",
    slug: "green-chillies",
    description: "Spicy hari mirch for tadka & chutney.",
    longDescription:
      "Fresh, pungent green chillies. Essential for mirchi ka salan, green chutney, or topping up a hot curry. Wash and keep refrigerated.",
    priceCents: 900,
    categorySlug: "fresh-produce",
    emoji: "🌶️",
    gradient: "from-lime-300 to-green-400",
    unit: "250 g",
    origin: "Local",
    stock: 220,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["spice", "essential"],
  },

  // Dairy & Eggs
  {
    name: "Amul Taaza Toned Milk",
    slug: "amul-taaza-milk",
    description: "Daily fresh toned milk pouch.",
    longDescription:
      "Amul Taaza toned milk in the signature blue pouch. Pasteurized and ready to boil for your morning chai, coffee, or drinking glass. The taste of home.",
    priceCents: 2900,
    categorySlug: "dairy-eggs",
    emoji: "🥛",
    gradient: "from-blue-100 to-sky-200",
    unit: "500 ml pouch",
    origin: "Amul",
    stock: 200,
    rating: 4.7,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["milk", "daily", "amul"],
    imageUrl: "/images/products/amul-milk.jpg",
  },
  {
    name: "Amul Curd (Dahi)",
    slug: "amul-curd",
    description: "Thick, set curd in a sealed cup.",
    longDescription:
      "Thick, wholesome set dahi by Amul. Perfect for raita, kadhi, lassi, or just with rice. No gelatine, no thickeners — just real fermented milk.",
    priceCents: 4500,
    categorySlug: "dairy-eggs",
    emoji: "🥛",
    gradient: "from-white to-slate-200",
    unit: "400 g cup",
    origin: "Amul",
    stock: 140,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["dahi", "yogurt", "probiotic"],
  },
  {
    name: "Amul Butter Pasteurised",
    slug: "amul-butter",
    description: "The 'utterly-butterly' classic white butter.",
    longDescription:
      "Amul's iconic salted white butter. Spread it on bread, use for pav bhaji, white sauce pasta, or a dollop on hot parathas. A taste of childhood.",
    priceCents: 5900,
    categorySlug: "dairy-eggs",
    emoji: "🧈",
    gradient: "from-yellow-100 to-amber-200",
    unit: "100 g pack",
    origin: "Amul",
    stock: 160,
    rating: 4.9,
    reviewCount: 2,
    featured: false,
    organic: false,
    tags: ["butter", "bread", "amul"],
  },
  {
    name: "Amul Cheese Slices",
    slug: "amul-cheese-slices",
    description: "10 slices — perfect for sandwiches.",
    longDescription:
      "Classic processed cheese slices, individually wrapped for freshness. Perfect for grilled sandwiches, burgers, cheese toast and kids' tiffins.",
    priceCents: 13900,
    categorySlug: "dairy-eggs",
    emoji: "🧀",
    gradient: "from-yellow-200 to-amber-300",
    unit: "200 g pack",
    origin: "Amul",
    stock: 90,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["cheese", "sandwich", "kids"],
  },
  {
    name: "Farm Fresh Eggs",
    slug: "farm-eggs",
    description: "A dozen brown eggs, high-protein.",
    longDescription:
      "Farm fresh brown eggs from free-range hens. Great for omelettes, egg curry, bhurji, or boiled eggs for breakfast. Cleaned and packed.",
    priceCents: 8900,
    categorySlug: "dairy-eggs",
    emoji: "🥚",
    gradient: "from-amber-100 to-yellow-200",
    unit: "6 pcs",
    origin: "Local farm",
    stock: 100,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["eggs", "protein", "breakfast"],
  },
  {
    name: "Britannia Brown Bread",
    slug: "britannia-brown-bread",
    description: "Soft whole wheat brown bread.",
    longDescription:
      "Soft, freshly sliced brown bread. Great for morning toast, sandwiches for tiffins, or bread pakoras in the evening.",
    priceCents: 4900,
    categorySlug: "bakery-breakfast",
    emoji: "🍞",
    gradient: "from-stone-300 to-amber-400",
    unit: "400 g loaf",
    origin: "Britannia",
    stock: 80,
    rating: 4.3,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["bread", "breakfast", "sandwich"],
  },
  {
    name: "Bread Pav (Pack of 6)",
    slug: "bread-pav",
    description: "Soft, fresh pav for vada pav and pav bhaji.",
    longDescription:
      "A pack of 6 soft dinner pavs. Perfect for Mumbai-style vada pav, pav bhaji, or dabeli. Soft, pillowy and always fresh.",
    priceCents: 4000,
    categorySlug: "bakery-breakfast",
    emoji: "🥖",
    gradient: "from-amber-200 to-orange-300",
    unit: "6 pcs",
    origin: "Local bakery",
    stock: 100,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["pav", "mumbai", "street-food"],
  },
  {
    name: "Kellogg's Corn Flakes",
    slug: "kelloggs-corn-flakes",
    description: "Crispy cornflakes for a quick breakfast.",
    longDescription:
      "Original Kellogg's cornflakes — the classic quick breakfast with cold milk. Crunchy, lightly sweetened and an easy way to start busy mornings.",
    priceCents: 24900,
    categorySlug: "bakery-breakfast",
    emoji: "🥣",
    gradient: "from-yellow-300 to-amber-400",
    unit: "475 g box",
    origin: "India",
    stock: 70,
    rating: 4.4,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["breakfast", "cereal", "kids"],
  },
  {
    name: "Quaker Oats",
    slug: "quaker-oats",
    description: "Rolled oats for porridge & upma.",
    longDescription:
      "Heart-healthy rolled oats. Make savoury oats upma, sweet porridge with milk and fruits, or add to smoothies. A fibre-packed start to the day.",
    priceCents: 19900,
    categorySlug: "bakery-breakfast",
    emoji: "🥣",
    gradient: "from-stone-200 to-amber-200",
    unit: "500 g pack",
    origin: "India",
    stock: 80,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["oats", "healthy", "fibre"],
  },

  // Personal Care
  {
    name: "Lifebuoy Total 10 Soap",
    slug: "lifebuoy-soap",
    description: "Germ-protection bathing soap pack of 5.",
    longDescription:
      "The trusted red Lifebuoy soap for the whole family. Kills 99.9% germs, fresh scent, and keeps skin feeling clean. Value pack of 5 bars.",
    priceCents: 17900,
    categorySlug: "personal-care",
    emoji: "🧼",
    gradient: "from-red-400 to-rose-500",
    unit: "5 x 125 g",
    origin: "HUL",
    stock: 110,
    rating: 4.6,
    reviewCount: 2,
    featured: true,
    organic: false,
    tags: ["soap", "family-pack", "germ-protection"],
  },
  {
    name: "Colgate Strong Teeth Toothpaste",
    slug: "colgate-toothpaste",
    description: "Cavity protection toothpaste, 200g.",
    longDescription:
      "The original Colgate toothpaste with calcium boost for strong teeth and a fresh mouth. India's most trusted toothpaste brand for generations.",
    priceCents: 13900,
    categorySlug: "personal-care",
    emoji: "🪥",
    gradient: "from-red-400 to-red-600",
    unit: "200 g tube",
    origin: "Colgate",
    stock: 140,
    rating: 4.7,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["toothpaste", "oral-care"],
  },
  {
    name: "Clinic Plus Shampoo",
    slug: "clinic-plus-shampoo",
    description: "Milk protein shampoo for strong, long hair.",
    longDescription:
      "Clinic Plus, enriched with milk proteins for healthy, strong hair. Gentle enough for everyday use for the whole family. The trusted blue bottle.",
    priceCents: 16900,
    categorySlug: "personal-care",
    emoji: "🧴",
    gradient: "from-pink-300 to-rose-400",
    unit: "340 ml bottle",
    origin: "HUL",
    stock: 95,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["shampoo", "hair-care", "family"],
  },
  {
    name: "Surf Excel Easy Wash Detergent",
    slug: "surf-excel-detergent",
    description: "Removes tough stains easily, 2 kg pack.",
    longDescription:
      "Surf Excel detergent powder removes 100+ tough stains without harming clothes. Lemon fresh scent, works on both coloured and white garments.",
    priceCents: 34900,
    categorySlug: "household",
    emoji: "🧺",
    gradient: "from-blue-300 to-indigo-400",
    unit: "2 kg pack",
    origin: "HUL",
    stock: 90,
    rating: 4.6,
    reviewCount: 1,
    featured: true,
    organic: false,
    tags: ["detergent", "laundry", "family-pack"],
  },
  {
    name: "Vim Dishwash Gel Lemon",
    slug: "vim-dishwash",
    description: "Cuts grease, leaves no residue, 750 ml.",
    longDescription:
      "The classic yellow Vim dishwash gel with real lemon. Cuts tough grease and burnt-on masala in one scrub. Gentle on hands, tough on dishes.",
    priceCents: 14900,
    categorySlug: "household",
    emoji: "🧽",
    gradient: "from-yellow-300 to-lime-400",
    unit: "750 ml bottle",
    origin: "HUL",
    stock: 120,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["dishwash", "kitchen"],
  },
  {
    name: "Lizol Floor Cleaner Citrus",
    slug: "lizol-floor-cleaner",
    description: "Kills 99.9% germs, fresh citrus scent.",
    longDescription:
      "Lizol disinfectant floor cleaner. Kills 99.9% germs and leaves a pleasant citrus fragrance. Works on tiles, marble, granite and mosaic floors.",
    priceCents: 18900,
    categorySlug: "household",
    emoji: "🧹",
    gradient: "from-cyan-300 to-emerald-400",
    unit: "975 ml bottle",
    origin: "India",
    stock: 80,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["floor-cleaner", "disinfectant"],
  },
  {
    name: "Agarbatti (Incense Sticks)",
    slug: "agarbatti",
    description: "Fragrant pooja agarbatti, sandalwood scent.",
    longDescription:
      "A pack of 50 sandalwood-scented agarbattis for daily pooja and meditation. Leaves a calm, lingering fragrance throughout the home.",
    priceCents: 5000,
    categorySlug: "household",
    emoji: "🕯️",
    gradient: "from-orange-200 to-amber-400",
    unit: "pack of 50",
    origin: "India",
    stock: 200,
    rating: 4.6,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["pooja", "fragrance", "home"],
  },
  {
    name: "Good Knight Mosquito Repellent Refill",
    slug: "good-knight-refill",
    description: "45-night liquid refill for machine.",
    longDescription:
      "A Good Knight Gold Flash mosquito repellent refill. 45 nights of protection from mosquitoes carrying dengue and malaria. Baby-safe formula.",
    priceCents: 8900,
    categorySlug: "household",
    emoji: "🦟",
    gradient: "from-lime-300 to-emerald-400",
    unit: "45 ml refill",
    origin: "Godrej",
    stock: 130,
    rating: 4.5,
    reviewCount: 1,
    featured: false,
    organic: false,
    tags: ["mosquito", "household", "protection"],
  },
];

// Build dynamic review counts
export const reviewSeed: ReviewSeed[] = [
  // Ashirwad Atta
  { productSlug: "ashirwad-whole-wheat-atta", author: "Suman M.", rating: 5, title: "Soft rotis every time!", body: "Mere parivar ko bahut pasand hai. Roi naram aur hui bahut hi achhi banti hai. 2 saal se ye hi le rahe hain.", verified: true },
  { productSlug: "ashirwad-whole-wheat-atta", author: "Rahul P.", rating: 5, title: "Authentic test", body: "Good quality atta, no mix of maida. Chapatis stay soft in tiffin too.", verified: true },
  { productSlug: "ashirwad-whole-wheat-atta", author: "Anita D.", rating: 4, title: "Great value", body: "Good 5kg pack, lasts us 2 weeks. Consistent quality.", verified: true },

  // India Gate Basmati
  { productSlug: "india-gate-basmati-rice", author: "Fatima K.", rating: 5, title: "Biryani ke liye perfect", body: "Dane lambe aur khushbudaar hain. Biryani aur pulao dono mein zabardast banta hai.", verified: true },
  { productSlug: "india-gate-basmati-rice", author: "Kiran B.", rating: 5, title: "Best basmati", body: "Ageing sahi hai, khilke bante hain chawal. We keep buying this.", verified: true },

  // Sona masoori
  { productSlug: "fortune-sona-masoori", author: "Divya R.", rating: 5, title: "Everyday rice", body: "Light rice for dal-bhat. Good taste, reasonable price.", verified: true },

  // Toor dal
  { productSlug: "toor-dal", author: "Vijay S.", rating: 5, title: "Unpolished and clean", body: "No artificial polish, daal mein consistency acchi hai. Tadka dal ke liye best.", verified: true },
  { productSlug: "toor-dal", author: "Meena T.", rating: 4, title: "Good quality", body: "Dal jaldi galti hai aur swad bhi achha hai.", verified: true },

  // Moong
  { productSlug: "moong-dal-yellow", author: "Priya N.", rating: 5, title: "Favourite khichdi dal", body: "Khichdi and moong-dal halwa dono ke liye perfect. Fresh stock.", verified: true },

  // Chana dal
  { productSlug: "chana-dal", author: "Arvind K.", rating: 4, title: "Good for sundal", body: "Uniform sized dals, no stones. Sundal and vada came out great.", verified: true },

  // Masoor
  { productSlug: "masoor-dal", author: "Kavita L.", rating: 4, title: "Quick cook", body: "Cooks in 10 minutes for a quick weeknight dinner.", verified: true },

  // Kabuli chana
  { productSlug: "kabuli-chana", author: "Neha P.", rating: 5, title: "Fluffy chole", body: "Chole banae, har dana alag aur full phula tha. Sale price mein liya, bonus!", verified: true },

  // Rajma
  { productSlug: "rajma-red", author: "Harjot S.", rating: 5, title: "Punjabi rajma!", body: "Authentic Jammu rajma. Rajma-chawal ban gaya yaadgaar.", verified: true },

  // Sunflower oil
  { productSlug: "fortune-sunflower-oil", author: "Sneha R.", rating: 5, title: "Kitchen staple", body: "Light oil, sabzi aur frying dono ke liye. 5L can lasts the whole month.", verified: true },
  { productSlug: "fortune-sunflower-oil", author: "Mohan V.", rating: 4, title: "Good value", body: "Reliable brand, no odd smell or taste. Repurchase karunga.", verified: true },

  // Mustard oil
  { productSlug: "dhara-mustard-oil", author: "Animesh G.", rating: 5, title: "Sarson ka tel is best", body: "Original pungent smell, machher jhol ke liye number one!", verified: true },
  { productSlug: "dhara-mustard-oil", author: "Rekha D.", rating: 4, title: "Authentic", body: "Kacchi ghani ka real taste, achar banane mein bhi use kiya.", verified: true },

  // Ghee
  { productSlug: "amul-cow-ghee", author: "Shobha K.", rating: 5, title: "Amul ghee is amul ghee", body: "Kuch nahi kahna, ye har desi ghar ki shaan hai. Daal aur laddu dono mein superb.", verified: true },
  { productSlug: "amul-cow-ghee", author: "Karthik V.", rating: 5, title: "Pure aroma", body: "Aate hi poore ghar mein khushboo fel gayi. Bohot accha ghee.", verified: true },

  // Saffola
  { productSlug: "saffola-gold", author: "Deepak M.", rating: 4, title: "Healthier pick", body: "Doctor's advice pe switch kiya. Taste compromise nahi hai.", verified: true },

  // Everest
  { productSlug: "everest-kitchen-king", author: "Madhuri P.", rating: 5, title: "Sabzi ka jaan!", body: "Is masale se har sabzi mein woh dhaba jaisa swad aa jata hai. Must have.", verified: true },
  { productSlug: "everest-kitchen-king", author: "Sachin T.", rating: 5, title: "All-in-one masala", body: "When you can't bother with 10 different masalas, this is the one.", verified: true },

  // Deggi mirch
  { productSlug: "mdh-deggi-mirch", author: "Anju B.", rating: 5, title: "Perfect colour, mild heat", body: "Curry ko laal rang deti hai par zyada teekhi nahi. Sahi balance hai.", verified: true },

  // Haldi
  { productSlug: "turmeric-powder", author: "Divya K.", rating: 5, title: "Pure haldi", body: "Natural colour, no adulteration. Haldi-doodh ke liye bhi use karti hoon.", verified: true },

  // Jeera
  { productSlug: "jeera-cumin", author: "Ramesh V.", rating: 5, title: "Fresh jeera", body: "Clean seeds, strong aroma. Tadka aur roast dono mein achha.", verified: true },

  // Garam masala
  { productSlug: "kitchen-queen-garam-masala", author: "Poonam S.", rating: 4, title: "Good aroma", body: "End mein sprinkle karne se biryani mein baat aa jati hai.", verified: true },

  // Chaat masala
  { productSlug: "chaat-masala", author: "Farah A.", rating: 5, title: "Magical masala!", body: "Fruit salad aur aloo chaat pe chidak ke dekhiye, zayka badal jata hai.", verified: true },

  // Sugar
  { productSlug: "madhur-pure-sugar", author: "Ritu M.", rating: 5, title: "Crystal clean cheeni", body: "Sulphur-free, clean taste. Chai aur mithai dono ke liye perfect.", verified: true },
  { productSlug: "madhur-pure-sugar", author: "Bharat T.", rating: 4, title: "Good 5kg pack", body: "Monthly grocery ka hissa hai. Free flowing crystals.", verified: true },

  // Tata salt
  { productSlug: "tata-salt", author: "Vikram R.", rating: 5, title: "Desh ka namak", body: "Iodized, fine quality. Iske bina kirana list hi adhuri hai.", verified: true },
  { productSlug: "tata-salt", author: "Komal S.", rating: 5, title: "Always in stock", body: "1 kg pack perfect for a week. Sealed pack, no moisture issues.", verified: true },
  { productSlug: "tata-salt", author: "Sameer P.", rating: 4, title: "Trustworthy", body: "Kabhi bhi quality issue nahi aaya. Bachpan se Tata hi use karte hain.", verified: true },

  // Sendha namak
  { productSlug: "sendha-namak", author: "Asha V.", rating: 5, title: "Vrat ke liye perfect", body: "Navratri mein upvaas ke liye yehi rakha hai. Pure pink salt.", verified: true },

  // Jaggery
  { productSlug: "natural-jaggery", author: "Mahesh D.", rating: 5, title: "Soft and clean", body: "Gur ki roti ke liye perfect. Chemical free hai, taste bhi natural.", verified: true },

  // Tata Tea Gold
  { productSlug: "tata-tea-gold", author: "Rekha J.", rating: 5, title: "Humari subah ki chai!", body: "Har ghar ki pehchaan. Kadak aur mehekti chai banti hai.", verified: true },
  { productSlug: "tata-tea-gold", author: "Anil K.", rating: 4, title: "Solid chai patti", body: "Reliable strong Assam blend. Milk ke saath best.", verified: true },

  // Red label
  { productSlug: "red-label-tea", author: "Geeta S.", rating: 5, title: "Kadak chai", body: "Mehmaan aaye to Red Label hi best hai. Strong aur colour achha.", verified: true },

  // Nescafe
  { productSlug: "nescafe-classic", author: "Rohit P.", rating: 5, title: "Morning lifeline", body: "Without this I can't start work. Smooth, strong instant coffee.", verified: true },
  { productSlug: "nescafe-classic", author: "Sana D.", rating: 4, title: "Sale me liya", body: "Good offer, fresh stock. Cold coffee mein bhi achha.", verified: true },

  // Bru
  { productSlug: "bru-instant-coffee", author: "Lakshmi R.", rating: 4, title: "South Indian touch", body: "Chicory hint se coffee aur bhi rich lagti hai. Filter style taste.", verified: true },

  // Coke
  { productSlug: "coca-cola-original", author: "Aarav M.", rating: 5, title: "Party essential", body: "Thandi coke aur biryani ka combination sona hai.", verified: true },

  // Real juice
  { productSlug: "real-mixed-fruit-juice", author: "Nidhi V.", rating: 4, title: "Kids love it", body: "Lunchbox mein bhejti hoon. Real fruits ka taste hai.", verified: true },

  // Parle-G
  { productSlug: "parle-gluco-biscuits", author: "Amit S.", rating: 5, title: "Ek emotion hai ye!", body: "Bachpan se lekar aaj tak — chai ke saath Parle-G nahi toh kya? Sabse sasta aur sabse achha.", verified: true },
  { productSlug: "parle-gluco-biscuits", author: "Kavita R.", rating: 5, title: "Ghar mein hamesha rehta hai", body: "Mehmaan aayein, bachhon ko bhook lage, chaye akeli ho — ye biscuit har waqt ka saathi hai.", verified: true },
  { productSlug: "parle-gluco-biscuits", author: "Rahul K.", rating: 5, title: "Affordable and tasty", body: "Itne kam price mein itna taste. No other biscuit comes close.", verified: true },

  // Good day
  { productSlug: "good-day-cashew", author: "Pooja M.", rating: 4, title: "Buttery cookies", body: "Real cashew pieces hai, chai ke saath perfect.", verified: true },
  { productSlug: "good-day-cashew", author: "Vishal N.", rating: 5, title: "Tea time favourite", body: "Crunchy and buttery, guests love it too.", verified: true },

  // Aloo bhujia
  { productSlug: "haldiram-aloo-bhujia", author: "Deepika B.", rating: 5, title: "Bhujia is top class", body: "Haldiram ki bhujia ka koi tod nahi. Samosa-chai ke saath mazaa aa gaya.", verified: true },
  { productSlug: "haldiram-aloo-bhujia", author: "Manoj T.", rating: 5, title: "Fresh and crispy", body: "Sealed pack fresh. Spices are balanced, not too salty.", verified: true },

  // Lays
  { productSlug: "lays-classic-salted", author: "Aditya R.", rating: 4, title: "Simple and crispy", body: "Classic chips, always works for movie nights.", verified: true },

  // Uncle Chips
  { productSlug: "uncle-chips-spicy", author: "Krishna P.", rating: 5, title: "Childhood yaad dila di", body: "Bohot din baad khayein, wohi old school spicy waala taste. Waah!", verified: true },
  { productSlug: "uncle-chips-spicy", author: "Tanvi V.", rating: 4, title: "Nostalgic and spicy", body: "Patakha flavour hai, same as I remember.", verified: true },

  // Hide & Seek
  { productSlug: "hide-seek-cookies", author: "Ishita S.", rating: 5, title: "Kids finish them instantly", body: "Chocolate chips generous hote hain. Doodh ke saath best combo.", verified: true },

  // Silk
  { productSlug: "cadbury-silk", author: "Shivani M.", rating: 5, title: "Silk hai toh sab kuch hai", body: "Smooth and velvety. Shaadi ki mithai se bhi accha lagta hai kabhi kabhi!", verified: true },
  { productSlug: "cadbury-silk", author: "Aryan K.", rating: 5, title: "Gift quality", body: "Diwali pe gift di, sabne tareef ki. Premium packaging.", verified: true },

  // Kurkure
  { productSlug: "kurkure-masala-munch", author: "Neeraj P.", rating: 4, title: "Chatpata snack", body: "Tea-time ke liye perfect masala munch.", verified: true },

  // Onion
  { productSlug: "onions", author: "Sunita V.", rating: 5, title: "Fresh and firm", body: "Pyaz fresh the, koi sadha hua nahi tha. Size bhi medium perfect hai.", verified: true },
  { productSlug: "onions", author: "Imran K.", rating: 4, title: "Stable kitchen onion", body: "Quality is consistent. Curries ke liye must.", verified: true },

  // Potato
  { productSlug: "potatoes", author: "Ravi M.", rating: 5, title: "Verse aloo!", body: "Big, firm potatoes. Aloo sabzi aur poori aloo dono achhe bane.", verified: true },

  // Tomato
  { productSlug: "tomatoes", author: "Lata S.", rating: 4, title: "Ripe and juicy", body: "Tamatar fresh the, curry mein achha colour aaya.", verified: true },

  // Banana
  { productSlug: "banana-robusta", author: "Jyoti P.", rating: 5, title: "Perfectly ripe", body: "Sweet and spot-on for kids' tiffins.", verified: true },

  // Dhania
  { productSlug: "coriander-leaves", author: "Meera K.", rating: 4, title: "Fresh bunch", body: "Hari dhania fresh thi, garnish ke liye achhi.", verified: true },

  // Green chilli
  { productSlug: "green-chillies", author: "Nitin R.", rating: 5, title: "Teekhi hai bhai!", body: "Proper teekhi hari mirch. Chutney mein amazing.", verified: true },

  // Amul milk
  { productSlug: "amul-taaza-milk", author: "Nisha T.", rating: 5, title: "Amul hai, trusted hai", body: "Subah ki chai ke liye roz ka yehi pouch. Fresh malai aati hai.", verified: true },
  { productSlug: "amul-taaza-milk", author: "Rajesh K.", rating: 4, title: "Reliable", body: "Daily pouch, taste consistent hai. Kabhi phata nahi.", verified: true },

  // Dahi
  { productSlug: "amul-curd", author: "Smriti N.", rating: 5, title: "Thick dahi", body: "Raita aur lassi dono ke liye perfect. Gaddha dahi hai.", verified: true },

  // Butter
  { productSlug: "amul-butter", author: "Kabir S.", rating: 5, title: "Utterly butterly!", body: "Pav bhaji par lagao ya parathe par — Amul butter ka koi jawab nahi.", verified: true },
  { productSlug: "amul-butter", author: "Meera P.", rating: 5, title: "Childhood taste", body: "Same nostalgic taste for decades. Breakfast staple.", verified: true },

  // Cheese slices
  { productSlug: "amul-cheese-slices", author: "Priti A.", rating: 4, title: "Kid-approved", body: "Sandwiches ke liye perfect slices. Bachhe hamesha maangte hain.", verified: true },

  // Eggs
  { productSlug: "farm-eggs", author: "Kartik V.", rating: 5, title: "Fresh eggs", body: "Omelette fluffy bana, shells bhi strong the. Good protein.", verified: true },

  // Brown bread
  { productSlug: "britannia-brown-bread", author: "Sonia G.", rating: 4, title: "Healthier than white", body: "Soft slices, toast achha banta hai.", verified: true },

  // Pav
  { productSlug: "bread-pav", author: "Vilas D.", rating: 5, title: "Vada pav ke liye lajawaab", body: "Soft pav the, vada pav aur pav bhaji dono ke liye perfect.", verified: true },

  // Cornflakes
  { productSlug: "kelloggs-corn-flakes", author: "Aakansha R.", rating: 4, title: "Quick breakfast", body: "Bachon ko doodh ke saath bahut pasand hai.", verified: true },

  // Oats
  { productSlug: "quaker-oats", author: "Shalini M.", rating: 5, title: "Healthy breakfast", body: "Oats upma banaya, tasty and filling. Good fibre source.", verified: true },

  // Lifebuoy
  { productSlug: "lifebuoy-soap", author: "Kusum S.", rating: 5, title: "Poore parivaar ka soap", body: "5 pack value for money. Germ protection aur fresh scent.", verified: true },
  { productSlug: "lifebuoy-soap", author: "Vikas P.", rating: 4, title: "Trusted brand", body: "Bachpan se ghar mein yehi chalta aa raha hai.", verified: true },

  // Colgate
  { productSlug: "colgate-toothpaste", author: "Meenakshi R.", rating: 5, title: "Dentist recommended", body: "10+ saal se yehi use kar rahe hain. Fresh breath and strong teeth.", verified: true },

  // Clinic Plus
  { productSlug: "clinic-plus-shampoo", author: "Arti S.", rating: 4, title: "Silky hair", body: "Silky aur soft baan hote hain. Family ke liye perfect size.", verified: true },

  // Surf Excel
  { productSlug: "surf-excel-detergent", author: "Anuradha V.", rating: 5, title: "Stain chala jaata hai!", body: "Bachhon ke uniform ke grass stain bhi nikal gaye. Lemon scent is fresh.", verified: true },

  // Vim
  { productSlug: "vim-dishwash", author: "Santosh K.", rating: 5, title: "Grease easily removes", body: "Poori theli ki ghee masala ki kadchiyon ko ek baar mein saaf kar diya.", verified: true },

  // Lizol
  { productSlug: "lizol-floor-cleaner", author: "Renu B.", rating: 5, title: "Fresh home", body: "Poore ghar mein citrus fragrance rehti hai. Germ protection bhi.", verified: true },

  // Agarbatti
  { productSlug: "agarbatti", author: "Hemlata M.", rating: 5, title: "Pooja essential", body: "Chandan ki khushboo acchi hai, pooja ke time use karti hoon.", verified: true },

  // Good Knight
  { productSlug: "good-knight-refill", author: "Pranav S.", rating: 4, title: "Works well", body: "Machchar nahi aate, raat ko neend achhi aati hai.", verified: true },
];
