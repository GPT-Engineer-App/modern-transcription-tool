import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

interface AddTranscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTranscription: any) => void;
}

const AddTranscriptionModal: React.FC<AddTranscriptionModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState(0);
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("success");
  const [failureReason, setFailureReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, date, size, summary, status, failureReason });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transcription</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Size (MB)</FormLabel>
              <Input type="number" value={size} onChange={(e) => setSize(parseFloat(e.target.value))} required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Summary</FormLabel>
              <Input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </Select>
            </FormControl>
            {status === "failed" && (
              <FormControl mt={4}>
                <FormLabel>Failure Reason</FormLabel>
                <Select value={failureReason} onChange={(e) => setFailureReason(e.target.value)}>
                  <option value="">Select a reason</option>
                  <option value="chatgpt4">ChatGPT4 Failure</option>
                  <option value="transcription">Transcription Failure</option>
                </Select>
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTranscriptionModal;