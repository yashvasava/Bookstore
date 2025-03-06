
// This is a MySQL database service implementation
import mysql from 'mysql2/promise';

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

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'bookhaven_user',
  password: 'bookhaven_password',
  database: 'bookhaven_db'
};

// MySQL database class
class MySQLDatabase {
  private pool: mysql.Pool;
  private isInitialized = false;
  private fallbackMode = false;

  constructor() {
    // Set up connection pool
    try {
      this.pool = mysql.createPool(dbConfig);
      console.log('MySQL connection pool created');
    } catch (error) {
      console.error('Error creating MySQL connection pool:', error);
      this.fallbackMode = true;
      console.warn('Falling back to localStorage mode');
      this.initializeFallbackStorage();
    }
  }

  // Fallback storage for when MySQL is not available
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

  // Initialize fallback storage with data from localStorage
  private initializeFallbackStorage() {
    try {
      const savedData = localStorage.getItem('bookhaven_db');
      if (savedData) {
        this.storage = JSON.parse(savedData);
      } else {
        this.initializeWithDefaultData();
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      this.initializeWithDefaultData();
    }
  }

  // Initialize with default data (for fallback mode)
  private initializeWithDefaultData() {
    // Import default data
    import('@/lib/data').then(({ books, categories }) => {
      // Convert books to our database schema format
      this.storage.books = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        rent_price: book.rentPrice,
        image_url: book.coverImage || '/placeholder.svg',
        category_ids: book.category.map((_, index) => `cat-${index + 1}`),
        featured: book.featured,
        in_stock: typeof book.stock === 'number' ? book.stock : 10, 
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
      
      this.saveFallbackData();
    }).catch(err => {
      console.error('Failed to load default data:', err);
    });
  }

  // Save data to localStorage (fallback mode)
  private saveFallbackData() {
    try {
      localStorage.setItem('bookhaven_db', JSON.stringify(this.storage));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  // Initialize the database with tables and initial data
  async initialize(): Promise<boolean> {
    if (this.fallbackMode) {
      console.log('Using fallback mode with localStorage');
      return true;
    }

    if (this.isInitialized) {
      return true;
    }

    try {
      console.log('Initializing MySQL database...');
      
      // Create tables if they don't exist
      await this.createTables();
      
      // Check if books table is empty, if so, populate with initial data
      const [rows] = await this.pool.query('SELECT COUNT(*) as count FROM books');
      const count = (rows as any)[0].count;
      
      if (count === 0) {
        console.log('Books table is empty, populating with initial data...');
        await this.populateInitialData();
      }
      
      this.isInitialized = true;
      console.log('MySQL database initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing MySQL database:', error);
      console.warn('Falling back to localStorage mode');
      this.fallbackMode = true;
      this.initializeFallbackStorage();
      return true; // Return true to allow the application to continue in fallback mode
    }
  }

  // Create database tables
  private async createTables(): Promise<void> {
    const connection = await this.pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Create users table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          role ENUM('admin', 'user') DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Create book_categories table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS book_categories (
          id VARCHAR(36) PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE
        )
      `);
      
      // Create books table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS books (
          id VARCHAR(36) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          rent_price DECIMAL(10,2),
          image_url VARCHAR(255) NOT NULL,
          featured BOOLEAN DEFAULT FALSE,
          in_stock INT DEFAULT 0,
          rating DECIMAL(3,1) DEFAULT 0,
          publish_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      
      // Create book_category_mapping table (many-to-many)
      await connection.query(`
        CREATE TABLE IF NOT EXISTS book_category_mapping (
          book_id VARCHAR(36) NOT NULL,
          category_id VARCHAR(36) NOT NULL,
          PRIMARY KEY (book_id, category_id),
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES book_categories(id) ON DELETE CASCADE
        )
      `);
      
      // Create orders table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(36) PRIMARY KEY,
          user_id VARCHAR(36) NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
          shipping_street VARCHAR(255) NOT NULL,
          shipping_city VARCHAR(255) NOT NULL,
          shipping_state VARCHAR(255) NOT NULL,
          shipping_zip VARCHAR(20) NOT NULL,
          shipping_country VARCHAR(255) NOT NULL,
          payment_method VARCHAR(255) NOT NULL,
          email_sent BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
      
      // Create order_items table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS order_items (
          id VARCHAR(36) PRIMARY KEY,
          order_id VARCHAR(36) NOT NULL,
          book_id VARCHAR(36) NOT NULL,
          title VARCHAR(255) NOT NULL,
          quantity INT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          is_rental BOOLEAN DEFAULT FALSE,
          rental_days INT,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
          FOREIGN KEY (book_id) REFERENCES books(id)
        )
      `);
      
      // Create rentals table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS rentals (
          id VARCHAR(36) PRIMARY KEY,
          user_id VARCHAR(36) NOT NULL,
          book_id VARCHAR(36) NOT NULL,
          book_title VARCHAR(255) NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          returned BOOLEAN DEFAULT FALSE,
          return_date DATE,
          deposit_amount DECIMAL(10,2) NOT NULL,
          refund_amount DECIMAL(10,2),
          late_fee DECIMAL(10,2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (book_id) REFERENCES books(id)
        )
      `);
      
      // Create cart_items table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS cart_items (
          id VARCHAR(36) PRIMARY KEY,
          user_id VARCHAR(36) NOT NULL,
          book_id VARCHAR(36) NOT NULL,
          quantity INT NOT NULL,
          is_rental BOOLEAN DEFAULT FALSE,
          rental_days INT,
          added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        )
      `);
      
      // Create payments table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS payments (
          id VARCHAR(36) PRIMARY KEY,
          order_id VARCHAR(36) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          payment_method VARCHAR(255) NOT NULL,
          transaction_id VARCHAR(255) NOT NULL,
          status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        )
      `);
      
      await connection.commit();
      console.log('All tables created successfully');
    } catch (error) {
      await connection.rollback();
      console.error('Error creating tables:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Populate initial data
  private async populateInitialData(): Promise<void> {
    try {
      // Import initial data
      const { books: initialBooks, categories } = await import('@/lib/data');
      const connection = await this.pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Add admin user
        await connection.query(`
          INSERT INTO users (id, name, email, role) 
          VALUES (?, ?, ?, ?)
        `, ['admin-1', 'Admin User', 'admin@bookhaven.com', 'admin']);
        
        // Add categories
        for (const category of categories) {
          await connection.query(`
            INSERT INTO book_categories (id, name)
            VALUES (?, ?)
          `, [`cat-${categories.indexOf(category) + 1}`, category]);
        }
        
        // Add books
        for (const book of initialBooks) {
          const bookId = book.id;
          
          await connection.query(`
            INSERT INTO books 
            (id, title, author, description, price, rent_price, image_url, featured, in_stock, rating, publish_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            bookId,
            book.title,
            book.author,
            book.description,
            book.price,
            book.rentPrice,
            book.coverImage || '/placeholder.svg',
            book.featured ? 1 : 0,
            typeof book.stock === 'number' ? book.stock : 10,
            book.rating || 4,
            book.releaseDate || new Date().toISOString().split('T')[0]
          ]);
          
