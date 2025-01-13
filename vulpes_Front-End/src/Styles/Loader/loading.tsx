import * as React from "react";

import vulpesLoading from "../../Assets/loading/VULPESLoadingLOOP300px.gif";

export default function LoadingVulpes() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img
        src={vulpesLoading}
        alt="Loading"
        style={{ width: "180px", height: "220px" }}
      />
    </div>
  );
}
