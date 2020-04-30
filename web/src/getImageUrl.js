import urlBuilder from "@sanity/image-url";
import client from "./sanityClient";

const builder = urlBuilder(client);
export default function getImageUrl(source) {
  return builder.image(source);
}
