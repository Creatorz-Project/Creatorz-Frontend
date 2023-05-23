import TokenMarketPlace from '@/components/Marketplace/Token/TokenMarketPlace'

export default function market(props){
    return (
        <TokenMarketPlace Post={props.post}/>
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
            socialTokenHoldings(orderBy: LaunchingPrice, orderDirection: asc) {
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
    post.socialTokenHoldings = result.data["socialTokenHoldings"]

    return {
        props: {
            post,
        },
    };
}