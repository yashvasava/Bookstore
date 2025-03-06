import { Book, User } from './api';

// Type definitions for database records
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  password_hash?: string; // Not storing actual passwords in this demo
}

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rent_price?: number;
  image_url: string;
  featured: boolean;
  in_stock: number;
  stock: number; // Add stock property to match Book interface
  rating: number;
  publish_date: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryRecord {
  id: string;
  name: string;
  description?: string;
}

export interface OrderRecord {
  id: string;
  user_id: string;
  items: {
    book_id: string;
    quantity: number;
    is_rental: boolean;
    rental_days?: number;
  }[];
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };
  payment_method: string;
  created_at: string;
  updated_at: string;
}

// Database implementation with fallback to localStorage
const createDatabase = () => {
  // Create tables
  const createTables = async () => {
    try {
      // Create tables with appropriate columns
      const createTable = (tableName: string, columns: string) => {
        // In a real implementation, this would create a table in a database
        // For this demo, we just log the table creation
        console.log(`Creating table ${tableName} with columns: ${columns}`);
      };
      
      createTable('users', 'id TEXT PRIMARY KEY, name TEXT, email TEXT, role TEXT, password_hash TEXT');
      createTable('books', 'id TEXT PRIMARY KEY, title TEXT, author TEXT, description TEXT, price REAL, rent_price REAL, image_url TEXT, featured INTEGER, in_stock INTEGER, stock INTEGER, rating REAL, publish_date TEXT, created_at TEXT, updated_at TEXT');
      createTable('categories', 'id TEXT PRIMARY KEY, name TEXT, description TEXT');
      createTable('orders', 'id TEXT PRIMARY KEY, user_id TEXT, items TEXT, total_amount REAL, status TEXT, shipping_address TEXT, payment_method TEXT, created_at TEXT, updated_at TEXT');
      
      // These functions should create/verify the tables exist in a real implementation
      return true;
    } catch (error) {
      console.error('Error creating tables:', error);
      return false;
    }
  };

  // Insert seed data
  const insertSeedData = async () => {
    // Insert users
    const insertUsers = async (users: UserRecord[]) => {
      // In a real implementation, this would insert users into the database
      // For this demo, we just log the user insertion
      console.log('Inserting users:', users);
    };
    
    // Insert books
    const insertBooks = async (books: BookRecord[]) => {
      // In a real implementation, this would insert books into the database
      // For this demo, we just log the book insertion
      console.log('Inserting books:', books);
    };
    
    // Insert categories
    const insertCategories = async (categories: CategoryRecord[]) => {
      // In a real implementation, this would insert categories into the database
      // For this demo, we just log the category insertion
      console.log('Inserting categories:', categories);
    };
    
    try {
      // In a real implementation, this would check if data already exists
      // and only insert seed data if tables are empty
      
      // Import seed data from local data file
      const { books, categories } = await import('@/lib/data');
      
      // Insert users
      const users: UserRecord[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          password_hash: 'hashed_password_1'
        },
        {
          id: '2',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          password_hash: 'hashed_password_2'
        }
      ];
      
      // Insert books
      const bookRecords: BookRecord[] = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        rent_price: book.rentPrice,
        image_url: book.coverImage || '/placeholder.svg',
        featured: book.featured,
        in_stock: book.stock || 10, // Using stock or fallback value
        stock: book.stock || 10, // Using stock or fallback value
        rating: book.rating || 4,
        publish_date: book.releaseDate || new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      // Insert categories
      const categoryRecords: CategoryRecord[] = categories.map((category, index) => ({
        id: `${index + 1}`,
        name: category,
        description: `All books in the ${category} category`
      }));
      
      // Store data in localStorage as fallback
      localStorage.setItem('db_users', JSON.stringify(users));
      localStorage.setItem('db_books', JSON.stringify(bookRecords));
      localStorage.setItem('db_categories', JSON.stringify(categoryRecords));
      
      return true;
    } catch (error) {
      console.error('Error inserting seed data:', error);
      return false;
    }
  };

  // Generic query function with more specific typing
  const query = async <T>(
    tableName: string, 
    options?: { 
      where?: Record<string, any>;
      limit?: number;
      offset?: number;
      orderBy?: string;
      order?: 'asc' | 'desc';
    }
  ): Promise<T[]> => {
    try {
      // Try to get data from localStorage
      const data = localStorage.getItem(`db_${tableName}`);
      if (!data) return [] as T[];
      
      let results = JSON.parse(data) as T[];
      
      // Apply filters if options provided
      if (options?.where) {
        results = results.filter(item => {
          return Object.entries(options.where).every(([key, value]) => {
            return item[key as keyof T] === value;
          });
        });
      }
      
      // Apply sorting
      if (options?.orderBy) {
        const orderBy = options.orderBy as keyof T;
        const order = options.order || 'asc';
        
        results.sort((a, b) => {
          const valueA = a[orderBy];
          const valueB = b[orderBy];
          
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'asc' 
              ? valueA.localeCompare(valueB) 
              : valueB.localeCompare(valueA);
          }
          
          if (valueA < valueB) return order === 'asc' ? -1 : 1;
          if (valueA > valueB) return order === 'asc' ? 1 : -1;
          return 0;
        });
      }
      
      // Apply pagination
      if (options?.limit) {
        const offset = options.offset || 0;
        results = results.slice(offset, offset + options.limit);
      }
      
      return results;
    } catch (error) {
      console.error(`Error querying ${tableName}:`, error);
      return [] as T[];
    }
  };
  
  // Generic insert function
  const insert = async <T>(tableName: string, record: T): Promise<T> => {
    try {
      // Get existing data from localStorage
      const data = localStorage.getItem(`db_${tableName}`);
      const existingData: T[] = data ? JSON.parse(data) : [];
      
      // Add the new record
      existingData.push(record);
      
      // Store the updated data back in localStorage
      localStorage.setItem(`db_${tableName}`, JSON.stringify(existingData));
      
      return record;
    } catch (error) {
      console.error(`Error inserting into ${tableName}:`, error);
      throw error;
    }
  };

  // Generic update function
  const update = async <T extends { id: string }>(tableName: string, id: string, updates: Partial<T>): Promise<T | undefined> => {
    try {
      // Get existing data from localStorage
      const data = localStorage.getItem(`db_${tableName}`);
      if (!data) return undefined;
      
      let existingData: T[] = JSON.parse(data);
      
      // Find the record to update
      const recordIndex = existingData.findIndex(item => item.id === id);
      if (recordIndex === -1) return undefined;
      
      // Apply updates
      existingData[recordIndex] = { ...existingData[recordIndex], ...updates };
      
      // Store the updated data back in localStorage
      localStorage.setItem(`db_${tableName}`, JSON.stringify(existingData));
      
      return existingData[recordIndex];
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      return undefined;
    }
  };

  // Generic delete function
  const deleteRecord = async <T extends { id: string }>(tableName: string, id: string): Promise<boolean> => {
    try {
      // Get existing data from localStorage
      const data = localStorage.getItem(`db_${tableName}`);
      if (!data) return false;
      
      let existingData: T[] = JSON.parse(data);
      
      // Filter out the record to delete
      existingData = existingData.filter(item => item.id !== id);
      
      // Store the updated data back in localStorage
      localStorage.setItem(`db_${tableName}`, JSON.stringify(existingData));
      
      return true;
    } catch (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      return false;
    }
  };

  return {
    createTables,
    insertSeedData,
    query,
    insert,
    update,
    deleteRecord,
  };
};

// Create and export the database instance
export const db = createDatabase();

// Initialize the database
export const initializeDatabase = async (): Promise<boolean> => {
  try {
    console.log('Creating database tables...');
    const tablesCreated = await db.createTables();
    
    if (!tablesCreated) {
      console.error('Failed to create tables');
      return false;
    }
    
    console.log('Inserting seed data...');
    const dataInserted = await db.insertSeedData();
    
    if (!dataInserted) {
      console.error('Failed to insert seed data');
      return false;
    }
    
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};
