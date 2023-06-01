import React, { useEffect, useState, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "/src/components/Videos/Videos.js";
import VideoPage from "@/components/Videopage";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Index() {
  const router = useRouter();

  const query = router.query.id;

  return(
    <VideoPage videoId={query}/>
  )


}
