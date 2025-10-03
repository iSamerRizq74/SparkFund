import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ViewProjects from './components/ViewProjects';
import EditProject from './components/EditProject';
import CreateProject from './pages/CreateProject';
import MyProjects from './components/MyProjects';

const theme = {
  colors: {
    primary: '#9d7aff',
    primaryLight: '#c5a6ff',
    secondary: '#6ce9ff',
    accent: '#ff8a3d',
    light: '#f0f4ff',
    dark: '#0f0f1a',
    bgDark: '#050508',
    success: '#2dce89',
    danger: '#f5365c',
    warning: '#fb6340',
    info: '#11cdef',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

// Create a wrapper component that includes the Layout
const RouteWrapper = ({ component: Component }) => (
  <Layout>
    <Component />
  </Layout>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<RouteWrapper component={Login} />} />
          <Route path="/login" element={<RouteWrapper component={Login} />} />
          <Route path="/register" element={<RouteWrapper component={Register} />} />
          <Route path="/home" element={<RouteWrapper component={Home} />} />
          <Route path="/create-project" element={<RouteWrapper component={CreateProject} />} />
          <Route path="/view-projects" element={<RouteWrapper component={ViewProjects} />} />
          <Route path="/project/:projectId" element={<RouteWrapper component={EditProject} />} />
          <Route path="/my-projects" element={<RouteWrapper component={MyProjects} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
