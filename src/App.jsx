import Button from "./components/Button/Button";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import useModal from "./hooks/useModal";
import "./App.css";

function App() {
  // Test modal hook
  const testModal = useModal();

  return (
    <div className="app">
      <Card>
        <h2>Testing Modal Component</h2>
        <Button onClick={testModal.openModal}>Open Test Modal</Button>
      </Card>

      {/* Test Modal */}
      <Modal
        isOpen={testModal.isOpen}
        onClose={testModal.closeModal}
        title="Test Modal"
      >
        <ul>
          <li>Clicking the X button</li>
          <li>Pressing ESC key</li>
          <li>Clicking outside the modal</li>
        </ul>
        <Button onClick={testModal.closeModal}>Close from inside</Button>
      </Modal>
    </div>
  );
}

export default App;
