{
  "id": "conf-cart-001",
  "title": "Shopping Cart Feature Specification",
  "content": "This Confluence page documents the design and implementation of the Shopping Cart feature for our e-commerce application.\n\n**Overview:**\nThe Shopping Cart allows users to add, update, and remove products before proceeding to checkout. It supports both guest and authenticated sessions.\n\n**Key Features:**\n- Add to Cart: Users can add items with selected quantity and variant (size, color).\n- Update Quantity: Users can increase or decrease quantity within stock limits.\n- Remove Item: Users can remove individual items from the cart.\n- Persistent Cart: Logged-in users have cart data synced with backend. Guests use local storage.\n- Price Calculation: Automatically reflects promotions, discounts, and taxes.\n\n**API Endpoints:**\n- `POST /cart/add`\n- `PATCH /cart/update`\n- `DELETE /cart/remove`\n- `GET /cart/view`\n\n**Tech Stack:**\n- Backend: Node.js + PostgreSQL\n- Frontend: Flutter Web / Mobile\n- Storage: Redis for temporary cart caching\n\n**Security & Validation:**\n- Stock check before checkout\n- Price recalculated at checkout to prevent manipulation\n\nThis feature is a critical part of the purchase flow and tightly integrated with the product catalog, promotion engine, and checkout module.",
  "author": "Sophia Tran",
  "created_at": "2023-10-01T12:00:00Z",
  "type": "confluence",
  "url": "https://jira.com/confluence/02"
}
