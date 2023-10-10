import React,{useState} from 'react'
import {useToast, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spinner, Select,Box, Center, CardBody, Card } from "@chakra-ui/react"
import TopBar from '../Components/TopBar'
import { auth, firestore, storage } from "../firebase/clientApp";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  uploadBytes
} from "@firebase/firestore";
import { useRouter } from 'next/router';


export default function RecordAdd() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast();
    const [id,setID] = useState('');
    const [name,setName] = useState('');
    const [grade,setGrade] = useState('');
    const [classes,setClasses] = useState('');
    const [comment,setComment] = useState('');
    const [loading,setLoading] = useState(false);
    const router = useRouter();
 

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);
    
        const docRef = await addDoc(
          collection(
            firestore,
            'StudentRecords',
          ),
          {
           StudentID: id,
           Name: name,
           Grade:grade,
           Class: classes,
           Comment:comment,
          timestamp: serverTimestamp(),
           
          }
        ).then(() => {
              setLoading(false);
              router.push('/');

              toast({
                title: 'Record added successfully👍',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
            })
            .catch((error) => {
              alert(error.message);
              setLoading(false);
              toast({
                title: 'Error uploading record',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
              });
            });
        
    
        setLoading(false);
        setID("");
        setClasses("");
        setGrade("");
        setClasses("");
        setComment("");
          }   
    

  return (
    <>
    <TopBar/>
    <Center>
    <Card boxShadow={'lg'} w={'md'}>
    <CardBody>
    
   
      <Box>
      <FormControl>
                <FormLabel>ID</FormLabel>
                <Input 
                type='number'
                variant={'filled'}
                value={id}
                onChange={(e)=>setID(e.target.value)}
                ref={initialRef} placeholder='student id' />
              </FormControl>

              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                type='text'
                variant={'filled'}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ref={initialRef} placeholder='student full name' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Grade</FormLabel>
                <Select
                variant={'filled'}
                value={grade}
                onChange={(e)=>setGrade(e.target.value)}
                placeholder='Select Grade'>
              <option value='A+'>A+</option>
              <option value='A'>A</option>
              <option value='B+'>B+</option>
              <option value='B'>B</option>
              <option value='C+'>C+</option>
              <option value='C'>C</option>
              <option value='D+'>D+</option>
              <option value='D'>D</option>
            </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Class</FormLabel>
                <Input 
                variant={'filled'}
                type='text'
                value={classes}
                onChange={(e)=>setClasses(e.target.value)}
                ref={initialRef} placeholder='Class' />
              </FormControl>

              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Select 
                variant={'filled'}
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder='Choose comment type'>
                <option value='Present'>Present</option>
                <option value='Absent'>Absent</option>
                <option value='Sick'>Sick</option>
              </Select>
              </FormControl>

              <Button 
              onClick={sendPost}
              disabled={loading}
              type='submit'
              colorScheme='blue' mr={3} w={'full'} mt={5}>
              {loading ? <Spinner color='white' size='sm' /> : 'Submit Record'}
              </Button>

      </Box>

      </CardBody>
      </Card>
    </Center>
    </>
  )
}
