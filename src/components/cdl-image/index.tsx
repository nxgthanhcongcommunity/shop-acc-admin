import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dntsyzdh3",
  },
});

const CdlImage = (props: any) => {
  let { w = 255, h = 255, id } = props;

  console.log(("" + id).length);

  if (id == null) {
    id = "shop-acc/x0hrnha2aq9xgseidnfb";
  }
  const myImage = cld.image(id);

  // Resize to 250 x 250 pixels using the 'fill' crop mode.
  myImage.resize(fill().width(w).height(h));

  return <AdvancedImage cldImg={myImage} />;
};

export default CdlImage;
