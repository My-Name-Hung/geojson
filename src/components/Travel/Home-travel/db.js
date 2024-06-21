import pg from 'pg'; 

    // Kết nối PostgreSQL
    const pool = new pg.Pool({
      user: 'your_user',       // Thay bằng thông tin đăng nhập của bạn
      host: 'your_host',
      database: 'your_database',
      password: 'your_password',
      port: 5432, 
    });

