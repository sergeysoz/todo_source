import React from "react";

interface SectionData {
  children?: any;
  isDisplay?: true;
  title?: string;
}

export default function Section(section: SectionData) {
  return (
    <div>
      <p>section.title</p>
      {section.children}
    </div>
  );
}
