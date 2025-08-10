import { ICompanyData, IReservation, IReview } from './model';

/**
 * company data mock for testing purposes
 * - this mock data is used to simulate the company data in the application
 * - it includes the company name, address, phone, email, start and end time, min and max persons per class, price per person, and max days in future
 * - it is used to test the booking engine state and the booking form component
 */
export const companyDataMock: ICompanyData = {
  name: 'Cooking Class Plitvice',
  googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
  address: 'Mukinje 33, Plitvička jezera',
  phone: '+385 91 9146693',
  email: 'cooking.class.plitvice@gmail.com',
  startTime: '17:00',
  endTime: '21:00',
  minPersonsPerClass: 2,
  maxPersonsPerClass: 12,
  preparationTimeInHours: 24,
  pricePerPerson: 80,
};

/**
 * reservations mock for testing purposes
 * - this mock data is used to simulate the reservations in the application
 * - it includes a list of reservations with name, email, phone, date, guests, status, and message
 * - it is used to test the booking engine state and the booking form component
 * - it can be used to display the reservations in the admin page or in the booking form
 * - it is a simple and effective way to provide sample data for testing purposes
 */
export const reservationsMock: IReservation[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+385 91 1234567',
    date: '06.08.2025.',
    guests: 4,
    status: 'WAITING_FOR_CONFIRMATION',
    message: 'Looking forward to the class!',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+385 91 7654321',
    date: '07.08.2025.',
    guests: 2,
    status: 'CONFIRMED',
    message: "Can't wait for the class!",
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+385 91 9876543',
    date: '08.08.2025.',
    guests: 2,
    status: 'CANCELED',
    message: "Can't wait for the class!",
  },
  {
    id: '4',
    name: 'Mary Peterson',
    email: 'mary.peterson@example.com',
    phone: '+385 91 6543210',
    date: '20.08.2025.',
    guests: 3,
    status: 'WAITING_FOR_CONFIRMATION',
    message: 'Excited for the class!',
  },
];

/**
 * manually excluded days mock for testing purposes
 * - this mock data is used to simulate the manually excluded days in the application
 * - it includes a list of dates that are manually excluded for booking
 */
export const manuallyExcludedDaysMock: string[] = [
  '25.08.2025.',
  '26.08.2025.',
  '28.08.2025.',
];

/** * completely booked days mock for testing purposes
 * - this mock data is used to simulate the completely booked days in the application
 * - it includes a list of dates that are completely booked and cannot be reserved
 * - it is used to test the booking engine state and the booking form component
 * - it can be used to display the completely booked days in the admin page or in the booking form
 */
export const completelyBookedDaysMock: string[] = ['29.08.2025.'];

/**
 * reviews mock for testing purposes
 * - this mock data is used to simulate the reviews in the application
 * - it includes a list of reviews with name, email, rating, and review text
 * - it is used to test the reviews component and display user feedback
 * - the reviews can be used to showcase the quality of the cooking classes and attract new customers
 * - it is a simple and effective way to provide social proof and build trust with potential customers
 * - the reviews can be displayed in a carousel or a list format on the website
 * - it is important to ensure that the reviews are genuine and reflect real customer experiences
 */
