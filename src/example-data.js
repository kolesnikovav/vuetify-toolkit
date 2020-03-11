export const staticitems = [
  {
    id: 1,
    name: 'Applications :',
    locked: true,
    children: [
      { id: 2, name: 'Calendar : app' },
      { id: 3, name: 'Chrome : app' },
      { id: 4, name: 'Webstorm : app' }
    ]
  },
  {
    id: 5,
    name: 'Documents :',
    children: [
      {
        id: 6,
        name: 'vuetify :',
        children: [
          {
            id: 7,
            name: 'src :',
            children: [
              { id: 8, name: 'index : ts' },
              { id: 9, name: 'bootstrap : ts' }
            ]
          }
        ]
      },
      {
        id: 10,
        name: 'material2 :',
        children: [
          {
            id: 11,
            name: 'src :',
            children: [
              { id: 12, name: 'v-btn : ts' },
              { id: 13, name: 'v-card : ts' },
              { id: 14, name: 'v-window : ts' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 15,
    name: 'Downloads :',
    children: [
      { id: 16, name: 'October : pdf' },
      { id: 17, name: 'November : pdf' },
      { id: 18, name: 'Tutorial : html' }
    ]
  },
  {
    id: 19,
    name: 'Videos :',
    children: [
      {
        id: 20,
        name: 'Tutorials :',
        children: [
          { id: 21, name: 'Basic layouts : mp4' },
          { id: 22, name: 'Advanced techniques : mp4' },
          { id: 23, name: 'All about app : dir' }
        ]
      },
      { id: 24, name: 'Intro : mov' },
      { id: 25, name: 'Conference introduction : avi' }
    ]
  }
]

export const dataGridHeaders = [
  {
    text: 'Dessert (100g serving)',
    align: 'left',
    value: 'name',
    filterable: true,
    sortrable: true
  },
  { text: 'Calories', value: 'calories', filterable: true, sortrable: true, datatype: 'number' },
  { text: 'Fat (g)', value: 'fat', filterable: true },
  { text: 'Carbs (g)', value: 'carbs', sortrable: true },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' }
]

export const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%'
  }
]

export const ofices = [
  {
    name: 'EUROPA',
    children: [
      { name: 'Berlin' },
      { name: 'London' },
      { name: 'Roma' }
    ]
  },
  {
    name: 'USA',
    children: [
      { name: 'New York' },
      { name: 'Seatle' },
      { name: 'Miami' }
    ]
  },
  {
    name: 'ASIA',
    children: [
      { name: 'Tokyo' },
      { name: 'Singapore' }
    ]
  }
]

export const mdvHeaders = [
  {
    text: 'id',
    align: 'left',
    value: 'id'
  },
  { text: 'name', value: 'name', divider: true, filterable: true }
]
