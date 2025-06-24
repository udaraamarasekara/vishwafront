import React, { useState } from 'react';
import styles from "./NewGoodAndPerson.module.css";

export default function CameraUpload({ upload }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      upload(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };


  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className={styles.Input}
        capture="environment"
        onChange={handleCapture}
      />

      {previewUrl && (
        <div>
          <img
            src={previewUrl}
            alt="Preview"
            style={{height:'500px', marginTop:'3%', marginInline:"auto", width:'auto',objectFit:'cover'}}
          />
        </div>
      )}
    </div>
  );
}
