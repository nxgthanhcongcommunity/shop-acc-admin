import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";

// Create a Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dntsyzdh3",
  },
});

const UploadComponent: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tttkxj7w");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dntsyzdh3/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("response:", response);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("data:", data);
      setImage(data.public_id);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {image && (
        <div>
          <AdvancedImage
            cldImg={cld
              .image(image)
              .resize(thumbnail().width(300).height(300).gravity(autoGravity()))
              .delivery(format("auto"))
              .delivery(quality("auto"))}
            style={{ maxWidth: "100%" }}
            plugins={[placeholder()]}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
