import MySpace from "../components/MySpace/MySpace"


export default function Index(props) {
    return (
        <MySpace Post={props.post} />
    )
}

export async function getServerSideProps() {

    const post = {}
  
    const response = await fetch(
      "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/creatorzv1",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          {
            videos(orderBy: CreatedDate, orderDirection: desc) {
              id
              RoomId
              Creator
              owner
              Listed
              Price
              Published
              AdsEnabled
              CreatedDate
              MetadataURI
              Beneficiaries
              HolderPercentage
              LastPublishedDate
              OwnerPercentage
              SocialTokenId
            }
          }
      `,
        }),
      }
    );
    const result = await response.json();
    console.log(result)
    post.videos = result.data["videos"]
  
    return {
      props: {
        post,
      },
    };
  }
  