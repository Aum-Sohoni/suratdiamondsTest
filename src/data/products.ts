export interface Product {
  id: string;
  name: string;
  nameLv: string;
  nameRu: string;
  category: "necklaces" | "rings" | "earrings" | "bracelets";
  price: number;
  image: string;
  images: string[];
  description: string;
  descriptionLv: string;
  descriptionRu: string;
  specifications: {
    carat: string;
    cut: string;
    clarity: string;
    color: string;
    metal: string;
    weight: string;
  };
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "eternal-solitaire-ring",
    name: "Eternal Solitaire Ring",
    nameLv: "Mūžīgais solitēra gredzens",
    nameRu: "Кольцо Вечный солитер",
    category: "rings",
    price: 8500,
    image: "/collection-ring.jpg",
    images: ["/collection-ring.jpg"],
    description: "A timeless solitaire ring featuring a brilliant round diamond set in platinum. The epitome of elegance and commitment.",
    descriptionLv: "Mūžīgs solitēra gredzens ar izcilu apaļu dimantu, ievietotu platīnā. Elegances un apņemšanās iemiesojums.",
    descriptionRu: "Вечное кольцо-солитер с великолепным круглым бриллиантом в платиновой оправе. Воплощение элегантности и преданности.",
    specifications: {
      carat: "1.5ct",
      cut: "Excellent",
      clarity: "VVS1",
      color: "D",
      metal: "Platinum 950",
      weight: "5.2g"
    },
    inStock: true,
    featured: true
  },
  {
    id: "diamond-cascade-necklace",
    name: "Diamond Cascade Necklace",
    nameLv: "Dimantu kaskādes kaklarota",
    nameRu: "Колье Бриллиантовый каскад",
    category: "necklaces",
    price: 12500,
    image: "/collection-necklace.jpg",
    images: ["/collection-necklace.jpg"],
    description: "An exquisite cascade of graduated diamonds set in white gold. A statement piece that captures light from every angle.",
    descriptionLv: "Izsmalcināta graduētu dimantu kaskāde, ievietota baltā zeltā. Iespaidīgs darbs, kas uztver gaismu no katra leņķa.",
    descriptionRu: "Изысканный каскад градуированных бриллиантов в белом золоте. Эффектное украшение, играющее светом со всех сторон.",
    specifications: {
      carat: "3.2ct total",
      cut: "Excellent",
      clarity: "VS1",
      color: "E",
      metal: "18K White Gold",
      weight: "18.5g"
    },
    inStock: true,
    featured: true
  },
  {
    id: "starlight-studs",
    name: "Starlight Diamond Studs",
    nameLv: "Zvaigžņu gaismas auskari",
    nameRu: "Серьги Звездный свет",
    category: "earrings",
    price: 4200,
    image: "/collection-earrings.jpg",
    images: ["/collection-earrings.jpg"],
    description: "Classic diamond stud earrings with a modern twist. Each diamond is hand-selected for maximum brilliance.",
    descriptionLv: "Klasiskās dimantu nagliņas ar modernu pieskārienu. Katrs dimants ir rūpīgi atlasīts maksimālam spožumam.",
    descriptionRu: "Классические серьги-пусеты с бриллиантами с современным акцентом. Каждый камень отобран вручную для максимального сияния.",
    specifications: {
      carat: "1.0ct total",
      cut: "Ideal",
      clarity: "VVS2",
      color: "D",
      metal: "Platinum 950",
      weight: "2.8g"
    },
    inStock: true,
    featured: true
  },
  {
    id: "tennis-elegance-bracelet",
    name: "Tennis Elegance Bracelet",
    nameLv: "Elegantā tenisa aproce",
    nameRu: "Браслет Теннисная элегантность",
    category: "bracelets",
    price: 15800,
    image: "/collection-bracelet.jpg",
    images: ["/collection-bracelet.jpg"],
    description: "A stunning tennis bracelet featuring 42 perfectly matched round diamonds. The ultimate expression of refined luxury.",
    descriptionLv: "Iespaidīga tenisa aproce ar 42 pilnīgi saskaņotiem apaļiem dimantiem. Augstākā izsmalcinātas greznības izpausme.",
    descriptionRu: "Потрясающий теннисный браслет с 42 идеально подобранными круглыми бриллиантами. Высшее выражение утонченной роскоши.",
    specifications: {
      carat: "5.0ct total",
      cut: "Excellent",
      clarity: "VS1",
      color: "E",
      metal: "18K White Gold",
      weight: "12.3g"
    },
    inStock: true,
    featured: true
  },
  {
    id: "halo-princess-ring",
    name: "Halo Princess Ring",
    nameLv: "Halo princeses gredzens",
    nameRu: "Кольцо Принцесса с ореолом",
    category: "rings",
    price: 9800,
    image: "/collection-ring.jpg",
    images: ["/collection-ring.jpg"],
    description: "A stunning princess cut diamond surrounded by a delicate halo of pavé diamonds. A modern classic.",
    descriptionLv: "Iespaidīgs princeses griezuma dimants, ko ieskauj smalks pavé dimantu oreols. Moderna klasika.",
    descriptionRu: "Потрясающий бриллиант огранки «принцесса», окруженный нежным ореолом из паве. Современная классика.",
    specifications: {
      carat: "2.1ct total",
      cut: "Excellent",
      clarity: "VVS2",
      color: "D",
      metal: "Platinum 950",
      weight: "6.1g"
    },
    inStock: true,
    featured: false
  },
  {
    id: "pear-drop-pendant",
    name: "Pear Drop Pendant",
    nameLv: "Piliena formas kulons",
    nameRu: "Кулон Грушевидная капля",
    category: "necklaces",
    price: 7200,
    image: "/collection-necklace.jpg",
    images: ["/collection-necklace.jpg"],
    description: "An elegant pear-shaped diamond pendant that catches the light beautifully. Perfect for any occasion.",
    descriptionLv: "Elegants bumbierveida dimanta kulons, kas skaisti uztver gaismu. Ideāls jebkuram gadījumam.",
    descriptionRu: "Элегантный кулон с грушевидным бриллиантом, красиво играющий светом. Идеален для любого случая.",
    specifications: {
      carat: "1.8ct",
      cut: "Excellent",
      clarity: "VS2",
      color: "E",
      metal: "18K White Gold",
      weight: "4.2g"
    },
    inStock: true,
    featured: false
  },
  {
    id: "chandelier-earrings",
    name: "Chandelier Diamond Earrings",
    nameLv: "Lustras dimantu auskari",
    nameRu: "Серьги Люстра",
    category: "earrings",
    price: 8900,
    image: "/collection-earrings.jpg",
    images: ["/collection-earrings.jpg"],
    description: "Dramatic chandelier earrings featuring cascading diamonds. A show-stopping piece for special occasions.",
    descriptionLv: "Dramatiski lustras auskari ar kaskādveida dimantiem. Iespaidīgs darbs īpašiem gadījumiem.",
    descriptionRu: "Драматичные серьги-люстры с каскадом бриллиантов. Потрясающее украшение для особых случаев.",
    specifications: {
      carat: "2.4ct total",
      cut: "Very Good",
      clarity: "VS1",
      color: "F",
      metal: "Platinum 950",
      weight: "8.6g"
    },
    inStock: true,
    featured: false
  },
  {
    id: "bangle-diamond-bracelet",
    name: "Diamond Bangle Bracelet",
    nameLv: "Dimantu stingra aproce",
    nameRu: "Жесткий браслет с бриллиантами",
    category: "bracelets",
    price: 11200,
    image: "/collection-bracelet.jpg",
    images: ["/collection-bracelet.jpg"],
    description: "A sleek bangle bracelet encrusted with brilliant diamonds. Modern sophistication at its finest.",
    descriptionLv: "Eleganta stingra aproce, rotāta ar mirdzošiem dimantiem. Moderna izsmalcinātība vislabākajā izpausmē.",
    descriptionRu: "Элегантный жесткий браслет, инкрустированный сверкающими бриллиантами. Современная изысканность в лучшем виде.",
    specifications: {
      carat: "3.8ct total",
      cut: "Excellent",
      clarity: "VVS1",
      color: "D",
      metal: "18K White Gold",
      weight: "22.1g"
    },
    inStock: true,
    featured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};