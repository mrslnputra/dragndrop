import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './App.css';
import { Resizable } from 're-resizable'
import Draggable from 'react-draggable'
import imageUrl from './assets/sample.jpg'

function App() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber(prevPageNumber => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1)
  }

  function changePageNext() {
    changePage(+1)
  }

  const coordinate = (value) => {
    console.log(value);
  }

  return (
    <div className="">
      <header className="App-header">
        <div className='container'>
          <Document style="" file="/doc1-esign.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page height="600" pageNumber={pageNumber} />
          </Document>
          <Draggable
            bounds={{left: 0, top: 0, right: 100, bottom: 300}}
            defaultPosition={{ x: -330, y: -20 }}
            onDrag={coordinate}
            >
            <Resizable
              defaultSize={{
                width: 75,
                height: 75
              }}
              style={{
                background: `url(${imageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
              lockAspectRatio={true}
            >
            </Resizable>
          </Draggable>
        </div>
        <p> Page {pageNumber} of {numPages}</p>
        {pageNumber > 1 &&
          <button onClick={changePageBack}>Previous Page</button>
        }
        {
          pageNumber < numPages &&
          <button onClick={changePageNext}>Next Page</button>
        }
      </header>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from "react";
// import "./App.css";
// import { generate } from "@pdfme/generator";
// import base64 from "./components/base64";
// import { Designer } from "@pdfme/ui";

// function App() {
//   useEffect(() => {
//     Editor();
//   }, []);

//   const [mousePos, setMousePos] = useState({});

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       setMousePos({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener(
//         'mousemove',
//         handleMouseMove
//       );
//     };
//   }, []);

//   const Editor = async () => {
//     const domContainer = document.getElementById("container");
//     const template = {
//       schemas: [
//         {
//           Meterai: {
//             type: "image",
//             position: {
//               x: 52,
//               y: 123,
//             },
//             width: 28,
//             height: 28,
//           },
//         },
//       ],
//       basePdf: `${base64}`,
//     };
//     const inputs = [
//       {
//         owner: "digidaw",
//       },
//     ];

//     const designer = new Designer({ domContainer, template });
//     console.log(template);
//   };

//   return (
//     <div className="App">
//       <div className="container" id="container">
//       </div>
//       <div>
//           The mouse is at position{" "}
//           <b>
//             ({mousePos.x}, {mousePos.y})
//           </b>
//         </div>
//     </div>
//   );
// }

// export default App;
