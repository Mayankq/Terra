import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const BuyModal = ({ isOpen, onClose, onConfirm }) => {
  const [checked, setChecked] = useState(false);
  const [paymentMade, setPaymentMade] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleMakePayment = () => {
    if (checked) {
      setPaymentMade(true);
      console.log('Payment made');
    }
  };

  const handleConfirm = () => {
    if (paymentMade) {
      onConfirm();
      console.log('Ownership transferred');
      setPaymentMade(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader>Confirm Purchase</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to buy this land?</p>
        <p>Please read our <Link to="/terms">terms and conditions</Link>.</p>
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          label="I have read and agree to the terms and conditions"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>Cancel</Button>
        <Button
          color="primary"
          disabled={!checked || paymentMade}
          onClick={handleMakePayment}
        >
          Make Payment
        </Button>
        <Button
          color="warning"
          disabled={!paymentMade}
          onClick={handleConfirm}
        >
          Transfer Ownership
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BuyModal;
