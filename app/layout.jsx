import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "Prompt Verse",
  description: "Discover & share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
