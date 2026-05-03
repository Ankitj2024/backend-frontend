# 📘 LESSON 01: PostgreSQL & SQL Basics

PostgreSQL is a **Relational (SQL) Database**. 

---

## 🏛️ 1. SQL vs NoSQL: The Big Difference

| Feature | MongoDB (Unit IV) | PostgreSQL (Unit V) |
|---------|-------------------|---------------------|
| Structure | Flexible (Schema-less) | Strict (Fixed Schema) |
| Data Model | Documents (JSON) | Tables (Rows & Columns) |
| Relationships | Embedding/Linking | Foreign Keys (Joins) |
| Best For | Rapid changes, Unstructured data | Complex data, High consistency |

---

## 🐚 2. Basic SQL Commands

In SQL, we use a specific language to talk to the database. 

### A. Create a Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email TEXT NOT NULL,
    age INTEGER DEFAULT 18
);
```

### B. CRUD Operations

**1. CREATE (Insert)**
```sql
INSERT INTO users (username, email, age) 
VALUES ('ajit_dev', 'ajit@example.com', 21);
```

**2. READ (Select)**
```sql
SELECT * FROM users; -- All columns
SELECT username, email FROM users WHERE age > 20; -- Specific columns and filter
```

**3. UPDATE**
```sql
UPDATE users SET age = 22 WHERE username = 'ajit_dev';
```

**4. DELETE**
```sql
DELETE FROM users WHERE id = 1;
```

---

## 🎯 3. What is Prisma ORM?
Writing raw SQL strings in your JavaScript code is messy and prone to errors. 

**Prisma** is an **ORM** (Object-Relational Mapper). It allows you to define your database structure in a simple file (`schema.prisma`) and then use a clean JavaScript API like `prisma.user.create()` instead of writing long SQL strings.
