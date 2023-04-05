import React, { useState } from "react";

export default function VideoOverlay() {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    setIsPlaying(true);
  }

  return (
    <div>
      {isPlaying && (
        <div className="overlay">
          <video controls autoPlay>
            <source
              src="https://youtu.be/ebXngNnCQNQ"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}