

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../components/PageLayout';
import styled from 'styled-components';
import Layout from '../components/Layout';

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--bs-gray-300);
    font-weight: 500;
    
    i {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--bs-light);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:focus {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 0.25rem rgba(157, 122, 255, 0.25);
      color: var(--bs-light);
    }
    
    &::placeholder {
      color: var(--bs-gray-500);
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, var(--bs-primary), var(--bs-primary-light, var(--bs-primary)));
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(157, 122, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function CreateProjectContent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/api/projects/create/',
        {
          title,
          description,
          target_amount: goal,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('✅ Project created successfully!');
      setTitle('');
      setDescription('');
      setGoal('');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      setError('❌ Failed to create project. Please try again.');
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <PageLayout 
        title="Create New Project"
        subtitle="Fill in your project details below"
        icon="fa-folder-plus"
        iconColor="primary"
        maxWidth="800px"
      >

          <hr className="my-4" style={{ borderTop: '2px dashed #ccc' }} />

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {message && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="title">
                <i className="fas fa-heading"></i>
                Project Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-lg"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="description" className="form-label fw-semibold">
                <i className="fas fa-align-left me-2 text-primary"></i>
                Description
              </label>
              <textarea
                id="description"
                className="form-control form-control-lg"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter project description"
                rows={4}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="goal" className="form-label fw-semibold">
                <i className="fas fa-dollar-sign me-2 text-primary"></i>
                Target Amount
              </label>
              <input
                type="number"
                id="goal"
                className="form-control form-control-lg"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="Enter fundraising target"
                required
                min="1"
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="startDate" className="form-label fw-semibold">
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="form-control form-control-lg"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="endDate" className="form-label fw-semibold">
                <i className="fas fa-calendar-alt me-2 text-primary"></i>
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="form-control form-control-lg"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-plus-circle"></i>
                  Create Project
                </>
              )}
            </SubmitButton>

            <div className="text-center">
              <button
                onClick={() => navigate('/home')}
                className="btn btn-link text-secondary fw-semibold text-decoration-none"
              >
                ← Back to Home
              </button>
            </div>
          </form>
      </PageLayout>
    </div>
  );
}

// Wrap the CreateProjectContent with Layout
export default function CreateProject() {
  return (
    <Layout>
      <CreateProjectContent />
    </Layout>
  );
}

export { CreateProjectContent };
