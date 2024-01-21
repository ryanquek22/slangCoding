import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export function ModalForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const values: { [key: string]: string } = {
    "=": "equals",
    if: "vibe_check",
    else: "big_yikes",
    elseif: "small_yikes",
    true: "slayy",
    false: "cap",
    null: "ghosting",
    undefined: "cancelled",
    throw: "yeet",
    try: "fk_around",
    catch: "find_out",
    const: "straight",
    let: "let",
    "===": "simp",
    "{": "<",
    "}": ">",
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="1fr" gap={4}>
              {Object.entries(values).map(([key, value]) => (
                <GridItem key={key}>
                  <Flex align="center">
                    <FormControl>
                      <FormLabel>{key}</FormLabel>
                    </FormControl>
                    <FormControl>
                      <Input placeholder={value} />
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
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
