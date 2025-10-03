import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    }, []);

    const handleBackToHome = () => {
        navigate('/home');
    };

    const handleViewProject = (projectId) => {
        navigate(`/project/${projectId}`);
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
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateProgress = (current, target) => {
        if (target <= 0) return 0;
        const progress = (current / target) * 100;
        return Math.min(Math.round(progress), 100);
    };

    if (!isAuthenticated) {
        return (
            <div className="auth-container" style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)' }}>
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Access Required</h2>
                        <p>Please log in to view projects</p>
                    </div>
                    <div className="auth-body text-center">
                        <div className="mb-4">
                            <i className="fas fa-lock" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
                        </div>
                        <p className="mb-4">You need to be logged in to view projects.</p>
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => navigate('/login')}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3" style={{ color: '#f5f5f5' }}>Loading projects...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                </div>
                <button className="btn btn-outline-secondary" onClick={handleBackToHome}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="display-4 fw-bold" style={{ color: '#f5f5f5' }}>My Projects</h1>
                <button className="btn btn-outline-secondary" onClick={handleBackToHome}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to Home
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-5">
                    <div className="bg-light bg-opacity-10 text-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                         style={{ width: '100px', height: '100px' }}>
                        <i className="fas fa-folder-open" style={{ fontSize: '48px', color: '#f5f5f5' }}></i>
                    </div>
                    <h3 className="mb-3" style={{ color: '#f5f5f5' }}>No Projects Found</h3>
                    <p className="mb-4" style={{ color: '#f0f0f0', opacity: 0.9 }}>
                        You haven't created any projects yet. Get started by creating your first project!
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/create-project')}
                    >
                        <i className="fas fa-plus me-2"></i>
                        Create a Project
                    </button>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {projects.map((project) => (
                        <div className="col" key={project.id}>
                            <div className="card shadow-lg border-0 h-100" style={{ 
                                backgroundColor: 'rgba(30, 30, 45, 0.8)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <h5 className="card-title fw-bold mb-0" style={{ color: '#f5f5f5' }}>
                                            {project.title}
                                        </h5>
                                        <span className="badge bg-primary bg-opacity-25 text-primary border border-primary rounded-pill">
                                            <i className="fas fa-user me-1"></i>
                                            {project.owner}
                                        </span>
                                    </div>
                                    
                                    <p className="card-text mb-3" style={{ 
                                        color: '#f0f0f0', 
                                        opacity: 0.9,
                                        minHeight: '60px'
                                    }}>
                                        {project.description || 'No description provided.'}
                                    </p>
                                    
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>Target Amount:</span>
                                            <span className="fw-bold" style={{ color: '#2dce89' }}>
                                                {formatCurrency(project.target_amount)}
                                            </span>
                                        </div>
                                        <div className="progress" style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                            <div 
                                                className="progress-bar" 
                                                role="progressbar"
                                                style={{ 
                                                    width: `${calculateProgress(project.current_amount, project.target_amount)}%`,
                                                    backgroundColor: '#2dce89'
                                                }}
                                                aria-valuenow={calculateProgress(project.current_amount, project.target_amount)}
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-1">
                                            <small style={{ color: '#f0f0f0', opacity: 0.9 }}>
                                                {calculateProgress(project.current_amount, project.target_amount)}% funded
                                            </small>
                                            <small style={{ color: '#f0f0f0', opacity: 0.9 }}>
                                                Raised: {formatCurrency(project.current_amount)}
                                            </small>
                                        </div>
                                    </div>
                                    
                                    <div className="row text-center mt-4">
                                        <div className="col-6">
                                            <div className="border-end border-secondary">
                                                <div className="fw-bold small" style={{ color: '#f0f0f0' }}>Start Date</div>
                                                <div className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>
                                                    {formatDate(project.start_date)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="fw-bold small" style={{ color: '#f0f0f0' }}>End Date</div>
                                            <div className="small" style={{ color: '#f0f0f0', opacity: 0.9 }}>
                                                {formatDate(project.end_date)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() => handleViewProject(project.id)}
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProjects;
