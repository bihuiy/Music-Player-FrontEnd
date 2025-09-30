import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

// * Page components
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";
import { addSongToPlaylist } from "../../services/songs";
import { createdPlaylistsShow } from "../../services/profiles";

export default function AddToPlaylistWrapper() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // * State
  const [playlists, setPlaylists] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  // * Fetch current login user's playlists
  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      if (!user?._id) {
        setPlaylists([]);
        return;
      }
      try {
        const { data } = await createdPlaylistsShow(user._id);
        setPlaylists(data.createdPlaylists);
      } catch (error) {
        console.log(error);
      }
    };
    getCreatedPlaylistsData();
  }, [user]);

  // * Open modal and set the song to add
  function handleOpenModal(song) {
    if (!user?._id) return navigate("/user/sign-up");
    setSelectedSong(song);
    setModalShow(true);
  }

  const modalComponent = selectedSong && (
    <AddToPlaylistModal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        setSelectedSong(null);
      }}
      song={selectedSong}
      playlists={playlists}
      onAdd={addSongToPlaylist}
    />
  );

  return { handleOpenModal, modalComponent };
}
