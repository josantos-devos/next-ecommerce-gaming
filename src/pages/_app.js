import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";

import { AppProvider, AuthProvider, CartProvider } from "@/contexts";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </AppProvider>
  );
}
