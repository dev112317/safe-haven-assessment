import { BrandProvider } from '../context/BrandContext';
import './globals.css';

export const metadata = {
  title: 'Security Company MVP',
  description: 'Multi-brand security company website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find the best security solutions for your area" />
      </head>
      <body>
        <BrandProvider>
          {children}
        </BrandProvider>
      </body>
    </html>
  );
} 