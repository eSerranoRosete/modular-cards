import { AppBar } from "@/components/navigation/AppBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar />
      <div className="container">{children}</div>
    </>
  );
}
