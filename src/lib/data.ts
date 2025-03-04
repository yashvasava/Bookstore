// Mock data for bookstore
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rentPrice: number | null;
  category: string[];
  rating: number;
  description: string;
  releaseDate: string;
  isbn: string;
  pages: number;
  language: string;
  publisher: string;
  available: boolean;
  featured: boolean;
}

export const categories = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Technology',
  'Art',
  'Science',
  'Travel',
  'Cooking',
  'Philosophy',
  'Poetry',
];

export const books: Book[] = [
  {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 24.99,
    rentPrice: 4.99,
    category: ['Design', 'Technology', 'Psychology'],
    rating: 4.5,
    description: 'Even the smartest among us can feel inept as we fail to figure out which light switch or oven burner to turn on, or whether to push, pull, or slide a door. The fault, argues this ingenious book, lies not in ourselves, but in product design that ignores the needs of users and the principles of cognitive psychology.',
    releaseDate: '2013-11-05',
    isbn: '978-0465050659',
    pages: 368,
    language: 'English',
    publisher: 'Basic Books',
    available: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 29.99,
    rentPrice: 5.99,
    category: ['Psychology', 'Science', 'Non-Fiction'],
    rating: 4.7,
    description: 'In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    releaseDate: '2011-10-25',
    isbn: '978-0374533557',
    pages: 499,
    language: 'English',
    publisher: 'Farrar, Straus and Giroux',
    available: true,
    featured: true,
  },
  {
    id: '3',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 26.99,
    rentPrice: 4.99,
    category: ['Business', 'Technology', 'Entrepreneurship'],
    rating: 4.6,
    description: 'If you want to build a better future, you must believe in secrets. The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. In Zero to One, legendary entrepreneur and investor Peter Thiel shows how we can find singular ways to create those new things.',
    releaseDate: '2014-09-16',
    isbn: '978-0804139298',
    pages: 224,
    language: 'English',
    publisher: 'Crown Business',
    available: true,
    featured: true,
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 19.99,
    rentPrice: 3.99,
    category: ['Science Fiction', 'Fantasy', 'Fiction'],
    rating: 4.8,
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
    releaseDate: '1965-08-01',
    isbn: '978-0441172719',
    pages: 412,
    language: 'English',
    publisher: 'Ace Books',
    available: true,
    featured: false,
  },
  {
    id: '5',
    title: 'The Code Breaker',
    author: 'Walter Isaacson',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 35.99,
    rentPrice: 6.99,
    category: ['Biography', 'Science', 'Technology'],
    rating: 4.6,
    description: 'The bestselling author of Leonardo da Vinci and Steve Jobs returns with a gripping account of how Nobel Prize winner Jennifer Doudna and her colleagues launched a revolution that will allow us to cure diseases, fend off viruses, and have healthier babies.',
    releaseDate: '2021-03-09',
    isbn: '978-1982115852',
    pages: 560,
    language: 'English',
    publisher: 'Simon & Schuster',
    available: true,
    featured: false,
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 27.99,
    rentPrice: 4.99,
    category: ['Self-Help', 'Psychology', 'Non-Fiction'],
    rating: 4.9,
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    releaseDate: '2018-10-16',
    isbn: '978-0735211292',
    pages: 320,
    language: 'English',
    publisher: 'Avery',
    available: true,
    featured: true,
  },
  {
    id: '7',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 24.99,
    rentPrice: 4.99,
    category: ['History', 'Science', 'Non-Fiction'],
    rating: 4.7,
    description: 'In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical—and sometimes devastating—breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.',
    releaseDate: '2014-02-10',
    isbn: '978-0062316097',
    pages: 464,
    language: 'English',
    publisher: 'Harper',
    available: true,
    featured: true,
  },
  {
    id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    price: 17.99,
    rentPrice: 3.49,
    category: ['Fiction', 'Philosophy', 'Fantasy'],
    rating: 4.8,
    description: 'Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.',
    releaseDate: '1988-01-01',
    isbn: '978-0062315007',
    pages: 208,
    language: 'English',
    publisher: 'HarperOne',
    available: true,
    featured: false,
  },
];

// Mock user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export const currentUser: User | null = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
};

// Cart functionality
export interface CartItem {
  bookId: string;
  quantity: number;
  isRental: boolean;
  rentalDays?: number;
}

export let cart: CartItem[] = [];

// Add item to cart
export function addToCart(item: CartItem) {
  const existingItemIndex = cart.findIndex(
    i => i.bookId === item.bookId && i.isRental === item.isRental
  );
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
    if (item.isRental && item.rentalDays) {
      cart[existingItemIndex].rentalDays = item.rentalDays;
    }
  } else {
    cart.push(item);
  }
  
  return [...cart];
}

// Remove item from cart
export function removeFromCart(bookId: string, isRental: boolean) {
  cart = cart.filter(item => !(item.bookId === bookId && item.isRental === isRental));
  return [...cart];
}

// Update cart item quantity
export function updateCartItemQuantity(bookId: string, isRental: boolean, quantity: number) {
  const itemIndex = cart.findIndex(
    item => item.bookId === bookId && item.isRental === isRental
  );
  
  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
  }
  
  return [...cart];
}

// Calculate cart total
export function calculateCartTotal() {
  return cart.reduce((total, item) => {
    const book = books.find(b => b.id === item.bookId);
    if (!book) return total;
    
    const price = item.isRental 
      ? (book.rentPrice || 0) * (item.rentalDays || 7) / 7
      : book.price;
      
    return total + (price * item.quantity);
  }, 0);
}

// Clear cart
export function clearCart() {
  cart = [];
  return [...cart];
}
