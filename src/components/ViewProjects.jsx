import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            setIsAuthenticated(false);
            return;
        }
        setIsAuthenticated(true);

        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/projects/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setProjects(response.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    setError('Authentication failed. Please login again.');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user_data');
                } else {
                    setError('Failed to fetch projects. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
        const storedUserData = localStorage.getItem('user_data');
        if (storedUserData) {
            try {
                setCurrentUser(JSON.parse(storedUserData));
            } catch {}
        }
    }, []);

    const handleBackToHome = () => {
        navigate('/home');
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
        navigate('/login');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Access Denied</h2>
                        <p>You need to be logged in to view projects</p>
                    </div>
                    <div className="auth-body text-center">
                        <div className="mb-4">
                            <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: 'var(--warning-color)' }}></i>
                        </div>
                        <p className="mb-4">Please log in to continue</p>
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => navigate('/login')}
                            style={{ fontWeight: '600' }}
                        >
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="display-4 fw-bold" style={{ color: '#f5f5f5' }}>All Projects</h1>
                <div>
                    <button className="btn btn-outline-secondary me-2" onClick={handleBackToHome}>
                        <i className="fas fa-arrow-left me-2"></i>Back to Home
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                </div>
            </div>

            <div className="row">
                {loading ? (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading projects...</p>
                    </div>
                ) : error ? (
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-circle me-2"></i>
                            {error}
                        </div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="col-12 text-center py-5">
                        <div className="bg-light bg-opacity-10 text-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                            style={{ width: 100, height: 100 }}>
                            <i className="fas fa-folder-open" style={{ fontSize: 48, color: '#f5f5f5' }}></i>
                        </div>
                        <h3 className="fw-bold mb-3" style={{ color: '#f5f5f5' }}>No Projects Found</h3>
                        <p className="fs-5 mb-4" style={{ color: '#f0f0f0', opacity: 0.9 }}>
                            There are currently no projects available. Be the first to create one!
                        </p>
                        <button
                            className="btn btn-primary btn-lg px-5"
                            onClick={handleBackToHome}
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                fontWeight: '600'
                            }}
                        >
                            <i className="fas fa-plus me-2"></i>
                            Create Project
                        </button>
                    </div>
                ) : (
                        projects.map((project) => (
                            <div key={project.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card shadow-lg border-0 h-100" style={{ 
                                    transition: 'transform 0.2s',
                                    backgroundColor: 'rgba(30, 30, 45, 0.8)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title fw-bold mb-0" style={{ 
                                                lineHeight: 1.2, 
                                                color: '#f5f5f5',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                                            }}>
                                                {project.title}
                                            </h5>
                                            <span className="badge bg-primary bg-opacity-25 text-primary border border-primary rounded-pill">
                                                <i className="fas fa-user me-1"></i>
                                                {project.owner}
                                            </span>
                                        </div>
                                        
                                        <p className="card-text mb-3" style={{ 
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            color: '#f0f0f0',
                                            opacity: 0.9
                                        }}>
                                            {project.description}
                                        </p>
                                        
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>Target Amount:</span>
                                                <span className="fw-bold text-success">
                                                    {formatCurrency(project.target_amount)}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="progress mb-3" style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                            <div 
                                                className="progress-bar bg-success" 
                                                role="progressbar"
                                                style={{ 
                                                    width: `${Math.round((project.current_amount / project.target_amount) * 100)}%`,
                                                    backgroundColor: '#2dce89'
                                                }}
                                                aria-valuenow={Math.round((project.current_amount / project.target_amount) * 100)}
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                            </div>
                                        </div>
                                        
                                        <div className="row text-center mb-3">
                                            <div className="col-6">
                                                <div className="border-end border-secondary">
                                                    <div className="fw-bold small" style={{ color: '#f0f0f0' }}>Start Date</div>
                                                    <div className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>{formatDate(project.start_date)}</div>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="fw-bold small" style={{ color: '#f0f0f0' }}>End Date</div>
                                                <div className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>{formatDate(project.end_date)}</div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <small style={{ color: '#f0f0f0', opacity: 0.9 }}>
                                                    {Math.round((project.current_amount / project.target_amount) * 100)}% funded
                                                </small>
                                            </div>
                                            {currentUser && project.owner === currentUser.username && (
                                                <div className="col-12 mt-3">
                                                    <button
                                                        className="btn btn-primary w-100 mt-3"
                                                        onClick={() => navigate(`/project/${project.id}`)}
                                                        style={{
                                                            background: 'linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary)))',
                                                            border: 'none',
                                                            fontWeight: '500',
                                                            letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        <i className="fas fa-eye me-2"></i>View Details
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };
    
    export default ViewProjects;