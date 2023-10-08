import { Spinner } from "./_lib/theme";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-16 w-16 text-gray-900/50" />;
        </div>
      </main>
    </>
  );
}
