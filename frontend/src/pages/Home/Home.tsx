import NavigationBar from "../../componets/NavigationBar";
import mailImg from "../../assets/mail.png";

function Home() {
  return (
    <div className="w-full h-screen">
      <NavigationBar />
      <div className="w-full h-3/4 flex items-center justify-center flex-col">
        <img
          src={mailImg}
          className=""
          style={{ height: "26%", width: "10%" }}
        />
        <p className="text-6xl">
          Welcome to <span className="font-bold">Mailbox</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
