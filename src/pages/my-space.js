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
            rooms(orderBy: CreatedDate, orderDirection: desc) {
              id
              RoomId
              Creator
              Owner
              Videos
              TotalEarning
              IsListed
              CreatedDate
              URI
            }
            socialTokenHoldings(orderBy: id, orderDirection: desc) {
              AmountAvailbleforSale
              AmountListedByHolder
              AmountOwnedByHolder
              Creator
              Holder
              IsLaunched
              LaunchingPrice
              MaxHoldingPerWallet
              PriceSetByHolder
              SocialTokenId
              TotalAmountMinted
              URI
              VideoId
              id
            }
          }
      `,
      }),
    }
  );
  const result = await response.json();
  console.log(result)
  post.videos = result.data["videos"]
  post.rooms = result.data["rooms"]
  post.socialTokenHoldings = result.data["socialTokenHoldings"]

  return {
    props: {
      post,
    },
  };
}
