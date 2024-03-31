import { useState } from "react";
import { Box, Button, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaRedo, FaPlus, FaTimesCircle } from "react-icons/fa";

// Example transcription data
const initialTranscriptions = [
  { name: "Transcription 1", date: "2023-04-01", size: 12, summary: "Summary of transcription 1", status: "success" },
  { name: "Transcription 2", date: "2023-04-02", size: 0, summary: "Summary of transcription 2", status: "failed", failureReason: "transcription" },
  { name: "Transcription 3", date: "2023-04-03", size: 9, summary: "Summary of transcription 3", status: "success" },
  { name: "Transcription 4", date: "2023-04-04", size: 0, summary: "Summary of transcription 4", status: "failed", failureReason: "chatgpt4" },
  // ... add additional transcriptions here
];

const Index = () => {
  const toast = useToast();
  const [transcriptions, setTranscriptions] = useState(initialTranscriptions);

  const reRunTranscription = (index) => {
    // Here you would have logic to re-run the transcription
    let updatedTranscriptions = [...transcriptions];
    updatedTranscriptions[index].status = "success";
    updatedTranscriptions[index].size = Math.floor(Math.random() * 15) + 1; // Random size between 1 and 15 for example purposes
    setTranscriptions(updatedTranscriptions);
    toast({
      title: "Transcription Rerun",
      description: `Transcription "${updatedTranscriptions[index].name}" is being reprocessed.`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box mb={6}>
        <Heading mb={4}>Transcription List</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="teal" variant="solid">
          Add Transcription
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th isNumeric>Size (MB)</Th>
            <Th>Summary</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transcriptions.map((transcription, index) => (
            <Tr key={index}>
              <Td>{transcription.name}</Td>
              <Td>{transcription.date}</Td>
              <Td isNumeric>{transcription.size || "—"}</Td>
              <Td>{transcription.summary}</Td>
              <Td>
                <Badge colorScheme={transcription.status === "success" ? "green" : "red"}>
                  {transcription.status.charAt(0).toUpperCase() + transcription.status.slice(1)}
                  {transcription.status === "failed" && (
                    <Text as="span" ml={2}>
                      ({transcription.failureReason})
                    </Text>
                  )}
                </Badge>
              </Td>
              <Td>
                {transcription.size === 0 && <IconButton aria-label="Rerun Transcription" icon={<FaRedo />} colorScheme="blue" onClick={() => reRunTranscription(index)} />}
                {transcription.status === "failed" && transcription.failureReason && (
                  <IconButton
                    aria-label="Failure Reason"
                    icon={<FaTimesCircle />}
                    colorScheme="red"
                    ml={2}
                    onClick={() => {
                      toast({
                        title: "Failure Reason",
                        description: `Transcription failed due to ${transcription.failureReason}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Index;
