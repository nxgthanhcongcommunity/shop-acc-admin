import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { AdvancedImage, placeholder } from "@cloudinary/react";

export const cld = new Cloudinary({
  cloud: {
    cloudName: "dntsyzdh3",
  },
});
