import React, { useState } from "react";
import AddTranscriptionModal from "../components/AddTranscriptionModal";
import AddTranscriptionButton from "../components/AddTranscriptionButton";

const Index: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addTranscription = (newTranscription: any) => {
    console.log(newTranscription);
    closeModal();
  };

  return (
    <>
      <AddTranscriptionButton onOpen={openModal} />
      <AddTranscriptionModal isOpen={isModalOpen} onClose={closeModal} onSubmit={addTranscription} />
      {}
    </>
  );
};

export default Index;
