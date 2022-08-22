import "../styles/globals.css";
import { AuthProvider } from "../components/Auth/auth";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
