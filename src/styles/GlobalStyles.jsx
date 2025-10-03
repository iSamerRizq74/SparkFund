import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #e9ecef;
    background: #050508;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  /* Base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: #f8f9fa;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
    color: #e9ecef;
  }

  a {
    color: #9d7aff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #c5a6ff;
      text-decoration: none;
    }
  }

  /* Form elements */
  input, textarea, select, button {
    font-family: inherit;
    font-size: 1rem;
  }

  /* Utility classes */
  .container {
    width: 100%;
    padding: 0 1rem;
    margin: 0 auto;
    max-width: 1200px;
  }
`;

export default GlobalStyles;
