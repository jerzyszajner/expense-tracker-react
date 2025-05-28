import styles from "./App.module.css";
import { useState } from "react";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Test Modal</h1>

      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          alert("Confirmed!");
          setShowModal(false);
        }}
        title="Test"
        message="This is a test modal"
      />
    </div>
  );
}

export default App;
