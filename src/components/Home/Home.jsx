import Carousel from "../Carousel";
import Index from "./Index"

export default function Home(props) {

  return (
    <div>
      {/* <Carousel /> */}
      <Index data={props.Post} />
    </div>
  );
}
