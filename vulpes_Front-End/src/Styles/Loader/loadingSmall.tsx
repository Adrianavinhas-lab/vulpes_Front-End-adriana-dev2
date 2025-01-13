import * as React from "react";

import vulpesLoading from "../../Assets/loading/VULPESLoadingLOOP300px.gif";

export default function LoadingVulpesSmall() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        // minHeight: "100vh",
      }}
    >
      <img
        src={vulpesLoading}
        alt="Loading"
        style={{ width: "80px", height: "100px" }}
      />
    </div>
  );
}
