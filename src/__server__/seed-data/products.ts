const products = [
  {
    item: "Mini Papers",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables"],
    skus: [
      {
        sku: "Mini Papers",
        price: {
          base: 110,
          currency: "USD",
          discount: 9,
        },
        quantity: 16,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/minipeppers-1645950082639.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    tags: ["mini", "peppers"],
  },
  {
    item: "Fresh Strawberry",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables", "Fruits and Vegetables"],
    skus: [
      {
        sku: "Fresh Strawberry",
        price: {
          base: 105,
          currency: "USD",
          discount: 6,
        },
        quantity: 10,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/strawberry-1645952560685.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    tags: ["fresh", "strawberry", "berry"],
  },
  {
    item: "Fresh Orange",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables"],
    skus: [
      {
        sku: "Fresh Orange",
        price: {
          base: 164,
          currency: "USD",
          discount: 11,
        },
        quantity: 20,
        image: [
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/orange-1645950154010.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    tags: ["orange", "fresh", "fruits"],
  },
  {
    item: "Fresh Line",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables"],
    skus: [
      {
        sku: "Fresh Line",
        price: {
          base: 141,
          currency: "USD",
          discount: 12,
        },
        quantity: 19,
        image: [
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/lime-1645952669911.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    tags: ["fruit", "lemon"],
  },
  {
    item: "Red Apple",
    features: ["Fresh", "Without Formaline"],
    categories: ["Breakfast", "Fruits and Vegetables", "Canned Food", "Sauces and Jams"],
    skus: [
      {
        sku: "Red Apple",
        price: {
          base: 145,
          currency: "USD",
          discount: 7,
        },
        quantity: 17,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/red-apple-1645952626839.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    tags: ["apple", "red", "fruits"],
  },
  {
    item: "Lemon",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables"],
    skus: [
      {
        sku: "Lemon",
        price: {
          base: 216,
          currency: "USD",
          discount: 9,
        },
        quantity: 14,
        image: [
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/lemon-1645952585346.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    tags: ["fresh", "lemon", "fruit"],
  },
  {
    item: "Offer Fruits",
    features: ["Fresh", "Without Formaline"],
    categories: ["Vegetables", "", "Fruits and Vegetables"],
    skus: [
      {
        sku: "Offer Fruits",
        price: {
          base: 198,
          currency: "USD",
          discount: 12,
        },
        quantity: 12,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/offer-card-1645952717067.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    tags: ["fruits", "orange", "apple"],
  },
  {
    item: "Fresh China Orange",
    features: ["Fresh", "Without Formaline"],
    categories: ["Fruits and Vegetables", "Organic"],
    skus: [
      {
        sku: "Fresh China Orange",
        price: {
          base: 45,
          currency: "USD",
          discount: 5,
        },
        quantity: 16,
        image: [
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/lemon-1645974005244.png",
          },
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/orange-1645974005246.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    tags: ["orange", "fruits", "fruit", "fresh"],
  },
  {
    item: "Fresh Vegetables",
    features: ["Fresh", "Without Formaline"],
    categories: ["Canned Food", "Fruits and Vegetables"],
    skus: [
      {
        sku: "Yellow Orange",
        price: {
          base: 16,
          currency: "USD",
          discount: 0,
        },
        quantity: 16,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/minipeppers-1645974023116.png",
          },
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/vagitable-1645974023116.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    tags: ["fruit", "yellow", "orange", "lemon"],
  },
  {
    item: "Mega Ssardines",
    features: ["Fresh", "Without Formaline"],
    categories: ["Frozen", "Organic", "Canned Food"],
    skus: [
      {
        sku: "Mega Ssardines",
        price: {
          base: 23,
          currency: "USD",
          discount: 0,
        },
        quantity: 33,
        image: [
          {
            location: "https://bazar-website.s3.ap-south-1.amazonaws.com/21-1647329647760.png",
          },
        ],
        color: [],
        unit: "liter",
      },
    ],
    description: "Mega Ssardines",
    tags: ["tag", "tag2"],
  },
  {
    item: "Saffola Gold Oil",
    features: ["Fresh", "Without Formaline"],
    categories: ["Canned Food", "Organic"],
    skus: [
      {
        sku: "Saffola Gold Oil",
        price: {
          base: 45,
          currency: "USD",
          discount: 6,
        },
        quantity: 34,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/7.saffola-gold-oil-1649336264413.png",
          },
        ],
        color: [],
        unit: "liter",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    tags: [""],
  },
  {
    item: "Thanks a Latte Coffee",
    features: ["Fresh", "Without Formaline"],
    categories: ["Coffee and Snacks", "Breakfast", "Canned Food", "Dairy and Eggs"],
    skus: [
      {
        sku: "Thanks a Latte Coffee",
        price: {
          base: 35,
          currency: "USD",
          discount: 5,
        },
        quantity: 23,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/12.thanksalattecoffee-1649333398724.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    tags: [""],
  },
  {
    item: "Gum Pack",
    features: ["Fresh", "Without Formaline"],
    categories: ["Breakfast", "Dairy and Eggs", "Frozen", "Sauces and Jams"],
    skus: [
      {
        sku: "Gum Pack",
        price: {
          base: 22,
          currency: "USD",
          discount: 5,
        },
        quantity: 12,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/5.gum-pack-1650451490357.png",
          },
        ],
        color: [],
        unit: "",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    tags: [""],
  },
  {
    item: "Premium Grocery Collection",
    features: ["Fresh", "Without Formaline"],
    categories: ["Breakfast", "Frozen", "Dairy and Eggs", "Sauces and Jams", "Fish and Milk"],
    skus: [
      {
        sku: "Premium Grocery Collection",
        price: {
          base: 67,
          currency: "USD",
          discount: 3,
        },
        quantity: 11,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/2.premium-grocery-collection-1653565527079.png",
          },
        ],
        color: [],
        unit: "",
      },
    ],
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
    tags: [""],
  },
  {
    item: "Artidoro Rodriguez Coffee",
    features: ["Fresh", "Without Formaline"],
    categories: ["Coffee and Snacks", "Fish and Milk"],
    skus: [
      {
        sku: "Artidoro Rodriguez Coffee",
        price: {
          base: 13,
          currency: "USD",
          discount: 5,
        },
        quantity: 46,
        image: [
          {
            location:
              "https://bazar-website.s3.ap-south-1.amazonaws.com/16.artidororodriguezcoffee-1649335870991.png",
          },
        ],
        color: [],
        unit: "kg",
      },
    ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    tags: [""],
  },
];

export default products;
