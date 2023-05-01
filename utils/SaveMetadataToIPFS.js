import { Web3Storage } from "web3.storage";
export const saveMetaData = async (obj) => {
  try {
    const blob = new Blob([JSON.stringify(obj)], {
      type: "application/json",
    });
    const MetaDataFile = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "RoomMetaData.json"),
    ];
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN,
    });

    const cid = await client.put(MetaDataFile);
    return cid;
  } catch (err) {
    console.log(err);
  }
};
