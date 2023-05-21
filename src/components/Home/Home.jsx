import Carousel from "../Carousel";
import Index from "./Index"

export default function Home(props) {

  return (
    <>
      {/* <Carousel /> */}
      <Index data={props.Post} />
    </>
  );
}
