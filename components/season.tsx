export default function Season() {
  const year = new Date().getFullYear() % 2000;
  return (
    <section className="h-screen w-full flex items-center">
      <div className="w-full mt-12">
        <div
          data-aos="fade-right"
          className="bg-burgund w-full sm:w-[400px] h-[60px] lg:w-[600px] lg:h-[80px] flex justify-center sm:justify-end items-center mb-4"
        >
          <p className="uppercase  text-md lg:text-xl text-slate-200 font-bold text-right sm:mr-5">
            {`Sezon ${year - 1}/${year}`}
          </p>
        </div>
        <div
          data-aos="fade-right"
          className="p-responsive uppercase flex flex-col  items-center sm:block font-bold text-3xl sm:text-6xl lg:text-8xl"
        >
          <p>LKS</p>
          <p className="pt-2 ">Kończyce Małe</p>
        </div>
      </div>
    </section>
  );
}