export const reviewsMockExtensive: IReview[] = [
  {
    id: '1',
    author: 'John Doe',
    email: 'john.doe@example.com',
    rating: 5,
    comment: 'Amazing cooking class! Highly recommend.',
    status: 'PUBLISHED',
  },
  {
    id: '2',
    author: 'Jane Smith',
    email: 'jane.smith@example.com',
    rating: 4,
    comment:
      'What a wonderful cooking class experience! I learned so many traditional Croatian recipes and cooking techniques that I never knew before. The instructor was patient and knowledgeable, explaining each step clearly and making sure everyone understood the process. The ingredients were fresh and locally sourced, which really enhanced the flavors of the dishes we prepared. The atmosphere was warm and welcoming, and I loved how we got to enjoy the meal we cooked together at the end. I would definitely recommend this class to anyone wanting to learn authentic Croatian cuisine in a beautiful setting near Plitvice Lakes.',
    status: 'PUBLISHED',
  },
  {
    id: '3',
    author: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    rating: 3,
    comment: 'It was okay, but I expected more hands-on time.',
    status: 'PUBLISHED',
  },
  {
    id: '4',
    author: 'Mary Peterson',
    email: 'mary.peterson@example.com',
    rating: 5,
    comment: 'Best cooking class ever! Will come again.',
    status: 'PUBLISHED',
  },
  {
    id: '5',
    author: 'Bob Brown',
    email: 'bob.brown@example.com',
    rating: 4,
    comment: 'Great class, but the location was hard to find.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '6',
    author: 'Charlie White',
    email: 'charlie.white@example.com',
    rating: 5,
    comment: 'Fantastic class! Learned so much.',
    status: 'PUBLISHED',
  },
  {
    id: '7',
    author: 'Diana Green',
    email: 'diana.green@example.com',
    rating: 5,
    comment: 'Loved the class! The instructor was very knowledgeable.',
    status: 'PUBLISHED',
  },
  {
    id: '8',
    author: 'Ethan Blue',
    email: 'ethan.blue@example.com',
    rating: 5,
    comment: 'Incredible experience! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '9',
    author: 'Fiona Yellow',
    email: 'fiona.yellow@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '10',
    author: 'George Black',
    email: 'george.black@example.com',
    rating: 5,
    comment: 'Outstanding class! I gained so much knowledge.',
    status: 'REJECTED',
  },
  {
    id: '11',
    author: 'Hannah Pink',
    email: 'hannah.pink@example.com',
    rating: 5,
    comment: 'Loved the class! The instructor was very knowledgeable.',
    status: 'PUBLISHED',
  },
  {
    id: '12',
    author: 'Ian Orange',
    email: 'ian.orange@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '13',
    author: 'Julia Purple',
    email: 'julia.purple@example.com',
    rating: 5,
    comment: 'Amazing class! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '14',
    author: 'Kevin Gray',
    email: 'kevin.gray@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '15',
    author: 'Laura Cyan',
    email: 'laura.cyan@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '16',
    author: 'Michael Red',
    email: 'michael.red@example.com',
    rating: 5,
    comment: 'Outstanding class! I gained so much knowledge.',
    status: 'PUBLISHED',
  },
  {
    id: '17',
    author: 'Nina Silver',
    email: 'nina.silver@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
    status: 'PUBLISHED',
  },
  {
    id: '18',
    author: 'Oliver Stone',
    email: 'oliver.stone@example.com',
    rating: 4,
    comment: 'Delicious food and great company!',
    status: 'PUBLISHED',
  },
  {
    id: '19',
    author: 'Petra Gold',
    email: 'petra.gold@example.com',
    rating: 5,
    comment: 'Perfect introduction to Croatian cuisine.',
    status: 'PUBLISHED',
  },
  {
    id: '20',
    author: 'Quinn Brown',
    email: 'quinn.brown@example.com',
    rating: 3,
    comment: 'Good class but a bit rushed.',
    status: 'PUBLISHED',
  },
  {
    id: '21',
    author: 'Rachel White',
    email: 'rachel.white@example.com',
    rating: 5,
    comment: 'Amazing recipes, will cook them at home!',
    status: 'PUBLISHED',
  },
  {
    id: '22',
    author: 'Steve Black',
    email: 'steve.black@example.com',
    rating: 4,
    comment: 'Very authentic experience.',
    status: 'PUBLISHED',
  },
  {
    id: '23',
    author: 'Tina Green',
    email: 'tina.green@example.com',
    rating: 5,
    comment: 'Best way to explore local cuisine.',
    status: 'PUBLISHED',
  },
  {
    id: '24',
    author: 'Uma Blue',
    email: 'uma.blue@example.com',
    rating: 4,
    comment: 'Fun and educational!',
    status: 'PUBLISHED',
  },
  {
    id: '25',
    author: 'Victor Red',
    email: 'victor.red@example.com',
    rating: 5,
    comment: 'Exceeded all expectations.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '26',
    author: 'Wendy Yellow',
    email: 'wendy.yellow@example.com',
    rating: 4,
    comment: 'Great for beginners like me.',
    status: 'PUBLISHED',
  },
  {
    id: '27',
    author: 'Xavier Pink',
    email: 'xavier.pink@example.com',
    rating: 5,
    comment: 'Wonderful local ingredients.',
    status: 'PUBLISHED',
  },
  {
    id: '28',
    author: 'Yara Orange',
    email: 'yara.orange@example.com',
    rating: 3,
    comment: 'Nice but could be longer.',
    status: 'PUBLISHED',
  },
  {
    id: '29',
    author: 'Zoe Purple',
    email: 'zoe.purple@example.com',
    rating: 5,
    comment: 'Absolutely loved it!',
    status: 'PUBLISHED',
  },
  {
    id: '30',
    author: 'Adam Gray',
    email: 'adam.gray@example.com',
    rating: 4,
    comment: 'Great team building activity.',
    status: 'PUBLISHED',
  },
  {
    id: '31',
    author: 'Bella Cyan',
    email: 'bella.cyan@example.com',
    rating: 5,
    comment: 'Perfect date night activity.',
    status: 'PUBLISHED',
  },
  {
    id: '32',
    author: 'Carlos Silver',
    email: 'carlos.silver@example.com',
    rating: 4,
    comment: 'Learned traditional techniques.',
    status: 'REJECTED',
  },
  {
    id: '33',
    author: 'Dana Gold',
    email: 'dana.gold@example.com',
    rating: 5,
    comment: 'Incredible flavors and atmosphere.',
    status: 'PUBLISHED',
  },
  {
    id: '34',
    author: 'Eric Brown',
    email: 'eric.brown@example.com',
    rating: 3,
    comment:
      'The cooking class was enjoyable and I did learn some interesting Croatian recipes. The instructor was knowledgeable and the ingredients were of good quality. However, I found the price of 80 euros per person to be quite steep for what was offered. While the experience was pleasant, I expected more value for the money - perhaps more dishes to prepare, additional cooking techniques, or maybe some take-home materials like recipe cards. The class duration felt appropriate, but for this price point, I would have appreciated some extras to make it feel more worthwhile. That said, the food we prepared was delicious and the location near Plitvice is beautiful.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '35',
    author: 'Faye White',
    email: 'faye.white@example.com',
    rating: 5,
    comment: 'Chef was very patient and helpful.',
    status: 'PUBLISHED',
  },
  {
    id: '36',
    author: 'Gary Black',
    email: 'gary.black@example.com',
    rating: 4,
    comment: 'Great way to spend the evening.',
    status: 'PUBLISHED',
  },
  {
    id: '37',
    author: 'Hailey Green',
    email: 'hailey.green@example.com',
    rating: 5,
    comment: 'Will definitely come back!',
    status: 'PUBLISHED',
  },
  {
    id: '38',
    author: 'Igor Blue',
    email: 'igor.blue@example.com',
    rating: 4,
    comment: 'Authentic Croatian experience.',
    status: 'PUBLISHED',
  },
  {
    id: '39',
    author: 'Jenny Red',
    email: 'jenny.red@example.com',
    rating: 5,
    comment: 'Loved the hands-on approach.',
    status: 'PUBLISHED',
  },
  {
    id: '40',
    author: 'Kyle Yellow',
    email: 'kyle.yellow@example.com',
    rating: 3,
    comment: 'Decent class, nothing special.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '41',
    author: 'Luna Pink',
    email: 'luna.pink@example.com',
    rating: 5,
    comment: 'Beautiful location and great food.',
    status: 'PUBLISHED',
  },
  {
    id: '42',
    author: 'Max Orange',
    email: 'max.orange@example.com',
    rating: 4,
    comment: 'Enjoyed every minute of it.',
    status: 'PUBLISHED',
  },
  {
    id: '43',
    author: 'Nora Purple',
    email: 'nora.purple@example.com',
    rating: 5,
    comment: 'Fresh ingredients make all the difference.',
    status: 'PUBLISHED',
  },
  {
    id: '44',
    author: 'Owen Gray',
    email: 'owen.gray@example.com',
    rating: 4,
    comment: 'Great for food enthusiasts.',
    status: 'PUBLISHED',
  },
  {
    id: '45',
    author: 'Paige Cyan',
    email: 'paige.cyan@example.com',
    rating: 5,
    comment: 'Perfect family activity.',
    status: 'PUBLISHED',
  },
  {
    id: '46',
    author: 'Ryan Silver',
    email: 'ryan.silver@example.com',
    rating: 3,
    comment: 'Good but could use more variety.',
    status: 'WAITING_FOR_PUBLICATION',
  },
  {
    id: '47',
    author: 'Sara Gold',
    email: 'sara.gold@example.com',
    rating: 5,
    comment: 'Amazing hospitality and food.',
    status: 'PUBLISHED',
  },
];

/** * reviews mock for testing purposes
 * - this mock data is used to simulate the reviews in the application
 * - it includes a list of reviews with name, email, rating, and review text
 * - it is used to test the reviews component and display user feedback
 * - the reviews can be used to showcase the quality of the cooking classes and attract new customers
 * - it is a simple and effective way to provide social proof and build trust with potential customers
 * - the reviews can be displayed in a carousel or a list format on the website
 * - it is important to ensure that the reviews are genuine and reflect real customer experiences
 */
export const reviewsMockShort: IReview[] = [
  {
    id: '1',
    author: 'Alice Smith',
    email: 'alice.smith@example.com',
    rating: 5,
    comment: 'Fantastic experience!',
    status: 'PUBLISHED',
  },
  {
    id: '2',
    author: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    rating: 4,
    comment: 'Really enjoyed the class.',
    status: 'PUBLISHED',
  },
  {
    id: '3',
    author: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    rating: 3,
    comment: 'It was okay, but I expected more.',
    status: 'WAITING_FOR_PUBLICATION',
  },
];
