
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
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
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
    console.log('Mock database initialized successfully');
    return true;
  } catch (error) {
    console.error('Mock database initialization failed:', error);
    return false;
  }
};

// Helper function to execute queries
export const query = async (sql: string, params: any[] = []) => {
  console.log('Query executed:', sql, params);
  // This is just a mock - in a real app, you would parse the SQL
  // For now, we'll just return an empty array
  return [];
};

// Export database functions
export const db = {
  query,
  initializeDatabase,
};
