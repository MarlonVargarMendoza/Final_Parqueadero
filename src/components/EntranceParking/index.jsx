import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Loading.css'

const LoadingComponent = () => {
  return (
    <div class="loader">
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
      <div class="loader_item"></div>
    </div>
  );
};

export const EntranceParking = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('Registrando vehiculo.');
  const navigate = useNavigate();

  useEffect(() => {
      const timeout3 = setTimeout(() => {
        setLoading(false);
        navigate('/datos-registros')
      }, 4000);
    return () => {
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='container-entrance'>
      <div style={{ width: 600, height: 450, display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 23, textTransform: 'uppercase', fontWeight: 'bold' }}>Ingreso al Parqueadero</h1>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p style={{ fontSize: 20, marginBottom: 20 }}>{message}</p>
            <LoadingComponent />
          </div>
        )}
      </div>
    </div>
  );
}
