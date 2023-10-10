'use client'

import { authModalState } from '@/atoms/authModalAtom'
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'

import {FcGoogle} from 'react-icons/fc'
import { useSetRecoilState } from 'recoil'
import {signIn,useSession} from "next-auth/react"

type ForgotPasswordFormInputs = {
  email: string
}

export default function Login() {
    const setAuthModalState = useSetRecoilState(authModalState);
    const { data: session } = useSession();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
       

        <Stack spacing={6}>
          <Button
          onClick={() =>signIn()}
            bg={'blue.300'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
           Login 
          </Button>
        </Stack>
      </Stack>
    </Flex>

    
  )
}