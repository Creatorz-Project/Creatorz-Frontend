import Index from "./Index"

export default function Home(props) {

  console.log(props.Post)

  return (
    <>
      <Index data={props.Post}/>
    </>
  );
}
