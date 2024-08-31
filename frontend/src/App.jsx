import { useEffect, useState } from "react";
import ImportIcon from './assets/import_icon.png';

function App() {
  const uploadFile = () => {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Reload the page to see the uploaded file
        } else {
            console.error('File upload failed');
        }
    })
    .catch(error => console.error('Error:', error));
  }

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        setCurrentTime(data.time);
      });

    fetch('/api/getTextFiles')
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, []);

  const onImport = () => {
    document.getElementById('fileInput').click();
  }

  return (
    <div className="bg-[#B6B0B0] h-screen w-screen">
      {/* FILE INPUT (HIDDEN) */}
      <input type="file" id="fileInput" className="hidden" accept=".txt" onChange={uploadFile} />

      {/* CONTAINER */}
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#E3DFD0] w-[92.5%] h-[90%] rounded-3xl drop-shadow-xl">
          {/* UPPER */}
          <div className="bg-[#B06C6C] w-full h-32 rounded-3xl flex items-center justify-between px-8 drop-shadow-xl">
              <h1 className="text-4xl text-white font-bold">ediText</h1>
              <div className="flex flex-col">
                  <h1 className="text-2xl text-white font-bold">Today is</h1>
                  <h1 id="date" className="text-2xl text-white font-bold">
                    {currentTime}
                  </h1>
              </div>
          </div>
          {/* FILE CONTENTS */}
          <div className="flex flex-wrap gap-8 px-16 py-8 overflow-y-scroll">
              {/* {% for file_name, content in file_data.items() %} */}
                  <div className="w-[450px] flex flex-col items-center justify-center cursor-pointer">
                      {/* CONTENT */}
                      <div className="w-[95%] h-[200px] rounded-2xl bg-[#D4CCCA] mb-[-20px] p-4 overflow-auto">
                          <p className="text-xl text-[#959595]">
                            {/* {{ content | replace('\n', '<br>') | safe }} */}
                          </p>
                      </div>
                      {/* FILENAME */}
                      <div className="w-full h-20 rounded-3xl drop-shadow-xl bg-[#C7BFBD] flex items-center justify-center">
                          <h1 className="text-[#707070] text-4xl font-bold">
                            {/*  */}
                          </h1>
                      </div>
                  </div>
              {/* {% endfor %} */}
          </div>

          {/* FLOATING BUTTONS */}
          <div className="absolute right-8 bottom-8 flex flex-row justify-between">
              <div className="bg-[#C97B7B] rounded-xl drop-shadow-xl p-4 flex align-center justify-center cursor-pointer" onClick={onImport}>
                  <img src={ImportIcon} alt="import icon" />
              </div>
              <a href="/editor">
                  <div className="bg-[#C97B7B] rounded-xl drop-shadow-xl p-4 flex align-center justify-center cursor-pointer ml-8">
                      <h1 className="text-3xl text-white font-bold">Add Entry</h1>
                  </div>
              </a>
          </div>
      </div>
    </div>
  )
}

export default App
