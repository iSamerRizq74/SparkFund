import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100%;
  padding: 1rem 0;
`;

const Card = styled.div`
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  padding: 2.5rem;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '1200px'};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    background: ${({ iconBg }) => `var(--bs-${iconBg}-bg, rgba(var(--bs-${iconBg}-rgb), 0.1))`};
    
    .icon {
      font-size: 2rem;
      color: ${({ iconColor }) => `var(--bs-${iconColor})`};
    }
  }

  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.light};
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--bs-gray-400);
    margin: 0;
  }
`;

const PageLayout = ({ 
  children, 
  title, 
  subtitle, 
  icon = 'fa-folder-plus', 
  iconColor = 'primary',
  maxWidth 
}) => {
  return (
    <PageContainer className="d-flex align-items-center">
      <Card maxWidth={maxWidth}>
        {(title || subtitle) && (
          <PageHeader iconColor={iconColor} iconBg={iconColor}>
            <div className="icon-container">
              <i className={`fas ${icon} icon`}></i>
            </div>
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </PageHeader>
        )}
        {children}
      </Card>
    </PageContainer>
  );
};

export default PageLayout;
