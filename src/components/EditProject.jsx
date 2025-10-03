import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        target_amount: '',
        start_date: '',
        end_date: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            const accessToken = localStorage.getItem('access_token');
            const storedUserData = localStorage.getItem('user_data');
            
            if (!accessToken) {
                setError('Please log in to view this project');
                setLoading(false);
                return;
            }

            try {
                // Fetch project details
                const res = await axios.get(`http://localhost:8000/api/projects/${projectId}/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                
                if (!res.data) {
                    throw new Error('No project data received');
                }

                setForm({
                    title: res.data.title || '',
                    description: res.data.description || '',
                    target_amount: res.data.target_amount || '',
                    start_date: res.data.start_date ? res.data.start_date.split('T')[0] : '',
                    end_date: res.data.end_date ? res.data.end_date.split('T')[0] : ''
                });
                
                setProject(res.data);
                
                // Check if current user is the owner
                if (storedUserData) {
                    try {
                        const user = JSON.parse(storedUserData);
                        setIsOwner(Number(res.data.owner) === Number(user.id));
                    } catch (err) {
                        console.error('Error parsing user data:', err);
                        setIsOwner(false);
                    }
                }
            } catch (err) {
                console.error("Fetch project error:", err, err?.response);
                setError(err.response?.data?.detail || 'Failed to load project data.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProject();
    }, [projectId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
            setError('Please log in to update this project');
            return;
        }

        // Validate form data
        if (!form.title.trim()) {
            setError('Project title is required');
            return;
        }

        try {
            await axios.put(
                `http://localhost:8000/api/projects/${projectId}/update/`,
                form,
                {
                    headers: { 
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            setSuccess('Project updated successfully!');
            setTimeout(() => navigate('/my-projects'), 1200);
        } catch (err) {
            console.error("Update project error:", err, err?.response);
            const errorMessage = err.response?.data?.detail || 'Failed to update project. Please try again.';
            setError(Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage);
        }
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3" style={{ color: '#f5f5f5' }}>Loading project details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <div>{error}</div>
                </div>
                <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => navigate('/my-projects')}
                    style={{
                        background: 'linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary)))',
                        border: 'none',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}
                >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to My Projects
                </button>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">Project not found or you don't have permission to view it.</div>
                <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => navigate('/my-projects')}
                >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to My Projects
                </button>
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger d-flex align-items-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <div>You are not authorized to edit this project.</div>
                </div>
                <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => navigate('/my-projects')}
                    style={{
                        background: 'linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary)))',
                        border: 'none',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}
                >
                    <i className="fas fa-arrow-left me-2"></i>
                    Back to My Projects
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(30, 30, 45, 0.8)', backdropFilter: 'blur(10px)' }}>
                        <div className="card-body p-4">
                            <h2 className="mb-4 text-center" style={{ color: '#f5f5f5' }}>Edit Project</h2>
                            
                            {success && (
                                <div className="alert alert-success d-flex align-items-center" role="alert">
                                    <i className="fas fa-check-circle me-2"></i>
                                    <div>{success}</div>
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" style={{ color: '#f0f0f0' }}>Project Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: '#f5f5f5'
                                        }}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{ color: '#f0f0f0' }}>Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={form.description}
                                        onChange={handleChange}
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: '#f5f5f5'
                                        }}
                                    ></textarea>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="target_amount" className="form-label" style={{ color: '#f0f0f0' }}>Target Amount ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="target_amount"
                                            name="target_amount"
                                            min="1"
                                            value={form.target_amount}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: '#f5f5f5'
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="start_date" className="form-label" style={{ color: '#f0f0f0' }}>Start Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="start_date"
                                            name="start_date"
                                            value={form.start_date}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: '#f5f5f5'
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="end_date" className="form-label" style={{ color: '#f0f0f0' }}>End Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="end_date"
                                            name="end_date"
                                            value={form.end_date}
                                            onChange={handleChange}
                                            required
                                            min={form.start_date}
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: '#f5f5f5'
                                            }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary me-md-2"
                                        onClick={() => navigate('/my-projects')}
                                    >
                                        <i className="fas fa-times me-2"></i>
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        style={{
                                            background: 'linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary)))',
                                            border: 'none',
                                            fontWeight: '500',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        <i className="fas fa-save me-2"></i>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProject;
