import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChannels } from "../features/channels/channelsSlice";
import ChannelCard from "../components/ChannelCard";
import VideoPlayer from "../components/VideoPlayer";
import LoginModal from "../components/LoginModal";
import axios from "axios";

const HomePage = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Video reference
  const videoRef = useRef(null);

  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  useEffect(() => {
    // Fetch channel data from the backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api/channels";

    axios
      .get(backendUrl)
      .then((response) => {
        dispatch(setChannels(response.data)); // Dispatch channel data to Redux store
      })
      .catch((error) => {
        console.error("Error fetching channels:", error);
      });

    // Check if the user has already watched for specific time (from localStorage)
    const watchedForTwoMinutes = localStorage.getItem("watchedForTwoMinutes");
    if (watchedForTwoMinutes) {
      setShowModal(true); // Show login modal immediately if specific time have been watched
      if (videoRef.current) {
        setIsBlurred(true);
      }
    }
  }, [dispatch]);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);

    // If the user is not authenticated, check if they've watched for specific time already
    if (!isAuthenticated) {
      const watchedForTwoMinutes = localStorage.getItem("watchedForTwoMinutes");

      // If the user has already watched for specific time, show the login modal immediately
      if (watchedForTwoMinutes) {
        setShowModal(true);
        if (videoRef.current) {
          setIsBlurred(true);
        }
      } else {
        // Start the  timer and show the modal later if not already watched for a specific time
        if (!timerStarted) {
          setTimerStarted(true);

          setTimeout(() => {
            localStorage.setItem("watchedForTwoMinutes", "true"); // Set flag in localStorage
            setShowModal(true);
            setIsBlurred(true);
          }, 80000);
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // Persist login state in localStorage and control video playback
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
    } else {
      localStorage.setItem("isAuthenticated", true); // Store authentication state in localStorage
      localStorage.removeItem("watchedForTwoMinutes"); // Clear the specific-minute watch flag after login
    }
  }, [isAuthenticated]);

  return (
    <div style={{ filter: isBlurred ? "blur(10px)" : "none" }}>
      {/* Video Player */}

      {selectedChannel ? (
        <div className="mb-4" style={{ position: "relative" }}>
          {/* Ensure the video player is rendered on top */}
          <h6
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
            }}
          >
            Now Playing: {selectedChannel.displayName}
          </h6>

          <VideoPlayer streamUrl={selectedChannel.url} videoRef={videoRef} />
        </div>
      ) : (
        <div className="text-center">
          <h3>Select a Channel to Start Watching</h3>
        </div>
      )}

      {/* Channel List */}
      <div className="channel-list-container row">
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <div
              className="col-6 col-md-3 col-lg-2 mb-3 mt-3"
              key={channel._id}
            >
              <ChannelCard channel={channel} onSelect={handleChannelSelect} />
            </div>
          ))
        ) : (
          <p>No channels available</p>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal show={showModal} onHide={handleModalClose} />
    </div>
  );
};

export default HomePage;
