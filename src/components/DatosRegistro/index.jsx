import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useGlobal } from '../../context/GlobalContext';
import { Button, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Input, 
  FormControl,
  FormLabel,
  useDisclosure, 
  
} from '@chakra-ui/react';

export const DatosRegistros = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { globalState, updateGlobalState } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filteredVehicles, setFilteredVehicles] = useState(globalState.vehicles);
  const [celda, setCelda] = useState(globalState.parkingCells);
  let bandera = false;

  useEffect(() => {

    const filtro = globalState.vehicles.filter((vehicles) =>
      vehicles.licensePlate.toUpperCase().includes(searchTerm.toUpperCase()) ||
      vehicles.idNumber.toUpperCase().includes(searchTerm.toUpperCase())
    )

    setFilteredVehicles(filtro);
  }, [searchTerm]);
  
  useEffect(() => {
    // Actualizar los resultados filtrados cada vez que globalState.vehicles cambia

    let updatedFilteredVehicles = [];

    for (let i=0; i < filteredVehicles.length; i++) {

      let ingresado = false;

      for (let j = 0; j < globalState.parkingCells.length; j++) {
        if (filteredVehicles[i].licensePlate == globalState.parkingCells[j].placaId) {

          ingresado = true;
        }
      }

      !ingresado && updatedFilteredVehicles.push(filteredVehicles[i]);
    }

    setFilteredVehicles(updatedFilteredVehicles);
  }, [globalState.vehicles]);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleIngresarVehiculo = () => {
    const fechaActual = new Date();
    const fecha = fechaActual.toISOString().split('T')[0];
    const hora = fechaActual.toTimeString().split(' ')[0];
    // Filtrar para excluir el vehículo seleccionado
    let updatedFilteredVehicles = [];

    if (globalState.celdasOcupadas == globalState.parkingCells.length) {

      onClose();
      setSearchTerm('');
      setSelectedVehicle(null);

      Swal.fire({
        title: `Ingreso Erroneo`,
        text: 'Todas las celdas estan ocupadas',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500
      });

      return;
    }
    
    globalState.parkingCells.map(element => {
      if (element.placaId == null && !bandera) {
        bandera = true;
        element.placaId = selectedVehicle.licensePlate;
        element.hora = hora;
        element.fecha = fecha;
        element.cedula = selectedVehicle.idNumber;
        element.name = selectedVehicle.name;
        element.brand = selectedVehicle.brand;
        element.type = selectedVehicle.type;

        setCelda({...celda, element});

        updateGlobalState(prevState => ({
          ...prevState,
          parkingCells: celda
        }));
      }
    })

    if (!bandera) {

      onClose();
      setSearchTerm('');
      setSelectedVehicle(null);
      
      Swal.fire({
        title: `Ingreso Erroneo`,
        text: 'Todas las celdas estan ocupadas',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500
      });

      return;
    }

    for (let i=0; i < filteredVehicles.length; i++) {

      let ingresado = false;

      for (let j = 0; j < globalState.parkingCells.length; j++) {
        if (filteredVehicles[i].licensePlate == globalState.parkingCells[j].placaId) {

          ingresado = true;
        }
      }

      !ingresado && updatedFilteredVehicles.push(filteredVehicles[i]);
    }    

    filteredVehicles.filter(vehicle => vehicle !== selectedVehicle);

    // Actualizar el estado local y global
    setFilteredVehicles(updatedFilteredVehicles);

    // Restablecer el estado local
    onClose();
    setSearchTerm('');
    setSelectedVehicle(null);

    Swal.fire({
      title: `Ingreso Exitoso`,
      text: 'Vehiculo Ingresado Correctamente',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    });
  };

  return (
    <Stack height={600} justifyContent='center' alignItems='center' spacing={4} direction='row' align='center'>
      <Link to={'/registro-vehiculos'}>
        <Button color={'red'} size='lg'>
          Salir
        </Button>
      </Link>
      <Button onClick={onOpen}>Ingresar Vehiculo</Button>
      <Link to={"/mostrar-parqueadero"} >
        <Button>Mostrar Parqueadero</Button>
      </Link>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setSearchTerm(''); setSelectedVehicle(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Buscar Por Placa O CC.</FormLabel>
              <Input
                placeholder='Ingrese Placa o CC'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>
            {filteredVehicles.length > 0 ? (
              <Stack mt={4}>
                <Text fontWeight="bold">Resultados:</Text>
                {filteredVehicles.map((vehicle, index) => (
                  <Text
                    key={index}
                    onClick={() => handleSelectVehicle(vehicle)}
                    cursor="pointer"
                    color={selectedVehicle === vehicle ? "blue.500" : "inherit"}
                  >{`Nombre: ${vehicle.name}, Placa: ${vehicle.licensePlate}, CC: ${vehicle.idNumber}`}</Text>
                ))}
              </Stack>
            ) : (
              <Text mt={4} color="red.500">No se encontraron resultados.</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleIngresarVehiculo} isDisabled={!selectedVehicle}>
              Ingresar Vehiculo
            </Button>
            <Button onClick={() => { onClose(); setSearchTerm(''); setSelectedVehicle(null); }}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
