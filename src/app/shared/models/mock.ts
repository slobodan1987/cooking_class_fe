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
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+385 91 1234567',
    date: '06.08.2025.',
    guests: 4,
    status: 'WAITING_FOR_CONFIRMATION',
    message: 'Looking forward to the class!',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+385 91 7654321',
    date: '07.08.2025.',
    guests: 2,
    status: 'CONFIRMED',
    message: "Can't wait for the class!",
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+385 91 9876543',
    date: '08.08.2025.',
    guests: 2,
    status: 'CANCELED',
    message: "Can't wait for the class!",
  },
  {
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
    author: 'John Doe',
    email: 'john.doe@example.com',
    rating: 5,
    comment: 'Amazing cooking class! Highly recommend.',
  },
  {
    author: 'Jane Smith',
    email: 'jane.smith@example.com',
    rating: 4,
    comment:
      'What a wonderful cooking class experience! I learned so many traditional Croatian recipes and cooking techniques that I never knew before. The instructor was patient and knowledgeable, explaining each step clearly and making sure everyone understood the process. The ingredients were fresh and locally sourced, which really enhanced the flavors of the dishes we prepared. The atmosphere was warm and welcoming, and I loved how we got to enjoy the meal we cooked together at the end. I would definitely recommend this class to anyone wanting to learn authentic Croatian cuisine in a beautiful setting near Plitvice Lakes.',
  },
  {
    author: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    rating: 3,
    comment: 'It was okay, but I expected more hands-on time.',
  },
  {
    author: 'Mary Peterson',
    email: 'mary.peterson@example.com',
    rating: 5,
    comment: 'Best cooking class ever! Will come again.',
  },
  {
    author: 'Bob Brown',
    email: 'bob.brown@example.com',
    rating: 4,
    comment: 'Great class, but the location was hard to find.',
  },
  {
    author: 'Charlie White',
    email: 'charlie.white@example.com',
    rating: 5,
    comment: 'Fantastic class! Learned so much.',
  },
  {
    author: 'Diana Green',
    email: 'diana.green@example.com',
    rating: 5,
    comment: 'Loved the class! The instructor was very knowledgeable.',
  },
  {
    author: 'Ethan Blue',
    email: 'ethan.blue@example.com',
    rating: 5,
    comment: 'Incredible experience! I learned so much and had a great time.',
  },
  {
    author: 'Fiona Yellow',
    email: 'fiona.yellow@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
  },
  {
    author: 'George Black',
    email: 'george.black@example.com',
    rating: 5,
    comment: 'Outstanding class! I gained so much knowledge.',
  },
  {
    author: 'Hannah Pink',
    email: 'hannah.pink@example.com',
    rating: 5,
    comment: 'Loved the class! The instructor was very knowledgeable.',
  },
  {
    author: 'Ian Orange',
    email: 'ian.orange@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
  },
  {
    author: 'Julia Purple',
    email: 'julia.purple@example.com',
    rating: 5,
    comment: 'Amazing class! I learned so much and had a great time.',
  },
  {
    author: 'Kevin Gray',
    email: 'kevin.gray@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
  },
  {
    author: 'Laura Cyan',
    email: 'laura.cyan@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
  },
  {
    author: 'Michael Red',
    email: 'michael.red@example.com',
    rating: 5,
    comment: 'Outstanding class! I gained so much knowledge.',
  },
  {
    author: 'Nina Silver',
    email: 'nina.silver@example.com',
    rating: 5,
    comment: 'Fantastic class! I learned so much and had a great time.',
  },
  {
    author: 'Oliver Stone',
    email: 'oliver.stone@example.com',
    rating: 4,
    comment: 'Delicious food and great company!',
  },
  {
    author: 'Petra Gold',
    email: 'petra.gold@example.com',
    rating: 5,
    comment: 'Perfect introduction to Croatian cuisine.',
  },
  {
    author: 'Quinn Brown',
    email: 'quinn.brown@example.com',
    rating: 3,
    comment: 'Good class but a bit rushed.',
  },
  {
    author: 'Rachel White',
    email: 'rachel.white@example.com',
    rating: 5,
    comment: 'Amazing recipes, will cook them at home!',
  },
  {
    author: 'Steve Black',
    email: 'steve.black@example.com',
    rating: 4,
    comment: 'Very authentic experience.',
  },
  {
    author: 'Tina Green',
    email: 'tina.green@example.com',
    rating: 5,
    comment: 'Best way to explore local cuisine.',
  },
  {
    author: 'Uma Blue',
    email: 'uma.blue@example.com',
    rating: 4,
    comment: 'Fun and educational!',
  },
  {
    author: 'Victor Red',
    email: 'victor.red@example.com',
    rating: 5,
    comment: 'Exceeded all expectations.',
  },
  {
    author: 'Wendy Yellow',
    email: 'wendy.yellow@example.com',
    rating: 4,
    comment: 'Great for beginners like me.',
  },
  {
    author: 'Xavier Pink',
    email: 'xavier.pink@example.com',
    rating: 5,
    comment: 'Wonderful local ingredients.',
  },
  {
    author: 'Yara Orange',
    email: 'yara.orange@example.com',
    rating: 3,
    comment: 'Nice but could be longer.',
  },
  {
    author: 'Zoe Purple',
    email: 'zoe.purple@example.com',
    rating: 5,
    comment: 'Absolutely loved it!',
  },
  {
    author: 'Adam Gray',
    email: 'adam.gray@example.com',
    rating: 4,
    comment: 'Great team building activity.',
  },
  {
    author: 'Bella Cyan',
    email: 'bella.cyan@example.com',
    rating: 5,
    comment: 'Perfect date night activity.',
  },
  {
    author: 'Carlos Silver',
    email: 'carlos.silver@example.com',
    rating: 4,
    comment: 'Learned traditional techniques.',
  },
  {
    author: 'Dana Gold',
    email: 'dana.gold@example.com',
    rating: 5,
    comment: 'Incredible flavors and atmosphere.',
  },
  {
    author: 'Eric Brown',
    email: 'eric.brown@example.com',
    rating: 3,
    comment:
      'The cooking class was enjoyable and I did learn some interesting Croatian recipes. The instructor was knowledgeable and the ingredients were of good quality. However, I found the price of 80 euros per person to be quite steep for what was offered. While the experience was pleasant, I expected more value for the money - perhaps more dishes to prepare, additional cooking techniques, or maybe some take-home materials like recipe cards. The class duration felt appropriate, but for this price point, I would have appreciated some extras to make it feel more worthwhile. That said, the food we prepared was delicious and the location near Plitvice is beautiful.',
  },
  {
    author: 'Faye White',
    email: 'faye.white@example.com',
    rating: 5,
    comment: 'Chef was very patient and helpful.',
  },
  {
    author: 'Gary Black',
    email: 'gary.black@example.com',
    rating: 4,
    comment: 'Great way to spend the evening.',
  },
  {
    author: 'Hailey Green',
    email: 'hailey.green@example.com',
    rating: 5,
    comment: 'Will definitely come back!',
  },
  {
    author: 'Igor Blue',
    email: 'igor.blue@example.com',
    rating: 4,
    comment: 'Authentic Croatian experience.',
  },
  {
    author: 'Jenny Red',
    email: 'jenny.red@example.com',
    rating: 5,
    comment: 'Loved the hands-on approach.',
  },
  {
    author: 'Kyle Yellow',
    email: 'kyle.yellow@example.com',
    rating: 3,
    comment: 'Decent class, nothing special.',
  },
  {
    author: 'Luna Pink',
    email: 'luna.pink@example.com',
    rating: 5,
    comment: 'Beautiful location and great food.',
  },
  {
    author: 'Max Orange',
    email: 'max.orange@example.com',
    rating: 4,
    comment: 'Enjoyed every minute of it.',
  },
  {
    author: 'Nora Purple',
    email: 'nora.purple@example.com',
    rating: 5,
    comment: 'Fresh ingredients make all the difference.',
  },
  {
    author: 'Owen Gray',
    email: 'owen.gray@example.com',
    rating: 4,
    comment: 'Great for food enthusiasts.',
  },
  {
    author: 'Paige Cyan',
    email: 'paige.cyan@example.com',
    rating: 5,
    comment: 'Perfect family activity.',
  },
  {
    author: 'Ryan Silver',
    email: 'ryan.silver@example.com',
    rating: 3,
    comment: 'Good but could use more variety.',
  },
  {
    author: 'Sara Gold',
    email: 'sara.gold@example.com',
    rating: 5,
    comment: 'Amazing hospitality and food.',
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
    author: 'Alice Smith',
    email: 'alice.smith@example.com',
    rating: 5,
    comment: 'Fantastic experience!',
  },
  {
    author: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    rating: 4,
    comment: 'Really enjoyed the class.',
  },
  {
    author: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    rating: 3,
    comment: 'It was okay, but I expected more.',
  },
];
