import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(20px); }
  100% { transform: translateY(0) translateX(0); }
`;

const torchFlicker = keyframes`
  0%, 100% { 
    opacity: 1;
    transform: rotate(30deg) scale(1); 
  }
  25% { 
    opacity: 0.9; 
    transform: rotate(31deg) scale(1.02);
  }
  50% { 
    opacity: 0.85; 
    transform: rotate(29.5deg) scale(0.99);
  }
  75% { 
    opacity: 0.95; 
    transform: rotate(30.5deg) scale(1.01);
  }
`;

// Styled Components
const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #050508;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 200, 100, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 80% 60%, rgba(100, 150, 255, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 40% 70%, rgba(200, 100, 255, 0.15) 0%, transparent 30%),
    linear-gradient(to bottom, #0a0a12, #050508);
`;

const TorchEffect = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 220, 150, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 80% 60%, rgba(150, 180, 255, 0.15) 0%, transparent 25%),
    radial-gradient(circle at 40% 70%, rgba(220, 150, 255, 0.15) 0%, transparent 30%);
  pointer-events: none;
  z-index: 0;
  animation: ${torchFlicker} 8s infinite alternate;
  transform: rotate(30deg);
`;

const ParticleEffect = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 0;
  pointer-events: none;
  animation: ${float} 15s linear infinite;
  opacity: 0.6;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <TorchEffect />
      <ParticleEffect />
      <Content>
        {children}
      </Content>
    </LayoutWrapper>
  );
};

export default Layout;
