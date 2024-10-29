import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return <div className="min-h-full w-full bg-[#081229]">{children}</div>;
};

export default Layout;
