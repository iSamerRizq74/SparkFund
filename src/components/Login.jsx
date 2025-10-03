import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.light};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.light};
  font-size: 1rem;
  transition: ${({ theme }) => theme.transition};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}40`};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.primaryLight})`};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin: 1rem 0;
  text-align: center;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.light};
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  margin-top: 1rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_data', JSON.stringify(response.data.user));

            navigate('/home', {
                state: {
                    userData: response.data.user
                }
            });
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Login failed. Please check your connection and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginContainer>
            <LoginCard>
                <Title>Welcome Back</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </FormGroup>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Sign In'}
                    </Button>
                    <ForgotPasswordLink to="/forgot-password">
                        Forgot password?
                    </ForgotPasswordLink>
                </form>
                <RegisterLink>
                    Don't have an account? <Link to="/register">Create Account</Link>
                </RegisterLink>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;
