import React from "react";
import PropTypes from "prop-types";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const placeholderRef = props.videoRef;
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    //  Video.js player is only initialized once
    if (!playerRef.current) {
      const placeholderEl = placeholderRef.current;
      const videoElement = placeholderEl.appendChild(
        document.createElement("video-js")
      );

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="d-flex justify-content-center" ref={placeholderRef}></div>
  );
};

VideoJS.propTypes = {
  options: PropTypes.object.isRequired,
  onReady: PropTypes.func.isRequired,
  videoRef: PropTypes.object.isRequired,
};

export default VideoJS;
