
// Exporting the User type for use in other files
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rentPrice?: number;
  imageUrl: string;
  category: string[];
  featured: boolean;
  inStock: number;
  rating: number;
  publishDate: string;
  coverImage?: string; // Added to match imports from lib/data
  available?: boolean; // Added to match usage in AdminDashboard
  stock?: number; // Added to match usage in imports from lib/data
}

export interface CartItem {
  bookId: string;
  quantity: number;
  isRental: boolean;
  rentalDays?: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage (simulating a database)
let books: Book[] = [];
let cartItems: CartItem[] = [];
let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  }
];

// Import initial data 
import { books as initialBooks } from '@/lib/data';

// Convert initialBooks to the format we need
initialBooks.forEach(book => {
  const newBook: Book = {
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    price: book.price,
    rentPrice: book.rentPrice,
    imageUrl: book.coverImage || '/placeholder.svg', // Use coverImage or fallback
    category: book.category,
    featured: book.featured,
    inStock: book.stock || 10, // Using stock property if available
    rating: book.rating || 4, // Default rating if not provided
    publishDate: book.publishDate || new Date().toISOString(), // Using publishDate property
    coverImage: book.coverImage,
    stock: book.stock
  };
  books.push(newBook);
});

// Books API
export const booksApi = {
  getBooks: async (): Promise<Book[]> => {
    await delay(500);
    return [...books];
  },
  
  getBookById: async (id: string): Promise<Book | undefined> => {
    await delay(300);
    return books.find(book => book.id === id);
  },
  
  searchBooks: async (query: string): Promise<Book[]> => {
    await delay(500);
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm)
    );
  },
  
  getBooksByCategory: async (category: string): Promise<Book[]> => {
    await delay(500);
    return books.filter(book => book.category.includes(category));
  },
  
  getFeaturedBooks: async (): Promise<Book[]> => {
    await delay(500);
    return books.filter(book => book.featured);
  },
  
  // Admin functions
  addBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    await delay(700);
    const newBook = {
      ...book,
      id: `${books.length + 1}`
    };
    books.push(newBook);
    return newBook;
  },
  
  updateBook: async (id: string, updates: Partial<Book>): Promise<Book | undefined> => {
    await delay(700);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return undefined;
    
    const updatedBook = { ...books[index], ...updates };
    books[index] = updatedBook;
    return updatedBook;
  },
  
  deleteBook: async (id: string): Promise<boolean> => {
    await delay(700);
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);
    return books.length < initialLength;
  }
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<CartItem[]> => {
    await delay(300);
    return [...cartItems];
  },
  
  addToCart: async (item: CartItem): Promise<CartItem[]> => {
    await delay(500);
    const existingIndex = cartItems.findIndex(
      i => i.bookId === item.bookId && i.isRental === item.isRental
    );
    
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += item.quantity;
      if (item.isRental && item.rentalDays) {
        cartItems[existingIndex].rentalDays = item.rentalDays;
      }
    } else {
      cartItems.push(item);
    }
    
    return [...cartItems];
  },
  
  updateCartItem: async (bookId: string, isRental: boolean, quantity: number): Promise<CartItem[]> => {
    await delay(500);
    const itemIndex = cartItems.findIndex(
      item => item.bookId === bookId && item.isRental === isRental
    );
    
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity = quantity;
    }
    
    return [...cartItems];
  },
  
  removeFromCart: async (bookId: string, isRental: boolean): Promise<CartItem[]> => {
    await delay(500);
    cartItems = cartItems.filter(item => !(item.bookId === bookId && item.isRental === isRental));
    return [...cartItems];
  },
  
  clearCart: async (): Promise<CartItem[]> => {
    await delay(500);
    cartItems = [];
    return [];
  }
};

// User API
export const userApi = {
  login: async (email: string, password: string): Promise<User | null> => {
    await delay(800);
    // This is a mock authentication - in a real app, you would validate passwords securely
    // For demo purposes, any password works for the pre-defined users
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1000);
    // Check if user already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user (in a real app, you would hash the password)
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      role: 'user'
    };
    
    users.push(newUser);
    return newUser;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    await delay(300);
    // In a real app, this would check the session or JWT
    // For demo purposes, return the first user
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  },
  
  logout: async (): Promise<void> => {
    await delay(300);
    localStorage.removeItem('currentUser');
  },
  
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User | null> => {
    await delay(700);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;
    
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    
    // Update localStorage if this is the current user
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser.id === userId) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }
    
    return updatedUser;
  }
};

