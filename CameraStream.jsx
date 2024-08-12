import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const CameraStream = ({ url, type }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: url,
        type: type,
      }],
    };

    const player = videojs(videoRef.current, videoJsOptions);

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [url, type]);

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-default-skin" width="640" height="360"></video>
    </div>
  );
};

export default CameraStream;