import RoomMarketPlace from '@/components/Marketplace/RoomMarketPlace'

export default function market(props) {
    return (
        <RoomMarketPlace Post={props.post} />
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
            rooms(orderBy: CreatedDate, orderDirection: desc) {
                id
                RoomId
                Creator
                Owner
                IsListed
                CreatedDate
                DisplayCharge
                Price
                TotalEarning
                URI
                Videos
              }
          }
      `,
            }),
        }
    );
    const result = await response.json();
    console.log(result)
    post.rooms = result.data["rooms"]

    return {
        props: {
            post,
        },
    };
}