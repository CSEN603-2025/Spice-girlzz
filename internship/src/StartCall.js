import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

const StartCall = () => {
  const [callStatus, setCallStatus] = useState('ongoing'); // Can be 'ongoing' or 'inactive'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleCallAction = (action) => {
    if (action === 'leave') {
      setCallStatus('inactive');
    }
  };

  return (
    <div className="animate-fadeIn" style={{ paddingTop: '50px' }}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Video Call</h2>
      {callStatus === 'ongoing' ? (
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center mb-4">
              <p className="text-gray-500">Video Feed (Simulated)</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full text-white cursor-pointer transition-colors duration-200 ${
                  isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
              </button>
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full text-white cursor-pointer transition-colors duration-200 ${
                  isVideoOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
              </button>
              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-full text-white cursor-pointer transition-colors duration-200 ${
                  isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                <FaDesktop size={24} />
              </button>
              <button
                onClick={() => handleCallAction('leave')}
                className="p-3 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors duration-200"
              >
                <FaPhoneSlash size={24} />
              </button>
            </div>
          </div>
          <p className="text-gray-800 text-center">Call with Alice Johnson</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No active call. Start a call from the student profile.</p>
        </div>
      )}
    </div>
  );
};

export default StartCall;
