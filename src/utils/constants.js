export const ENV = {
  SERVER_HOST: "http://127.0.0.1:1337",
  API_URL: "http://127.0.0.1:1337/api",
  // SERVER_HOST: "https://ecommerce-server-josantos.up.railway.app",
  // API_URL: "https://ecommerce-server-josantos.up.railway.app/api",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/local/register",
      LOGIN: "auth/local",
    },
    USER_ME: "users/me",
    USERS: "users",
    PLATFORM: "platforms",
    ADDRESS: "addresses",
    GAME: "games",
    WISHLIST: "wishlists",
    PAYMENT_ORDER: "payment-order",
    ORDER: "orders",
  },
  TOKEN: "token",
  CART: "CART",
  STRIPE_TOKEN:
    "pk_test_51NsGK8IPNQYM4iQCctQyAGbJS0PPzlvPG5jsW6NBPgosFr9jf9ZgjPcUfVEinF0qXK1j0bOlaRmBRXFZ1SOFBzKD00mkXOUo5z",
};
