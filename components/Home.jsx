import Header from "../cards/header";
import Main from "../cards/main_webpage"
import Footer  from "../cards/footer";
const Home = () => {
    let display_data = JSON.parse(localStorage.getItem("display"));
    alert(`welcome ${display_data.username} to home page `);
  return (
    <>
      {/* <h1>Home page</h1>
      <h2>username: {display_data.username}</h2>
      <h2>email: {display_data.email}</h2> */}
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default Home