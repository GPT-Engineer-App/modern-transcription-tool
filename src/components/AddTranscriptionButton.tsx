import React from "react";
import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface AddTranscriptionButtonProps {
  onOpen: () => void;
}

const AddTranscriptionButton: React.FC<AddTranscriptionButtonProps> = ({ onOpen }) => {
  return (
    <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
      Add Transcription
    </Button>
  );
};

export default AddTranscriptionButton;
