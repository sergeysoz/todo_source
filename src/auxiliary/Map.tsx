import React from "react";

/**
 * Map React component abstraction
 */

interface MapPayload {
  data: Array<any>;
  renderItem: any;
  renderEmpty?: any;
}

export default function Map(mapPayload: MapPayload) {
  return (
    <>
      {mapPayload.data.map((item: any, i: number) =>
        mapPayload.renderItem(item, i)
      )}
    </>
  );
}
