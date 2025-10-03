import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const storedUserData = localStorage.getItem('user_data');

        if (accessToken && storedUserData) {
            setIsAuthenticated(true);
            setUserData(JSON.parse(storedUserData));
        } else if (location.state?.userData) {
            setIsAuthenticated(true);
            setUserData(location.state.userData);
        } else {
            setIsAuthenticated(false);
        }
    }, [location]);

    const handleCreateProject = () => {
        navigate('/create-project');
    };

    const handleViewProjects = () => {
        navigate('/view-projects');
    };

    const handleMyProjects = () => {
        navigate('/my-projects');
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)' }}>
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Access Required</h2>
                        <p>Please log in to continue</p>
                    </div>
                    <div className="auth-body text-center">
                        <div className="mb-4">
                            <i className="fas fa-lock" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
                        </div>
                        <p className="mb-4">You need to be logged in to access this page.</p>
                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleLogin}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h1 className="display-4 font-weight-bold mb-3">Welcome, {userData?.first_name || userData?.username || 'User'}!</h1>
                <p className="lead" style={{ color: 'var(--bs-gray-400)' }}>Start exploring or create your own crowdfunding project</p>
            </header>

            <div className="row mb-5">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                <i className="fas fa-project-diagram fa-2x text-primary"></i>
                            </div>
                            <h3 className="h4" style={{ color: 'var(--bs-primary)' }}>Create Projects</h3>
                            <p style={{ color: 'var(--bs-gray-400)' }}>Start your own crowdfunding campaign and bring your ideas to life</p>
                            <button
                                className="btn btn-primary px-4"
                                onClick={handleCreateProject}
                                style={{
                                    background: 'linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary))',
                                    border: 'none',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Create Project
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center">
                            <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                <i className="fas fa-compass fa-2x text-success"></i>
                            </div>
                            <h3 className="h4" style={{ color: 'var(--bs-success)' }}>Discover</h3>
                            <p style={{ color: 'var(--bs-gray-400)' }}>Explore innovative projects and support the ones you believe in</p>
                            <button
                                className="btn btn-success px-4"
                                onClick={handleViewProjects}
                                style={{
                                    background: 'linear-gradient(45deg, var(--bs-success), var(--bs-success-light, var(--bs-success))',
                                    border: 'none',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                View Projects
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body text-center">
                            <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                <i className="fas fa-folder-open fa-2x text-warning"></i>
                            </div>
                            <h3 className="h4" style={{ color: 'var(--bs-warning)' }}>My Projects</h3>
                            <p style={{ color: 'var(--bs-gray-400)' }}>Edit, update, and manage all your existing projects in one place</p>
                            <button
                                className="btn btn-warning px-4"
                                onClick={handleMyProjects}
                                style={{
                                    background: 'linear-gradient(45deg, var(--bs-warning), var(--bs-warning-light, var(--bs-warning))',
                                    border: 'none',
                                    color: '#000',
                                    fontWeight: '500',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Edit My Projects
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;