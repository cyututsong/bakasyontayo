import HomeBanner from "@/components/layout/HomeBanner";

const HomePage = () => {
  return (
    <>
    <HomeBanner />    
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Bakasyontayo.com!</h1>
      <p className="mt-4 text-lg">Your go-to platform for vacation rentals.</p>
    </main>
    </>
  );
}

export default HomePage;