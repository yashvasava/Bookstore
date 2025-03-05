
import mysql from 'mysql2/promise';

// MySQL Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',  // default MySQL username, change if needed
  password: '',  // default empty password, change if needed
  database: 'bookhaven_db'
};

// Create a connection pool
let pool: mysql.Pool;

export const initializeDatabase = async () => {
  try {
    // Create a connection without database to check if database exists
    const tempConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    // Check if database exists, if not create it
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await tempConnection.end();
    
    // Create connection pool with database
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    // Create tables if they don't exist
    await createTables();
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// Create all necessary tables
const createTables = async () => {
  const connection = await pool.getConnection();
  try {
    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255),
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Books table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS books (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        rent_price DECIMAL(10, 2),
        image_url VARCHAR(255),
        in_stock INT DEFAULT 0,
        rating DECIMAL(3, 1) DEFAULT 0,
        publish_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Book categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS book_categories (
        book_id VARCHAR(36),
        category_name VARCHAR(50),
        PRIMARY KEY (book_id, category_name),
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      )
    `);
    
    // Orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        shipping_address JSON NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    
    // Order items table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id VARCHAR(36) PRIMARY KEY,
        order_id VARCHAR(36) NOT NULL,
        book_id VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        is_rental BOOLEAN DEFAULT FALSE,
        rental_days INT,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id)
      )
    `);
    
    // Rentals table
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
        deposit_amount DECIMAL(10, 2) NOT NULL,
        refund_amount DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
      )
    `);
    
    // Cart items table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        book_id VARCHAR(36) NOT NULL,
        quantity INT NOT NULL,
        is_rental BOOLEAN DEFAULT FALSE,
        rental_days INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id)
      )
    `);
    
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Helper function to execute queries
export const query = async (sql: string, params: any[] = []) => {
  if (!pool) {
    await initializeDatabase();
  }
  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Export database functions
export const db = {
  query,
  initializeDatabase,
};
