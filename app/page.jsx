import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="flex flex-col justify-center mt-10 md:mt-20 gap-5 md:gap-7">
      <h1 className="text-6xl md:text-9xl font-extrabold text-center">
        Discover & Share
      </h1>
      <span className="text-3xl md:text-6xl font-bold text-center">
        AI-Powered Prompts
      </span>
      <Feed />
    </section>
  );
};

export default Home;
