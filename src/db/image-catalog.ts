import catalogImagesJson from "./catalog-images.json";

export const catalogImages = catalogImagesJson as Record<string, string>;

const productSpecificImages: Record<string, string> = {
  tomatoes: "https://images.pexels.com/photos/4247701/pexels-photo-4247701.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "banana-robusta": "https://images.pexels.com/photos/2907454/pexels-photo-2907454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "green-chillies": "https://images.pexels.com/photos/32446431/pexels-photo-32446431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "shimla-apples": "https://images.pexels.com/photos/34949143/pexels-photo-34949143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  carrots: "https://images.pexels.com/photos/29880869/pexels-photo-29880869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "green-capsicum": "https://images.pexels.com/photos/29631459/pexels-photo-29631459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "farm-eggs": "https://images.pexels.com/photos/9331862/pexels-photo-9331862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "amul-paneer-fresh": "https://images.pexels.com/photos/29631461/pexels-photo-29631461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "mother-dairy-lassi": "https://images.pexels.com/photos/36183642/pexels-photo-36183642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "milky-mist-curd-bucket": "https://images.pexels.com/photos/29699511/pexels-photo-29699511.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "bread-pav": "https://images.pexels.com/photos/32807693/pexels-photo-32807693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "britannia-brown-bread": "https://images.pexels.com/photos/31744871/pexels-photo-31744871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "modern-sandwich-bread": "https://images.pexels.com/photos/31744871/pexels-photo-31744871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "maggi-2-minute-noodles": "https://images.pexels.com/photos/18698263/pexels-photo-18698263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "marie-gold-biscuits": "https://images.pexels.com/photos/34979322/pexels-photo-34979322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "britannia-cake-rusk": "https://images.pexels.com/photos/38377147/pexels-photo-38377147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "thums-up-soft-drink": "https://images.pexels.com/photos/11942007/pexels-photo-11942007.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "real-mixed-fruit-juice": "https://images.pexels.com/photos/37515883/pexels-photo-37515883.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "green-tea-bags": "https://images.pexels.com/photos/33094634/pexels-photo-33094634.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "dove-beauty-bar": "https://images.pexels.com/photos/16329382/pexels-photo-16329382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "head-shoulders-shampoo": "https://images.pexels.com/photos/18066458/pexels-photo-18066458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "clinic-plus-shampoo": "https://images.pexels.com/photos/18066458/pexels-photo-18066458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "dettol-handwash-original": "https://images.pexels.com/photos/16329382/pexels-photo-16329382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "scotch-brite-scrub-pad": "https://images.pexels.com/photos/9230397/pexels-photo-9230397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

const photoPools: Record<string, string[]> = {
  "atta-rice-grains": [
    "https://images.pexels.com/photos/8108012/pexels-photo-8108012.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/8108216/pexels-photo-8108216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/8108057/pexels-photo-8108057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/4224266/pexels-photo-4224266.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "dal-pulses": [
    "https://images.pexels.com/photos/8108102/pexels-photo-8108102.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/4224259/pexels-photo-4224259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/4224250/pexels-photo-4224250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/8108064/pexels-photo-8108064.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "spices-masalas": [
    "https://images.pexels.com/photos/12419503/pexels-photo-12419503.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/37830084/pexels-photo-37830084.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/8108004/pexels-photo-8108004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "sugar-salt": [
    "https://images.pexels.com/photos/21582446/pexels-photo-21582446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/4224250/pexels-photo-4224250.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "tea-coffee": [
    "https://images.pexels.com/photos/35285855/pexels-photo-35285855.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/6007666/pexels-photo-6007666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/9329429/pexels-photo-9329429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "biscuits-snacks": [
    "https://images.pexels.com/photos/21582447/pexels-photo-21582447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/34979322/pexels-photo-34979322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/5946428/pexels-photo-5946428.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "fresh-produce": [
    "/images/hero-groceries.jpg",
    "https://images.pexels.com/photos/4247701/pexels-photo-4247701.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/29880869/pexels-photo-29880869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "dairy-eggs": [
    "https://images.pexels.com/photos/36183642/pexels-photo-36183642.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/29699511/pexels-photo-29699511.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/9331862/pexels-photo-9331862.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "bakery-breakfast": [
    "https://images.pexels.com/photos/31744871/pexels-photo-31744871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/17236198/pexels-photo-17236198.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/8108216/pexels-photo-8108216.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  "personal-care": [
    "https://images.pexels.com/photos/18066458/pexels-photo-18066458.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/16329382/pexels-photo-16329382.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/20382236/pexels-photo-20382236.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
  household: [
    "https://images.pexels.com/photos/9230462/pexels-photo-9230462.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/9230357/pexels-photo-9230357.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
    "https://images.pexels.com/photos/21582448/pexels-photo-21582448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800",
  ],
};

const keepIllustrated = new Set([
  "dhara-mustard-oil",
  "saffola-gold",
  "organic-groundnut-oil",
  "parachute-coconut-oil",
  "sesame-til-oil",
  "amul-butter",
  "bournvita-health-drink",
]);

function hash(value: string) {
  return Array.from(value).reduce((total, character) => {
    return (total * 31 + character.charCodeAt(0)) >>> 0;
  }, 0);
}

export function getFallbackProductImage(product: {
  slug: string;
  categorySlug: string;
}) {
  if (productSpecificImages[product.slug]) return productSpecificImages[product.slug];
  if (keepIllustrated.has(product.slug)) return null;
  const pool = photoPools[product.categorySlug];
  if (!pool?.length) return null;
  return pool[hash(product.slug) % pool.length];
}
