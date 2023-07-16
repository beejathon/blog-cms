import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ConfirmModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {`Are you sure you want to delete this ${props.target}?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={3} direction='horizontal'>
          <Button variant='primary' onClick={props.onCancel}>Cancel</Button>
          <Button variant='danger' onClick={props.onConfirm}>Confirm</Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

