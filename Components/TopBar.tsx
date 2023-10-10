'use client'

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import {signIn,signOut,useSession} from "next-auth/react"

interface Props {
  children: React.ReactNode
}



const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: session } = useSession();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href='/'>
            <Box>
              <Image src="/logo.jpeg" />
            </Box>
            </Link>

          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
            <Link href='/RecordAdd'>
        <Button
         onClick={onOpen}
              variant={'solid'}
              colorScheme={'blue'}
              size={'sm'}
              mr={4}
              mt={5}
              mb={5}
              rightIcon={<AddIcon />}>
              New Record
            </Button>
            </Link>

              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={session?.user?.image}
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                onClick={()=>signOut()}
                >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

       
      </Box>

     
    </>
  )
}