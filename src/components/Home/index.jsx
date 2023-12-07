import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { useToast } from '@chakra-ui/react';
import { useNavigate, Link } from "react-router-dom";
import './home.css';

export const Home = () => {
  const { globalState, updateGlobalState } = useGlobal();
  const [vehicleType, setVehicleType] = useState('car');
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [cylinder, setCylinder] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  // Listas de valores para las marcas, modelos y cilindrajes
  const carBrands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
  const motorcycleBrands = ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati'];

  const carModels = ['Sedan', 'SUV', 'Truck', 'Van'];

  const cylinderValues = ['125cc', '250cc', '500cc', '750cc', '1000cc'];

  const handleRegisterVehicle = async () => {

    // await new Promise(resolve => setTimeout(resolve, 2000));

    // Validaciones
    if (!licensePlate || !brand || (!model && vehicleType === 'car') || (!cylinder && vehicleType === 'motorcycle')) {
      toast({
        title: "Por favor, complete todos los campos.",
        status: "error",
        duration: 2000,
        isClosable: false,
        position: "top-right",
      })
      return;
    }

    // Validar que la placa no esté duplicada
    const isLicensePlateDuplicate = globalState.vehicles.some(
      (vehicle) => vehicle.licensePlate === licensePlate
    );

    if (isLicensePlateDuplicate) {
      toast({
        title: "Error",
        description: 'La placa ya está registrada. Intente con otra placa.',
        status: "error",
        duration: 4000,
        isClosable: false,
        position: "top-right",
      })
      return;
    }

    const fechaActual = new Date();

    const fecha = fechaActual.toISOString().split('T')[0];

    const hora = fechaActual.toTimeString().split(' ')[0];


    // Crear un nuevo vehículo
    const newVehicle = {
      name,
      idNumber,
      type: vehicleType,
      licensePlate,
      brand,
      model,
      cylinder,
      admissionDate: fecha,
      hour: hora,
      celda: ''
    };

    toast({
      title: "Vehiculo registrado correctamente.",
      status: "success",
      duration: 2000,
      isClosable: false,
      position: "top-right",
    })

    setTimeout(() => {
      navigate('/ingreso-parqueadero')
    }, 2500)
    // Actualizar el estado global
    updateGlobalState({ vehicles: [...globalState.vehicles, newVehicle] });

    // Limpiar los campos después del registro
    setVehicleType('car');
    setLicensePlate('');
    setBrand('');
    setModel('');
    setCylinder('');
    setName('');
    setIdNumber('');

  };

  return (
    <div className='container-insert'>
      <button></button>
      <div className="registration-container">
        <h1>Registro de Vehículos</h1>
        <div className="form-group">
          <label>Tipo de Vehículo:</label>
          <select
            required
            className="input-field"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="car">Carro</option>
            <option value="motorcycle">Moto</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Cédula:</label>
          <input
            className="input-field"
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Número de Placa:</label>
          <input
            required
            className="input-field"
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
          />
        </div>
        <div className="form-group">
          <label>Marca:</label>
          <select
            className="input-field"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {vehicleType === 'car'
              ? carBrands.map((carBrand) => <option key={carBrand} value={carBrand}>{carBrand}</option>)
              : motorcycleBrands.map((motorcycleBrand) => <option key={motorcycleBrand} value={motorcycleBrand}>{motorcycleBrand}</option>)
            }
          </select>
        </div>
        {vehicleType === 'car' && (
          <div className="form-group">
            <label>Modelo:</label>
            <select
              required
              className="input-field"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {carModels.map((carModel) => <option key={carModel} value={carModel}>{carModel}</option>)}
            </select>
          </div>
        )}
        {vehicleType === 'motorcycle' && (
          <div className="form-group">
            <label>Cilindraje:</label>
            <select
              required
              className="input-field"
              value={cylinder}
              onChange={(e) => setCylinder(e.target.value)}
            >
              {cylinderValues.map((cylinderValue) => <option key={cylinderValue} value={cylinderValue}>{cylinderValue}</option>)}
            </select>
          </div>
        )}
        <button className="register-button" onClick={handleRegisterVehicle}>
          Registrar Vehículo
        </button>
        <br />
        <br />
        <Link to={'/ingreso-parqueadero'}>
          <button className='register-button' >
              Administrar Vehiculos
          </button>
        </Link>
      </div>
    </div>
  );
};


