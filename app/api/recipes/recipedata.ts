export type recipe = {
  id: number;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export const recipes: recipe[] = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    tags: ['pasta', 'Italian', 'dinner'],
    ingredients: [
      'spaghetti',
      'ground beef',
      'onion',
      'garlic',
      'tomato sauce',
      'olive oil',
      'salt',
      'pepper',
    ],
    steps: [
      'Cook spaghetti according to package instructions.',
      'Heat olive oil in a pan, add garlic and onion, and sauté until golden.',
      'Add ground beef and cook until browned.',
      'Pour in tomato sauce and season with salt and pepper. Let it simmer for 15 minutes.',
      'Serve the sauce over the cooked spaghetti.',
    ],
  },
  {
    id: 2,
    title: 'Chicken Caesar Salad',
    tags: ['salad', 'chicken', 'lunch'],
    ingredients: [
      'chicken breast',
      'romaine lettuce',
      'Caesar dressing',
      'croutons',
      'parmesan cheese',
    ],
    steps: [
      'Grill or pan-fry the chicken breast until fully cooked, then slice.',
      'Chop the romaine lettuce and place in a bowl.',
      'Add Caesar dressing and toss the lettuce to coat evenly.',
      'Top with sliced chicken, croutons, and parmesan cheese.',
    ],
  },
  {
    id: 3,
    title: 'Tacos',
    tags: ['Mexican', 'snack', 'beef'],
    ingredients: [
      'taco shells',
      'ground beef',
      'lettuce',
      'cheddar cheese',
      'salsa',
      'sour cream',
    ],
    steps: [
      'Cook ground beef in a pan, season with salt and pepper.',
      'Warm the taco shells in the oven for a few minutes.',
      'Assemble tacos by adding ground beef, lettuce, cheese, salsa, and sour cream into each shell.',
    ],
  },
  {
    id: 4,
    title: 'Vegetable Stir-fry',
    tags: ['vegetarian', 'stir-fry', 'dinner'],
    ingredients: [
      'broccoli',
      'carrots',
      'bell peppers',
      'soy sauce',
      'garlic',
      'ginger',
      'sesame oil',
    ],
    steps: [
      'Chop the vegetables into bite-sized pieces.',
      'Heat sesame oil in a pan, add garlic and ginger, and stir-fry for a minute.',
      'Add the vegetables and stir-fry for 5-7 minutes until they are tender-crisp.',
      'Add soy sauce and toss to coat the vegetables evenly. Serve hot.',
    ],
  },
];
