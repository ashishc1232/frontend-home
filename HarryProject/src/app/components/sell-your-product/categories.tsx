
export const categories = [
  // { id: "handmade", name: "Handmade", image: "/homepage/box.jpg", hasSubcategories: true },
  // { id: "fashion", name: "Fashion", image: "/homepage/clothing.jpeg", hasSubcategories: true },
  // { id: "home-garden", name: "Home_Garden", image: "/homepage/home-garden.jpeg", hasSubcategories: true },
  // { id: "sports", name: "Sports_Outdoors", image: "/homepage/sports.jpeg", hasSubcategories: true },
  // { id: "books", name: "Books", image: "/homepage/books.jpeg", hasSubcategories: true },
  // { id: "art", name: "Art_Collectibles", image: "/homepage/art.jpeg", hasSubcategories: false },
  // { id: "pets", name: "Pet Supplies", image: "/homepage/pet.jpeg", hasSubcategories: false },
  // { id: "food", name: "Food_Sweets", image: "homePage/heartchoclate.webp", hasSubcategories: false },

  { id: "Food", name: "Food", image: "/homepage/food.jpg", hasSubcategories: true },
  { id: "Clothing", name: "Clothing", image: "/homepage/clothing.jpeg", hasSubcategories: true },
  { id: "Accessories", name: "Accessories", image: "/homepage/accesories.jpg", hasSubcategories: true },
  { id: "Home", name: "Home Decor", image: "/homepage/homedecore1.png", hasSubcategories: true },
  { id: "Organic", name: "Organic and Natural", image: "/homepage/organic1.jpg", hasSubcategories: true },
  { id: "Kids", name: "Kids Special", image: "/homepage/babycloth.jpg", hasSubcategories: true },
  { id: "Gifts", name: "Gifts and Festive", image: "/homepage/gift2.jpg", hasSubcategories: true },
  { id: "Musical", name: "Musical Instruments", image: "/homepage/instrument.jpg", hasSubcategories: true },
  { id: "Handmade", name: "Handmade Footwear", image: "/homepage/footware.jpg", hasSubcategories: true }
]

export const subcategories: Record<string, string[]> = {
 
  Food:["Pickles","Jams and Spreads", "Spices and Masalas","Bakery and Snacks","Chocolates and Sweets"],
  Clothing: ["Men's Clothing", "Dresses and Kurtis","Sarees and Ethnic Wear","Woolen and Crochet Items"],
  Accessories: ["Handmade Jewelry","Bags and Purses"],
  Home: ["Candles","Clay and Ceramic Items","Wall Hangings","Paintings","Wooden Craft","Macrame and Dreamcatchers"],
  Organic: ["Herbal Beauty Products","Essential Oils","Skin Care","Organic Cleaning Products"],
  Kids: ["Baby Clothes","Soft and Wooden Toys","Personalized Accessories"],
  Gifts: ["Gift Hampers","Greeting Cards","Wedding and Festival Decor"],
  Musical: ["Small Tabla", "Flute"],
  Handmade: ["Kolhapuri Chappal", "Jute Sandals"]
}
