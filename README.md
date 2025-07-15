# Stockly - Inventory Management System

![Screenshot 2025-04-12 at 02 20 06](https://github.com/user-attachments/assets/7495dcfb-c7cb-44e6-a1ef-d82930a8ada7)
![Screenshot 2025-04-12 at 02 20 13](https://github.com/user-attachments/assets/02410f03-c85e-404d-a0fb-f30920d18a58)
![Screenshot 2025-04-12 at 02 21 23](https://github.com/user-attachments/assets/df56b22e-ebd6-4cd3-a1e7-4b960120d659)
![Screenshot 2025-04-12 at 02 21 52](https://github.com/user-attachments/assets/1875a91f-afa5-4dbe-a94d-2471de11cc19)
![Screenshot 2025-04-12 at 02 22 11](https://github.com/user-attachments/assets/03bed7d2-bc82-4994-aea1-0ccfae3ab967)
![Screenshot 2025-04-12 at 02 22 30](https://github.com/user-attachments/assets/e75294a7-72f0-480f-932a-8e63bccbc89b)
![Screenshot 2025-04-12 at 02 23 19](https://github.com/user-attachments/assets/588a7017-8aca-417f-be6c-096f986c20e2)
![Screenshot 2025-04-12 at 02 23 28](https://github.com/user-attachments/assets/86addcb3-1fd6-48d9-9ed5-eb9d2cf5db96)
![Screenshot 2025-04-12 at 02 23 45](https://github.com/user-attachments/assets/090c832e-5456-4dd0-9c2f-dddb18f1dc9d)

Stockly is a **ReactJS-based inventory management application** built with **Next.js**. It is designed to help businesses efficiently manage their product inventory. The application includes features such as product listing, adding new products, editing existing products, filtering products, and more. It also incorporates robust security measures like **JWT-based authentication**, **password hashing**, and **middleware** for secure API interactions.

**Online-Live:** <https://stockly-inventory.vercel.app/>

## Features

## 1. Product Management

- **Product Listing**: View a list of all products with details such as name, SKU, status, quantity in stock, price, and supplier.
- **Add Product**: Add new products to the inventory with details such as name, SKU, status, quantity, price, and supplier.
- **Edit Product**: Edit existing product details.
- **Delete Product**: Remove products from the inventory.

## 2. Filtering and Sorting

- **Filter Products**: Filter products based on status, category, and supplier.
- **Search Products**: Search for products by name or SKU.
- **Sort Products**: Sort products by attributes like name, price, or quantity.

## 3. Authentication

- **User Login and Registration**: Secure user authentication using **JWT (JSON Web Tokens)**.
- **Password Hashing**: Passwords are hashed using **bcrypt** for secure storage.
- **Session Management**: Tokens are stored securely in cookies for session management.

## 4. Responsive Design

- The application is fully responsive and works seamlessly on devices of all screen sizes, including desktops, tablets, and mobile phones.

## 5. API Integration

- **RESTful APIs**: The backend is built with Next.js API routes, providing endpoints for managing products, users, and authentication.
- **Middleware**: Middleware is used to validate tokens and protect sensitive routes.

## 6. Database

- **MongoDB**: The application uses MongoDB as the database to store product and user information.
- **Prisma ORM**: Prisma is used as the ORM for database schema management and queries.

## How It Works

## 1. Authentication

- **Registration**: Users register by providing their email and password. The password is hashed using **bcrypt** before being stored in the database.
- **Login**: Users log in with their email and password. A **JWT** is generated upon successful login and stored in a secure cookie.
- **Token Validation**: Middleware validates the JWT for protected routes to ensure only authenticated users can access them.

## 2. Product Management

- **Add Product**: Users can add products by filling out a form with details like name, SKU, category, supplier, price, and quantity.
- **Edit Product**: Users can edit product details through a dialog form.
- **Delete Product**: Users can delete products, which removes them from the database.

## 3. Filtering and Sorting

- **Category Filter**: Products can be filtered by category using a dropdown menu.
- **Status Filter**: Products can be filtered by their stock status (e.g., Available, Stock Low, Stock Out).
- **Supplier Filter**: Products can be filtered by supplier.
- **Search**: Users can search for products by name or SKU.

## 4. Database Schema

The database schema is managed using **Prisma** and stored in **MongoDB**. Below is an example of the schema:

## schema.prisma

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-3.0.x"]
}

model User {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String     @unique
  password  String
  createdAt DateTime   @default(now())
  products  Product[]
  categories Category[]
  suppliers Supplier[]
  sessions  Session[]
}

model Product {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  sku         String     @unique
  price       Float
  quantity    Int
  status      String
  createdAt   DateTime   @default(now())
  userId      String     @db.ObjectId
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  categoryId  String     @db.ObjectId
  category    Category   @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  supplierId  String     @db.ObjectId
  supplier    Supplier   @relation(fields: [supplierId], references: [id], onDelete: Cascade)
}

model Category {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  userId    String     @db.ObjectId
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  products  Product[]
}

model Supplier {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  userId    String     @db.ObjectId
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  products  Product[]
}

model Session {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  userId       String   @db.ObjectId
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
  sessionToken String   @unique
}

model VerificationToken {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  identifier String
  token      String   @unique
  expires    DateTime
}
```

## Security

## 1. Password Hashing

- Passwords are hashed using **bcrypt** before being stored in the database. This ensures that even if the database is compromised, passwords remain secure.

## 2. JWT Authentication

- **Token Generation**: Upon login, a JWT is generated and sent to the client.
- **Token Storage**: The token is stored in a secure, HTTP-only cookie to prevent XSS attacks.
- **Token Validation**: Middleware validates the token for protected routes.

## 3. Middleware

- Middleware is used to protect sensitive API routes by validating the JWT and ensuring the user is authenticated.

---

## How to Run the Project

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/stockly.git
cd stockly
```

## 2. Install Dependencies

```bash
npm install
```

### Note

If you get error installing any npm dependency, it might be due to using Next.js 15 and the latest version of React and tanstack/table together. Tp avoid that, run:

```bash
npm install --force
```

## 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/stockly
JWT_SECRET=your_jwt_secret
```

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Open the Application

Open your browser and navigate to `http://localhost:3000`

## API Endpoints

## Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user and return a JWT.
- **GET /api/auth/me**: Get the authenticated user's details.

## Products

- **GET /api/products**: Get a list of all products.
- **POST /api/products**: Add a new product.
- **PUT /api/products/:id**: Update an existing product.
- **DELETE /api/products/:id**: Delete a product.

## Category

- **GET /api/categories**: Get a list of all categories.
- **POST /api/categories**: Add a new categories.
- **PUT /api/categories/:id**: Update an existing categories.
- **DELETE /api/categories/:id**: Delete a categories.

## Supplier

- **GET /api/suppliers**: Get a list of all suppliers.
- **POST /api/suppliers**: Add a new suppliers.
- **PUT /api/suppliers/:id**: Update an existing suppliers.
- **DELETE /api/suppliers/:id**: Delete a suppliers.

---

## Project Structure

```plaintex
stockly
├── app
│   ├── AppHeader
│   │   └── AppHeader.tsx
│   ├── AppTable
│   │   ├── AppTable.tsx
│   │   ├── ProductDialog
│   │   │   ├── ProductDialog.tsx
│   │   │   ├── _components
│   │   │   │   ├── ProductName.tsx
│   │   │   │   ├── Price.tsx
│   │   │   │   ├── ProductCategory.tsx
│   │   │   │   ├── Quantity.tsx
│   │   │   │   ├── SKU.tsx
│   │   │   │   ├── Status.tsx
│   │   │   │   └── Supplier.tsx
│   │   ├── dropdowns
│   │   │   ├── StatusDropDown.tsx
│   │   │   └── CategoryDropDown.tsx
│   ├── DeleteDialog
│   │   └── DeleteDialog.tsx
│   ├── Products
│   │   ├── ProductTable.tsx
│   │   └── columns.tsx
│   ├── authContext.tsx
│   ├── login
│   │   └── page.tsx
│   ├── register
│   │   └── page.tsx
│   ├── page.tsx
├── components
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── public
├── styles
│   └── globals.css
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
