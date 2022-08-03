import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (

    <div className="welcomeScreen">
      <div className="messageWelcome">
        <div className="message1">
          A Place to Keep Your Tasks
        </div>
        <div className="message2">
        Press the button to start
        </div>
        <button onClick={() => loginWithRedirect()} type="submit" className="enterButton">Get into</button>
      </div>
      <div className="frameImageWelcome">
        <div className="imageWelcome">
          <div>
            <img className="imagendewell" src="https://i.blogs.es/6712c1/david-travis-5byxxawhoqg-unsplash/450_1000.webp" alt="132" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;



