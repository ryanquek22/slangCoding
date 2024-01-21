import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

type ModalFormProps = {
  reservedWordMapping: Record<string, string>;
  setReservedWordMapping: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function ModalForm({reservedWordMapping, setReservedWordMapping}: ModalFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setReservedWordMapping({...reservedWordMapping, [key]: value})
  };

  return (
    <>
      <Button onClick={onOpen}>Set Language</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reserved Words</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="1fr" gap={4}>
              {Object.entries(reservedWordMapping).map(([key, value]) => (
                <GridItem key={key}>
                  <Flex align="center">
                    <FormControl>
                      <FormLabel>{key}</FormLabel>
                    </FormControl>
                    <FormControl>
                      <Input placeholder={value} onChange={(e) => handleInputChange(e, key)}/>
                    </FormControl>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
