import React from 'react';
import QrReader from 'react-qr-reader'

function QrReaderComponent({ handleScan, handleError }){
    return (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%', maxWidth: '420px',  margin: 'auto' }}
        />
    )
}

export default QrReaderComponent;