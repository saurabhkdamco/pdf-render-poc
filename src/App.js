import React, { useEffect, useState } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';
//Package used: React PDF viewer: https://www.npmjs.com/package/@phuocng/react-pdf-viewer

const jobData = [
  { url: 'https://rmcnewdelhi.imd.gov.in/rwfc/uploads/delhi_forecast.pdf'},
  { url: 'https://hackathon-planning-kit.org/files/hackerearth.pdf'}
];

const fetchPDF = (url, callback) => {
  axios(url, {
    method: 'GET',
    responseType: 'blob', //Force to receive data in a Blob Format
  })
  .then(response => {
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data], 
        {type: 'application/pdf'});
      const url = URL.createObjectURL(file);
      callback(url);
  })
  .catch(error => {
      console.log(error);
  });
}

function App() {
  const [oldFileURL, setOldFileURL] = useState(null);
  const [newFileURL, setNewFileURL] = useState(null);

  useEffect(() => {
    fetchPDF("https://rmcnewdelhi.imd.gov.in/rwfc/uploads/delhi_forecast.pdf", setOldFileURL);
    fetchPDF("https://hackathon-planning-kit.org/files/hackerearth.pdf", setNewFileURL);
  }, []);

  const pageLayout = {
      transformSize: ({ size }) => ({
          height: size.height + 50,
          width: size.width + 50,
      }),
  };

  return (
    <div>
      <div 
       className='flex mx-auto w-1/2'
        style={{
            display: 'flex',
            gap: '20px',
            margin: '100px auto',
            height: '500px',
            width: '90%'
        }}
    >
     {oldFileURL && <Viewer fileUrl={oldFileURL} pageLayout={pageLayout} />}
     {newFileURL && <Viewer fileUrl={newFileURL} pageLayout={pageLayout} />}
 </div>
    </div>
  );
}

export default App;
