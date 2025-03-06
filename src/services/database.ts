// This is a browser-compatible mock database service
// In a real application, you would use a server-side database connection

// Define table types for strong typing
interface DatabaseSchema {
  users: UserRecord[];
  books: BookRecord[];
  book_categories: CategoryRecord[];
  orders: OrderRecord[];
  order_items: OrderItemRecord[];
  rentals: RentalRecord[];
  cart_items: CartItemRecord[];
  payments: PaymentRecord[];
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

interface BookRecord {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rent_price?: number;
  image_url: string;
  category_ids: string[];
  featured: boolean;
  in_stock: number;
  rating: number;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

interface CategoryRecord {
  id: string;
  name: string;
}

interface OrderRecord {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_street: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  payment_method: string;
  email_sent: boolean;
  created_at: string;
  updated_at: string;
}

interface OrderItemRecord {
  id: string;
  order_id: string;
  book_id: string;
  title: string;
  quantity: number;
  price: number;
  is_rental: boolean;
  rental_days?: number;
}

interface RentalRecord {
  id: string;
  user_id: string;
  book_id: string;
  book_title: string;
  start_date: string;
  end_date: string;
  returned: boolean;
  return_date?: string;
  deposit_amount: number;
  refund_amount?: number;
  late_fee?: number;
  created_at: string;
  updated_at: string;
}

interface CartItemRecord {
  id: string;
  user_id: string;
  book_id: string;
  quantity: number;
  is_rental: boolean;
  rental_days?: number;
  added_at: string;
}

interface PaymentRecord {
  id: string;
  order_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Mock database for client-side development
class MockDatabase {
  private storage: {
    users: UserRecord[];
    books: BookRecord[];
    book_categories: CategoryRecord[];
    orders: OrderRecord[];
    order_items: OrderItemRecord[];
    rentals: RentalRecord[];
    cart_items: CartItemRecord[];
    payments: PaymentRecord[];
  } = {
    users: [],
    books: [],
    book_categories: [],
    orders: [],
    order_items: [],
    rentals: [],
    cart_items: [],
    payments: []
  };

  constructor() {
    // Load any saved data from localStorage
    try {
      const savedData = localStorage.getItem('bookhaven_db');
      if (savedData) {
        this.storage = JSON.parse(savedData);
      } else {
        // Initialize with data from memory if localStorage is empty
        this.initializeWithDefaultData();
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Initialize with default data if there's an error
      this.initializeWithDefaultData();
    }
  }

  // Initialize with some default data
  private initializeWithDefaultData() {
    // Import default data
    import('@/lib/data').then(({ books, categories }) => {
      // Convert books to our database schema format
      this.storage.books = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price, // We'll convert to rupees in the UI
        rent_price: book.rentPrice,
        image_url: book.coverImage || '/placeholder.svg',
        category_ids: book.category.map((_, index) => `cat-${index + 1}`),
        featured: book.featured,
        in_stock: typeof book.stock === 'number' ? book.stock : 10, // Explicit type check
        rating: book.rating || 4,
        publish_date: book.releaseDate || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      // Create categories from the book categories
      const uniqueCategories = new Set<string>();
      books.forEach(book => {
        book.category.forEach(cat => uniqueCategories.add(cat));
      });
      
      this.storage.book_categories = Array.from(uniqueCategories).map((name, index) => ({
        id: `cat-${index + 1}`,
        name
      }));
      
      this.saveData();
    }).catch(err => {
      console.error('Failed to load default data:', err);
    });
  }

  // Save data to localStorage
  private saveData() {
    try {
      localStorage.setItem('bookhaven_db', JSON.stringify(this.storage));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  // Execute a query (simplified mock)
  async query(
    table: keyof DatabaseSchema, 
    action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', 
    data?: any, 
    where?: (item: any) => boolean
  ): Promise<any> {
    // Simple delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!this.storage[table]) {
      console.error(`Table ${table} does not exist`);
      return [];
    }

    switch (action) {
      case 'SELECT':
        if (where) {
          return this.storage[table].filter(where);
        }
        return [...this.storage[table]];
      
      case 'INSERT':
        // Add an ID if not provided
        if (!data.id) {
          data.id = `${table.slice(0, 3)}-${this.storage[table].length + 1000}`;
        }
        
        // Add timestamps if not provided
        if (!data.created_at) {
          data.created_at = new Date().toISOString();
        }
        
        if (table !== 'book_categories' && !data.updated_at) {
          data.updated_at = new Date().toISOString();
        }
        
        this.storage[table].push(data);
        this.saveData();
        return [data];
      
      case 'UPDATE':
        if (where) {
          this.storage[table] = this.storage[table].map(item => {
            if (where(item)) {
              // Update the updated_at timestamp
              if (table !== 'book_categories') {
                return { ...item, ...data, updated_at: new Date().toISOString() };
              } else {
                return { ...item, ...data };
              }
            }
            return item;
          });
          this.saveData();
        }
        return this.storage[table].filter(where || (() => true));
      
      case 'DELETE':
        if (where) {
          this.storage[table] = this.storage[table].filter(item => !where(item));
          this.saveData();
        }
        return [];
      
      default:
        console.error('Invalid action');
        return [];
    }
  }
}

// Create a single instance
const mockDB = new MockDatabase();

// Initialize the database
export const initializeDatabase = async () => {
  try {
    // Add some console logging to help debug
    console.log('Initializing mock database...');
    
    // Check if we have books data
    const books = await mockDB.query('books', 'SELECT');
    console.log(`Database initialized with ${books.length} books`);
    
    return true;
  } catch (error) {
    console.error('Mock database initialization failed:', error);
    return false;
  }
};

// Helper function to execute queries
export const query = async (
  table: keyof DatabaseSchema, 
  action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', 
  data?: any, 
  where?: (item: any) => boolean
): Promise<any[]> => {
  return mockDB.query(table, action, data, where);
};

// Export database functions
export const db = {
  query,
  initializeDatabase,
};
