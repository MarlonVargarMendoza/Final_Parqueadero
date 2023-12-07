import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import './login.css'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = () => {

    const defaultEmail = 'admin@gmail.com';
    const defaultPassword = 'admin';

    if (email === defaultEmail && password === defaultPassword) {
      toast({
        title: "Inicio de sesión exitoso",
        status: "success",
        duration: 4000,
        isClosable: false,
        position: "top-right",
      })
      navigate("/registro-vehiculos");
    } else {
      toast({
        title: "Error de inicio de sesión",
        description:
          "El email o la contraseña son incorrectos.",
        status: "error",
        duration: 7000,
        position: "top-right",
      })
    }
  };

  return (
    <Flex
      className='container-login'
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={"#000"}
    >

      <Stack borderRadius={7} bg={'#000'} spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={'#FFF'} mb={5} fontSize={'5xl'}>Inicio de sesión</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para disfrutar de toda nuestra genialidad ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={"#0a0a0a"}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo electronico</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'#023A06'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}