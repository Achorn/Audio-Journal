import { useState } from "react";
const AudioRecorder = () => {
  const [stream, setStream] = useState<{
    access: boolean;
    recorder: null | MediaRecorder;
    error: string;
  }>({
    access: false,
    recorder: null,
    error: "",
  });

  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: "",
  });
  const [chunks, setChunks] = useState<Blob[]>([]);
  // const chunks = useRef([]);

  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mic) => {
        let mediaRecorder;

        try {
          mediaRecorder = new MediaRecorder(mic, {
            mimeType: "audio/webm",
          });
        } catch (err) {
          console.log(err);
          return;
        }

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log("ended");

        mediaRecorder.onstart = function () {
          setRecording({
            active: true,
            available: false,
            url: "",
          });
        };

        mediaRecorder.ondataavailable = function (e) {
          console.log("data available");
          chunks.push(e.data);
          setChunks(chunks);
        };

        mediaRecorder.onstop = async function () {
          console.log("stopped");

          const url = URL.createObjectURL(chunks[0]);
          setChunks([]);

          setRecording({
            active: false,
            available: true,
            url,
          });
        };

        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder,
        });
      })
      .catch((error) => {
        console.log(error);
        setStream({ ...stream, error });
      });
  }

  return (
    <div className="App">
      {stream.access ? (
        <div className="audio-container">
          <button
            className={recording.active ? "active" : ""}
            onClick={() =>
              !recording.active && stream.recorder && stream.recorder.start()
            }
          >
            Start Recording
          </button>
          <button onClick={() => stream.recorder && stream.recorder.stop()}>
            Stop Recording
          </button>
          {recording.available && <audio controls src={recording.url} />}
        </div>
      ) : (
        <button onClick={getAccess}>Get Mic Access</button>
      )}
    </div>
  );
};

export default AudioRecorder;