// Authentication helper to maintain session across page refreshes
export const authService = {
  setCurrentUser: (user: User): void => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  getCurrentUser: (): User | null => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  },
  
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },
  
  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  },
  
  logout: (): void => {
    localStorage.removeItem('currentUser');
  }
};

// Orders API
export interface Order {
  id: string;
  userId: string;
  items: {
    bookId: string;
    title: string;
    quantity: number;
    price: number;
    isRental: boolean;
    rentalDays?: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory orders
let orders: Order[] = [];

export const orderApi = {
  getOrders: async (userId?: string): Promise<Order[]> => {
    await delay(500);
    return userId 
      ? orders.filter(order => order.userId === userId)
      : orders;
  },
  
  getOrderById: async (orderId: string): Promise<Order | undefined> => {
    await delay(300);
    return orders.find(order => order.id === orderId);
  },
  
  createOrder: async (
    userId: string, 
    items: CartItem[], 
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string
  ): Promise<Order> => {
    await delay(1000);
    
    // Calculate total and prepare items for order
    let totalAmount = 0;
    const orderItems = items.map(item => {
      const book = books.find(b => b.id === item.bookId);
      if (!book) throw new Error(`Book with id ${item.bookId} not found`);
      
      const price = item.isRental 
        ? (book.rentPrice || 0) * (item.rentalDays || 7) / 7
        : book.price;
        
      totalAmount += price * item.quantity;
      
      return {
        bookId: item.bookId,
        title: book.title,
        quantity: item.quantity,
        price,
        isRental: item.isRental,
        rentalDays: item.rentalDays
      };
    });
    
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      id: `ORD-${orders.length + 1000}`,
      userId,
      items: orderItems,
      totalAmount,
      status: 'processing',
      shippingAddress,
      paymentMethod,
      createdAt: now,
      updatedAt: now
    };
    
    orders.push(newOrder);
    return newOrder;
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order | undefined> => {
    await delay(700);
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return undefined;
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return orders[orderIndex];
  }
};

// Rental tracking API
export interface Rental {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  startDate: string;
  endDate: string;
  returned: boolean;
  returnDate?: string;
  depositAmount: number;
  refundAmount?: number;
}

// In-memory rentals
let rentals: Rental[] = [
  {
    id: 'RNT-1001',
    userId: '1',
    bookId: '1',
    bookTitle: 'The Great Gatsby',
    startDate: '2025-02-01',
    endDate: '2025-02-15',
    returned: true,
    returnDate: '2025-02-12',
    depositAmount: 15.00,
    refundAmount: 15.00,
  },
  {
    id: 'RNT-1002',
    userId: '1',
    bookId: '4',
    bookTitle: 'To Kill a Mockingbird',
    startDate: '2025-02-20',
    endDate: '2025-03-06',
    returned: false,
    depositAmount: 12.50,
  }
];

export const rentalApi = {
  getUserRentals: async (userId: string): Promise<Rental[]> => {
    await delay(500);
    return rentals.filter(rental => rental.userId === userId);
  },
  
  createRental: async (
    userId: string,
    bookId: string,
    days: number
  ): Promise<Rental> => {
    await delay(800);
    
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error(`Book with id ${bookId} not found`);
    if (!book.rentPrice) throw new Error(`Book with id ${bookId} is not available for rent`);
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    
    const newRental: Rental = {
      id: `RNT-${1000 + rentals.length}`,
      userId,
      bookId,
      bookTitle: book.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      returned: false,
      depositAmount: book.rentPrice * 2 // Deposit is double the rental price
    };
    
    rentals.push(newRental);
    return newRental;
  },
  
  returnRental: async (rentalId: string): Promise<Rental | undefined> => {
    await delay(600);
    
    const rentalIndex = rentals.findIndex(r => r.id === rentalId);
    if (rentalIndex === -1) return undefined;
    
    const rental = rentals[rentalIndex];
    if (rental.returned) return rental;
    
    const now = new Date();
    const endDate = new Date(rental.endDate);
    
    // Calculate refund based on return date
    let refundAmount = rental.depositAmount;
    if (now > endDate) {
      // Late return - deduct 10% per day late, up to the full deposit
      const daysLate = Math.ceil((now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
      const deduction = rental.depositAmount * 0.1 * daysLate;
      refundAmount = Math.max(0, rental.depositAmount - deduction);
    }
    
    rentals[rentalIndex] = {
      ...rental,
      returned: true,
      returnDate: now.toISOString(),
      refundAmount
    };
    
    return rentals[rentalIndex];
  }
};
