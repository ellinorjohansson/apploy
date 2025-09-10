export const HomePage = () => {
  return (
    <section>
      <h1>Home Page</h1>
      <p>Välkommen</p>
        <NavLink to={"/jobs"}>Till jobben</NavLink>
        <NavLink to={"/user"}>Till din sida</NavLink>
    </section>
  );
};
