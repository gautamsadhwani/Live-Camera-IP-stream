import React, { useRef } from "react";
import axios from "axios";

function App() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const captureImage = async (imageSrc) => {
    console.log('Capturing image:', imageSrc);
    try {
      const response = await fetch(`http://localhost:3001/proxy?url=${encodeURIComponent(imageSrc)}`);
      const blob = await response.blob();

      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (canvasBlob) => {
          if (canvasBlob) {
            const formData = new FormData();
            formData.append('image', canvasBlob, 'capture.jpg');
            
            try {
              const response = await axios.post('http://localhost:3001/capture', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              console.log(response.data);
            } catch (error) {
              console.error('Error capturing image:', error);
            }
          } else {
            console.error('Failed to create blob from canvas.');
          }
        }, 'image/jpeg');
      };
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  return (
    <div className="">
      <h1 className="text-center text-[3rem] text-white">IP Camera Streams</h1>
      <div className="flex gap-10 justify-center">
        <div className="rounded-md p-5 bg-white">
          <div className="overflow-hidden max-w-[500px] w-full min-w-20 rounded-sm bg-black aspect-square">
            <img
              ref={videoRef1}
              src="http://mmb.aa1.netvolante.jp:1025/mjpg/video.mjpg?resolution=640x360&compression=50"
              alt="CAM 1"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => captureImage("http://mmb.aa1.netvolante.jp:1025/jpg/image.jpg?resolution=640x360&compression=50")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Capture Image CAM 1
          </button>
          <p className="text-right text-black">CAM 1</p>
        </div>
        {/* 
        NOT WORKING HERE : 
        
        <div className="rounded-md p-5 bg-white">
          <div className="overflow-hidden max-w-[500px] w-full min-w-20 rounded-sm bg-black aspect-square">
            <img
              ref={videoRef2}
              src="http://61.211.241.239/nphMotionJpeg?Resolution=640x480&Quality=Standard"
              alt="CAM 2"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => captureImage("http://61.211.241.239/nphMotionJpeg?Resolution=640x480&Quality=Standard")}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Capture Image CAM 2
          </button>
          <p className="text-right text-black">CAM 2</p>
        </div> */}
      </div>
    </div>
  );
}

export default App;
