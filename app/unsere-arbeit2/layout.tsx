import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "INOXPARTS - Unsere Arbeit",
  description: "Qualität und Langlebigkeit",
  icons: {
    icon: "/inox/logoInox.svg",
  },
};

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

export default layout;
