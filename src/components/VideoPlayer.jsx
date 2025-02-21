import PropTypes from "prop-types";
import "video.js/dist/video-js.css"; // Import the necessary Video.js CSS
import VideoJS from "./VideoJS";

const VideoPlayer = ({ streamUrl, videoRef }) => {
  const VIDEOJS_OPTIONS = {
    controls: true,
    autoplay: true,
    preload: "auto",
    sources: [
      {
        src: streamUrl,
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <div>
      <VideoJS videoRef={videoRef} options={VIDEOJS_OPTIONS} />
    </div>
  );
};

// PropTypes validation
VideoPlayer.propTypes = {
  streamUrl: PropTypes.string.isRequired, // streamUrl should be a required string
  videoRef: PropTypes.object.isRequired, // videoRef should be a required object
};

export default VideoPlayer;