          // Add book-category mappings
          for (const category of book.category) {
            const categoryIndex = categories.indexOf(category);
            if (categoryIndex !== -1) {
              const categoryId = `cat-${categoryIndex + 1}`;
              await connection.query(`
                INSERT INTO book_category_mapping (book_id, category_id)
                VALUES (?, ?)
              `, [bookId, categoryId]);
            }
          }
        }
        
        await connection.commit();
        console.log('Initial data populated successfully');
      } catch (error) {
        await connection.rollback();
        console.error('Error populating initial data:', error);
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      throw error;
    }
  }

  // Generate a UUID for new records
  private generateId(prefix: string): string {
    return `${prefix}-${Math.floor(Math.random() * 100000)}`;
  }

  // Execute a query
  async query<T = any>(
    table: keyof DatabaseSchema, 
    action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', 
    data?: any, 
    where?: (item: any) => boolean
  ): Promise<T> {
    // If in fallback mode, use localStorage
    if (this.fallbackMode) {
      return this.fallbackQuery(table, action, data, where) as unknown as T;
    }
    
    // Make sure database is initialized
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    try {
      switch (action) {
        case 'SELECT':
          return this.selectQuery(table, where) as unknown as T;
        case 'INSERT':
          return this.insertQuery(table, data) as unknown as T;
        case 'UPDATE':
          return this.updateQuery(table, data, where) as unknown as T;
        case 'DELETE':
          return this.deleteQuery(table, where) as unknown as T;
        default:
          throw new Error(`Invalid action: ${action}`);
      }
    } catch (error) {
      console.error(`Error executing ${action} query on ${table}:`, error);
      
      // Fall back to localStorage if database query fails
      console.warn(`Falling back to localStorage for ${action} on ${table}`);
      this.fallbackMode = true;
      return this.fallbackQuery(table, action, data, where) as unknown as T;
    }
  }

  // SELECT query implementation
  private async selectQuery(table: keyof DatabaseSchema, where?: (item: any) => boolean): Promise<any[]> {
    let query: string;
    let params: any[] = [];
    
    // Map JavaScript table names to SQL table names
    const sqlTable = this.mapTableName(table);
    
    // If no where function, select all
    if (!where) {
      query = `SELECT * FROM ${sqlTable}`;
      
      // Special handling for books to include categories
      if (table === 'books') {
        return this.getBooksWithCategories();
      }
    } else {
      // Since where is a JavaScript function, we need to get all records and filter
      // This is inefficient for a real database but maintains API compatibility
      const allRecords = await this.selectQuery(table);
      return allRecords.filter(where);
    }
    
    const [rows] = await this.pool.query(query, params);
    return rows as any[];
  }

  // Special query to get books with their categories
  private async getBooksWithCategories(): Promise<any[]> {
    const [books] = await this.pool.query(`
      SELECT * FROM books
    `);
    
    const booksWithCategories = [];
    
    for (const book of books as any[]) {
      // Get categories for this book
      const [categories] = await this.pool.query(`
        SELECT bc.id, bc.name
        FROM book_categories bc
        JOIN book_category_mapping bcm ON bc.id = bcm.category_id
        WHERE bcm.book_id = ?
      `, [book.id]);
      
      booksWithCategories.push({
        ...book,
        category_ids: (categories as any[]).map(cat => cat.id)
      });
    }
    
    return booksWithCategories;
  }

  // INSERT query implementation
  private async insertQuery(table: keyof DatabaseSchema, data: any): Promise<any[]> {
    const sqlTable = this.mapTableName(table);
    
    // Add an ID if not provided
    if (!data.id) {
      data.id = this.generateId(table.slice(0, 3));
    }
    
    // Add timestamps if needed
    if (!data.created_at) {
      data.created_at = new Date().toISOString();
    }
    
    if (table !== 'book_categories' && !data.updated_at && sqlTable !== 'users') {
      data.updated_at = new Date().toISOString();
    }
    
    // Get columns and values
    const columns = Object.keys(data);
    const placeholders = Array(columns.length).fill('?').join(', ');
    const values = columns.map(col => data[col]);
    
    // Handle special case for books with categories
    if (table === 'books' && data.category_ids) {
      const bookId = data.id;
      const categoryIds = data.category_ids;
      
      // First, insert the book without categories
      const bookColumns = columns.filter(col => col !== 'category_ids');
      const bookPlaceholders = Array(bookColumns.length).fill('?').join(', ');
      const bookValues = bookColumns.map(col => data[col]);
      
      await this.pool.query(
        `INSERT INTO ${sqlTable} (${bookColumns.join(', ')}) VALUES (${bookPlaceholders})`,
        bookValues
      );
      
      // Then, insert the book-category mappings
      for (const categoryId of categoryIds) {
        await this.pool.query(
          `INSERT INTO book_category_mapping (book_id, category_id) VALUES (?, ?)`,
          [bookId, categoryId]
        );
      }
      
      return [data];
    }
    
    // Regular insert
    await this.pool.query(
      `INSERT INTO ${sqlTable} (${columns.join(', ')}) VALUES (${placeholders})`,
      values
    );
    
    return [data];
  }

  // UPDATE query implementation
  private async updateQuery(table: keyof DatabaseSchema, data: any, where?: (item: any) => boolean): Promise<any[]> {
    const sqlTable = this.mapTableName(table);
    
    // Add updated_at timestamp
    if (table !== 'book_categories' && sqlTable !== 'users') {
      data.updated_at = new Date().toISOString();
    }
    
    // If no explicit where condition, update by ID
    if (!where && data.id) {
      const columns = Object.keys(data).filter(col => col !== 'id');
      const setClause = columns.map(col => `${col} = ?`).join(', ');
      const values = [...columns.map(col => data[col]), data.id];
      
      await this.pool.query(
        `UPDATE ${sqlTable} SET ${setClause} WHERE id = ?`,
        values
      );
      
      return [data];
    } else if (where) {
      // Get all records, filter with the where function, and update each matching record
      const allRecords = await this.selectQuery(table);
      const matchingRecords = allRecords.filter(where);
      
      for (const record of matchingRecords) {
        const updatedRecord = { ...record, ...data };
        await this.updateQuery(table, updatedRecord);
      }
      
      return matchingRecords.map(record => ({ ...record, ...data }));
    }
    
    return [];
  }

  // DELETE query implementation
  private async deleteQuery(table: keyof DatabaseSchema, where?: (item: any) => boolean): Promise<any[]> {
    const sqlTable = this.mapTableName(table);
    
    if (!where) {
      console.error('DELETE operation requires a where condition');
      return [];
    }
    
    // Get records to delete (so we can return them)
    const allRecords = await this.selectQuery(table);
    const recordsToDelete = allRecords.filter(where);
    
    // Delete each matching record by ID
    for (const record of recordsToDelete) {
      await this.pool.query(
        `DELETE FROM ${sqlTable} WHERE id = ?`,
        [record.id]
      );
    }
    
    return [];
  }

  // Map table names from our API to SQL table names
  private mapTableName(table: keyof DatabaseSchema): string {
    // Most table names are the same but with underscores
    return table.toString();
  }

  // Fallback query for localStorage mode
  private fallbackQuery(
    table: keyof DatabaseSchema, 
    action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', 
    data?: any, 
    where?: (item: any) => boolean
  ): any {
    // Simple delay to simulate network latency
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    return delay(100).then(() => {
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
          this.saveFallbackData();
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
            this.saveFallbackData();
          }
          return this.storage[table].filter(where || (() => true));
        
        case 'DELETE':
          if (where) {
            this.storage[table] = this.storage[table].filter(item => !where(item));
            this.saveFallbackData();
          }
          return [];
        
        default:
          console.error('Invalid action');
          return [];
      }
    });
  }
}

// Create a single instance
const database = new MySQLDatabase();

// Initialize the database
export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');
    const success = await database.initialize();
    console.log('Database initialized successfully');
    return success;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// Helper function to execute queries
export const query = async <T = any>(
  table: keyof DatabaseSchema, 
  action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE', 
  data?: any, 
  where?: (item: any) => boolean
): Promise<T> => {
  return database.query<T>(table, action, data, where);
};

// Export database functions
export const db = {
  query,
  initializeDatabase,
};
