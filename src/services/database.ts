
// This is a browser-compatible mock database service
// In a real application, you would use a server-side database connection

// Mock database for client-side development
class MockDatabase {
  private storage: Record<string, any[]> = {
    users: [],
    books: [],
    book_categories: [],
    orders: [],
    order_items: [],
    rentals: [],
    cart_items: []
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
      this.storage.books = books;
      this.storage.book_categories = categories.map((name: string) => ({ name }));
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
  async query(table: string, action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', data?: any, where?: (item: any) => boolean): Promise<any[]> {
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
        this.storage[table].push(data);
        this.saveData();
        return [data];
      
      case 'UPDATE':
        if (where) {
          this.storage[table] = this.storage[table].map(item => 
            where(item) ? { ...item, ...data } : item
          );
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
export const query = async (table: string, action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', data?: any, where?: (item: any) => boolean): Promise<any[]> => {
  return mockDB.query(table, action, data, where);
};

// Export database functions
export const db = {
  query,
  initializeDatabase,
};
