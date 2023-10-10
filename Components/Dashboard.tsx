
import React, { useState, useEffect } from 'react';
import Link from "next/link"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  Card,
  CardBody,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  CircularProgress,
  VStack,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Center,
  Select,
  Input,
  Image,
  Progress,
} from '@chakra-ui/react';
import TopBar from "../Components/TopBar"
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import UploadData from './UploadData';
import { firestore } from '@/firebase/clientApp';
import {PiStudentBold} from 'react-icons/pi'
import { AddIcon } from '@chakra-ui/icons';
interface Props {
  children: React.ReactNode;
}



const NavLink = (props: Props) => {
  const { children } = props;
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
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentRecords, setStudentRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [absentCount, setAbsentCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [sickCount, setSickCount] = useState(0);
  const [filterBy, setFilterBy] = useState('Grade');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const db = getFirestore();
    const locationRef = collection(firestore, 'StudentRecords');
    const unsubscribe = onSnapshot(locationRef, (snapshot) => {
      const locationData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudentRecords(locationData);
      setLoading(false);

      // Calculate counts
      let absent = 0;
      let present = 0;
      let sick = 0;
      locationData.forEach((record) => {
        if (record.Comment === 'Absent') {
          absent++;
        } else if (record.Comment === 'Present') {
          present++;
        } else if (record.Comment === 'Sick') {
          sick++;
        }
      });
      setAbsentCount(absent);
      setPresentCount(present);
      setSickCount(sick);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  // Filter function to apply the selected filter to the table data
 // Filter function to apply the selected filter to the table data
 const filteredRecords = studentRecords.filter((record) => {
  if (filterBy === 'Grade') {
   // Trim and convert to lowercase for case-insensitive comparison
    const trimmedFilterValue = filterValue.trim().toLowerCase();
    
    // Check if the trimmed filter value is not empty
    if (trimmedFilterValue === '') {
      return true; // No filtering applied when filterValue is empty
    }

    const filtered = (
      typeof record.Grade === 'string' &&
      record.Grade.trim().toLowerCase() === trimmedFilterValue
    );
    console.log(`Filtering by: ${filterBy}, Filtering value: ${filterValue}, Result: ${filtered}`);
    return filtered;
  } else if (filterBy === 'Class') {
    return (
      typeof record.Class === 'string' &&
      record.Class.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  } else if (filterBy === 'Comment') {
    return (
      typeof record.Comment === 'string' &&
      record.Comment.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
    );
  }
  return true;
});

  return (
    <>
    <TopBar/>
       <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <></>
      </Box>

      

      <Box mt={5} ml={{ base: '0', md: '0' }} >
        <Flex flexWrap="wrap" gap={4} mb={4}>
          <Box width={{ base: '100%', md: 'auto' }} ml={20}>
            <Select
              width={150}
              onChange={(e) => setFilterBy(e.target.value)}
              value={filterBy}
            >
              <option value="Grade">Grade</option>
              <option value="Class">Class</option>
              <option value="Comment">Comment</option>
            </Select>
          </Box>

          <Box width={{ base: '50%', md: 'auto' }} mt={{ base: 1, md: 0 }} ml={['5rem','0']}>
            <Input
              placeholder={`Search by ${filterBy}`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          </Box>
        </Flex>
      </Box>

      <TableContainer overflowY={'auto'} height={'200px'}>
     
        <Center>
        
          <Table size="sm" width="90%" variant={'simple'} colorScheme="gray" ml={['15rem','0']} mb={['2rem','0']} >
            <Thead>
              <Tr>
               
                <Th>ID's</Th>
                <Th>Full Names</Th>
                <Th>Grades</Th>
                <Th>Classes</Th>
                <Th>Comments</Th>
              </Tr>
            </Thead>
            <Tbody >
              {loading ? (
                <Tr >
                  <Td colSpan={5}>Loading...</Td>
                </Tr>
              ) : filteredRecords.length === 0 ? (
                <Tr>
                  <Td colSpan={5}>No records found.</Td>
                </Tr>
              ) : (
                filteredRecords.map((record) => (

                  <Tr key={record.id} >
                    
                    <Td>{record.StudentID}</Td>
                    <Td>{record.Name}</Td>
                    <Td>{record.Grade}</Td>
                    <Td>{record.Class}</Td>
                    <Td>{record.Comment}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
           
          </Table>

         
        </Center>
      </TableContainer>

      
      
      
      <Card
  boxShadow={'lg'}
  mt={4}
  mb={5}
  width={['100%', '30rem']} // Adjust the width based on breakpoints
  mx={['-0rem', '4.5rem']} // Adjust the margin based on breakpoints
  bgColor={'gray.200'}
>
  <CardBody>
    <Center fontWeight={'extrabold'}>Students Stats</Center>
    <Box>
      <Text>Students Present</Text>
      <Flex display={'flex'} alignItems="center">
        <Progress value={presentCount} size='xs' colorScheme='blue' w={['100%', '400px']} /> {/* Adjust the width based on breakpoints */}
        <Text ml={5} mt={-3} color={'blue'}>{presentCount}</Text>
      </Flex>
    </Box>

    <Box mt={3}>
      <Text>Students Absent</Text>
      <Flex display={'flex'} alignItems="center">
        <Progress value={absentCount} size='xs' colorScheme='red' w={['100%', '400px']} /> {/* Adjust the width based on breakpoints */}
        <Text ml={5} mt={-3} color={'blue'}>{absentCount}</Text>
      </Flex>
    </Box>

    <Box mt={3}>
      <Text>Students Sick</Text>
      <Flex display={'flex'} alignItems="center">
        <Progress value={sickCount} size='xs' colorScheme='gray' w={['100%', '400px']} /> {/* Adjust the width based on breakpoints */}
        <Text ml={5} mt={-3} color={'blue'}>{sickCount}</Text>
      </Flex>
    </Box>
  </CardBody>
</Card>
      </>
  );
}
