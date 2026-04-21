# Product Management App - Project Structure

## Folder Organization

```
app/
├── api/                           # API Route handlers
│   ├── products/
│   │   ├── route.js              # POST /api/products
│   │   └── [id]/
│   │       └── route.js          # DELETE /api/products/[id]
├── products/                      # Product pages & components
│   ├── page.js                   # Products list page
│   ├── [id]/
│   │   └── page.js               # Product detail page
│   ├── AddProductComponent.js    # Add product form component
│   ├── DeleteProductButton.js    # Delete button component
│   └── products-clean.css        # Styles styles
├── services/                      # Business logic & API calls
│   └── productService.js         # Product API service
├── globals-extended.css          # Global design tokens & styles
└── layout.js                      # Root layout
model/
├── dbConnection.js               # Database connection
└── productModel.js               # Database queries
```

## Architecture Principles

### Separation of Concerns
- **Components** (`AddProductComponent.js`, `DeleteProductButton.js`): Handle UI logic only
- **Services** (`productService.js`): Handle API calls and business logic
- **Models** (`productModel.js`): Handle database queries
- **API Routes** (`app/api/`): Server-side request handlers

### Design Tokens (CSS Variables)
All colors, spacing, shadows, and border-radius are defined in `globals-extended.css` using CSS custom properties. This ensures consistency across the app.

**Key Token Categories:**
- Colors: `--color-primary`, `--color-danger`, etc.
- Spacing: `--spacing-xs`, `--spacing-md`, `--spacing-lg`
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Border radius: `--radius`, `--radius-lg`

### Component Responsibilities

1. **AddProductComponent.js**
   - Manages form state
   - Calls `addProductAPI()` service
   - Displays errors via local state
   - Closes form on success

2. **DeleteProductButton.js**
   - Confirms deletion with user
   - Calls `deleteProduct()` service
   - Handles errors gracefully
   - Redirects after successful deletion

3. **productService.js**
   - Centralizes all API calls
   - Single point for modifying API endpoints
   - Handles fetch configuration

### Styling Strategy

- **globals-extended.css**: Design tokens, button styles, form styles
- **products-clean.css**: Component-specific styles using design tokens

