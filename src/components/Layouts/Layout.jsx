import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title, description, keywords, author, canonicalUrl }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>
      <Navbar />
      <main style={{ flex: '1' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "MERN stack project",
  keywords: "mern, react, node, mongodb",
  author: "Rahul",
  canonicalUrl: "http://mysite.com/example"
};

export default Layout;