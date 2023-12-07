import React, { useState } from 'react'
import './parking.css';
import { useGlobal } from '../../context/GlobalContext';
import Swal from 'sweetalert2';

export const ShowParking = () => {

    const {globalState, updateGlobalState} = useGlobal();
    const [celdas, setCeldas] = useState(globalState.parkingCells);

    const handleMouseOver = (cell) => {

        let mensaje = '';

        if (cell.placaId) {
            mensaje = `
            <input id="celda" value="${cell.id}" hidden>
            <h1>*****VEHICULO*****</h1></br>
            <p>Tipo Vehiculo-> ${cell.type} </br>
            Placa Vehiculo-> ${cell.placaId} </br>
            Marca Vehiculo-> ${cell.brand}</p></br>
            <h1>*****INGRESO*****</h1></br>
            <p>Fecha De Ingreso-> ${cell.fecha}</br>
            Hora De Ingreso-> ${cell.hora}</p></br>
            <h1>*****USUARIO*****</h1></br>
            <p>Nombre Usuario-> ${cell.name}</br>
            Cedula Usuario-> ${cell.cedula}</p></br>`;
        } else {
            mensaje = `
            <input id="celda" value="${cell.id}" hidden>
            Parqueadero Disponible`;
        }

        Swal.fire({
            title: `Celda#${cell.id}`,
            html: mensaje,
            icon: 'success',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Liberar',
            cancelButtonText: 'Cerrar',
            confirmButtonColor: '#FF0000'
        }).then((respuesta) => {
            if (respuesta.value) {

                let celda = document.getElementById('celda').value;
                let updatedCells = [];

                for (let i=0; i < celdas.length; i++) {
                    if (celdas[i].id == celda) {
                        
                        celdas[i].placaId = null;
                        celdas[i].hora = null;
                        celdas[i].fecha = null;
                        celdas[i].cedula = null;
                    }
                    
                    updatedCells.push(celdas[i]);
                }

                updateGlobalState(prevState => ({
                    ...prevState,
                    parkingCells: updatedCells
                }));
            }
        });
      };
    
      return (
        <div className="parking-lot" style={{ paddingTop: 250, position: 'relative' }}>
          <div style={{ display: 'flex', position: 'absolute', top: 190 }}>
            <label style={{ fontSize: '30px', fontFamily: 'Copperplate Gothic' }}>PARQUEADERO</label>
          </div>
          {globalState.parkingCells.map(cell => (
            <div
              key={cell.id}
              style={{ padding: 10 }}
              onClick={() => handleMouseOver(cell)}
            >
              <label style={{ marginLeft: 40 }}>Celda#{cell.id}</label>
              <div className={`parking-cell ${cell.placaId ? 'occupied' : 'empty'}`}>
                {cell.placaId ? `Placa->${cell.placaId}` : 'Disponible'}
              </div>
            </div>
          ))}
        </div>
      );
    };