
import Nav from "./components/nav";
import Provider from "./context/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children } : { children: React.ReactNode }) => (
  <html lang='en'>
    <body>
      <Provider session={undefined}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;