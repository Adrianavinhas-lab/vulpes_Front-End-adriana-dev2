import React, { useRef, ChangeEvent} from 'react';

interface ImageUploaderProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  imageUrl: string;
  labelText?: string;
}

function ImageUploader({ onChange, onClick, imageUrl, labelText }: ImageUploaderProps) {
  const uploaderRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={uploaderRef}
        style={{
          display: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid #7e2706",
          width: "100px",
          height: "100px",
        }}
        onClick={onClick}
      >
        <img
          alt="Upload Logotipo"
          src={imageUrl}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: "50%",
          }}
        />
      </div>
      {labelText && <div>{labelText}</div>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => uploaderRef.current?.click()}
      ></div>
    </div>
  );
}

export default ImageUploader;