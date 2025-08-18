import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddToPlaylistModal.css";

export default function AddToPlaylistModal({
  show,
  onHide,
  song,
  playlists,
  onAdd,
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  function handleAdd() {
    if (selectedPlaylist) {
      onAdd(song._id, selectedPlaylist);
      onHide();
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-dialog"
      backdropClassName="modal-backdrop"
    >
      <Modal.Body>
        <h4>Select a playlist</h4>
        <select
          className="form-select"
          value={selectedPlaylist}
          onChange={(event) => setSelectedPlaylist(event.target.value)}
        >
          <option value="">-- Select --</option>
          {playlists.map((playlist) => (
            <option key={playlist._id} value={playlist._id}>
              {playlist.title}
            </option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={!selectedPlaylist}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
