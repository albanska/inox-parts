import Gallery from "../components/home/Gallery";

function page({isAdmin = false}) {
  return (
    <div className="min-h-svh">
      <div>
        <h2 className="text-[#4a4e69] text-[32px] font-extrabold tracking-tight leading-8 uppercase lg:text-[45px] lg:leading-11 md:pb-4 lg:pb-10 text-center">
          Produkte
        </h2>
        <div>
          <Gallery isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}

export default page;
