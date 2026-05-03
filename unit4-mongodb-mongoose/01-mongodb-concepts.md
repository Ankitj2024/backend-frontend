# 📘 LESSON 01: MongoDB Concepts & Shell Commands

MongoDB is a **NoSQL Document Database**. 

---

## 🧠 1. Key Terminology Comparison

| SQL (PostgreSQL/MySQL) | MongoDB (NoSQL) | Description |
|-----------------------|-----------------|-------------|
| Database              | **Database**    | A container for everything. |
| Table                 | **Collection**  | A group of similar things (e.g., "Users"). |
| Row                   | **Document**    | A single record (e.g., "User Ajit"). |
| Column                | **Field**       | A specific data point (e.g., "age"). |

---

## 📄 2. What does a Document look like?
It looks exactly like a JSON object!

```json
{
  "_id": "645a2b...",  // Automatically generated unique ID
  "name": "Ajit",
  "age": 21,
  "skills": ["Node.js", "MongoDB"],
  "isActive": true
}
```

---

## 🐚 3. Essential MongoDB Shell (mongosh) Commands

Once you install MongoDB and run `mongosh` in your terminal, use these commands:

### A. Database Operations
- `show dbs` : List all databases.
- `use myNewDB` : Create or switch to a database.
- `db.dropDatabase()` : Delete current database.

### B. CRUD (Create, Read, Update, Delete)

**1. CREATE (Insert)**
- `db.users.insertOne({ name: "Ajit", age: 21 })`
- `db.users.insertMany([{ name: "Sonia" }, { name: "Rahul" }])`

**2. READ (Find)**
- `db.users.find()` : Find everything.
- `db.users.find({ name: "Ajit" })` : Filter by name.
- `db.users.find({ age: { $gt: 20 } })` : Find users older than 20.
- `db.users.findOne({ _id: ... })` : Find one specific record.

**3. UPDATE**
- `db.users.updateOne({ name: "Ajit" }, { $set: { age: 22 } })`
- `db.users.updateMany({}, { $set: { status: "Active" } })`

**4. DELETE**
- `db.users.deleteOne({ name: "Ajit" })`
- `db.users.deleteMany({ status: "Inactive" })`

---

## 🎯 Why MongoDB for Node.js?
Because they both speak **JSON**. There is no translation needed between your JavaScript code and your Database. It's a match made in heaven!
