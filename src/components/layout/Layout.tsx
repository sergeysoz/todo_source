import React from "react";
import "./Layout.scss";

export default function Layout({ children }: { children: any }) {
  return <div className="Layout__layout">{children}</div>;
}
