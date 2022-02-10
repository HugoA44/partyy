import axios from "axios";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const Upload = () => {
  const [uploadedImage, setUploadedImage] = useState("");

  const handleDrop = async (acceptedFiles) => {
    console.log(acceptedFiles);
    const data = new FormData();
    data.append("avatar", acceptedFiles[0]);
    data.append("file-name", acceptedFiles[0].name);

    const response = await axios.post(
      "http://localhost:4000/upload-avatar",
      data
    );
    console.log(response);
    setUploadedImage(response.data);
  };
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/*", onDrop: handleDrop, multiple: false });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <div className="container" style={{ padding: "0 5%" }}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Glissez-déposez votre fichier ici</p>
        </div>
        {uploadedImage && (
          <img
            src={`http://localhost:4000/${uploadedImage.path}`}
            width={400}
          />
        )}
      </div>
    </div>
  );
};
