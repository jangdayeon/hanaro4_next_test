export type RecipeVersion = {
  id: number; // 각 버전의 고유 ID
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  date: string; // 버전 생성 날짜 (ex: '2024-01-10 12:30:00')
};

export type Recipe = {
  id: number; // 레시피의 고유 ID
  versions: RecipeVersion[]; // 각 레시피의 버전 배열
};

// 예시 레시피 데이터
export const recipes: Recipe[] = [
  {
    id: 1,
    versions: [
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
        date: '2024-01-10 12:30:00',
      },
      {
        id: 2,
        title: 'Spaghetti Bolognese (v2)',
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
          'basil',
        ],
        steps: [
          'Cook spaghetti according to package instructions.',
          'Heat olive oil in a pan, add garlic and onion, and sauté until golden.',
          'Add ground beef and cook until browned.',
          'Pour in tomato sauce, add basil, and season with salt and pepper. Let it simmer for 15 minutes.',
          'Serve the sauce over the cooked spaghetti.',
        ],
        date: '2024-02-15 10:00:00',
      },
    ],
  },
  {
    id: 2,
    versions: [
      {
        id: 1,
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
        date: '2024-01-12 14:20:00',
      },
      {
        id: 2,
        title: 'Chicken Caesar Salad (v2)',
        tags: ['salad', 'chicken', 'lunch'],
        ingredients: [
          'chicken breast',
          'romaine lettuce',
          'Caesar dressing',
          'croutons',
          'parmesan cheese',
          'cherry tomatoes',
        ],
        steps: [
          'Grill or pan-fry the chicken breast until fully cooked, then slice.',
          'Chop the romaine lettuce and place in a bowl.',
          'Add Caesar dressing and toss the lettuce to coat evenly.',
          'Top with sliced chicken, croutons, parmesan cheese, and cherry tomatoes.',
        ],
        date: '2024-03-01 09:15:00',
      },
    ],
  },
  {
    id: 3,
    versions: [
      {
        id: 1,
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
        date: '2024-01-15 18:00:00',
      },
      {
        id: 2,
        title: 'Tacos (v2)',
        tags: ['Mexican', 'snack', 'beef'],
        ingredients: [
          'taco shells',
          'ground beef',
          'lettuce',
          'cheddar cheese',
          'salsa',
          'sour cream',
          'jalapeños',
        ],
        steps: [
          'Cook ground beef in a pan, season with salt and pepper.',
          'Warm the taco shells in the oven for a few minutes.',
          'Assemble tacos by adding ground beef, lettuce, cheese, salsa, sour cream, and jalapeños into each shell.',
        ],
        date: '2024-02-05 19:30:00',
      },
    ],
  },
  {
    id: 4,
    versions: [
      {
        id: 1,
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
        date: '2024-01-20 17:00:00',
      },
      {
        id: 2,
        title: 'Vegetable Stir-fry (v2)',
        tags: ['vegetarian', 'stir-fry', 'dinner'],
        ingredients: [
          'broccoli',
          'carrots',
          'bell peppers',
          'snap peas',
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
        date: '2024-02-10 16:45:00',
      },
    ],
  },
];
