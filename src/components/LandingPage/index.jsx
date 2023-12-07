import React from 'react';
import './landing.css'
import { Link } from "react-router-dom";

const landingStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const titleStyles = {
  fontSize: '2.5rem',
  marginBottom: '20px',
  color: '#FFFFFF',
};

const subtitleStyles = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  color: '#FFF',
};

const buttonStyles = {
  backgroundColor: '#023A06',
  color: 'white',
  padding: '12px 24px',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

export const LandingPage = () => {
  return (
    <div className='container-landing' style={landingStyles}>
      <div className='cont-landing'>
        <h1 style={titleStyles}>Bienvenido a la Gestión de Parqueaderos</h1>
        <p style={subtitleStyles}>Explora nuestras funciones y administra tus parqueaderos de manera eficiente.</p>
        <Link to={'/auth/login'}>
          <button style={buttonStyles}>
            Ir al Login
          </button>
        </Link>

      </div>
    </div>
  );
};
