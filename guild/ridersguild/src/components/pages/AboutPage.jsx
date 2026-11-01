import "../../styles/AboutPage.css";

export default function AboutPage() {
  return (
    <main className="page about-page">
      <article className="card about-card">
        <header className="about-header">
          <p className="about-eyebrow">The chronicles</p>
          <h1>Lorem Ipsum</h1>
          <span className="about-divider" aria-hidden="true">✦</span>
        </header>

        <div className="about-copy">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.
          </p>
          <p>
            Praesent lacinia eu ipsum quis rhoncus. Duis pellentesque felis id urna 
            interdum, et aliquet orci tempor. Nunc efficitur a ex vitae fringilla. 
            Proin pretium eu elit nec fermentum. Proin facilisis sagittis rutrum. 
            Donec faucibus ut metus sed volutpat. Proin at sapien id felis viverra maximus. 
            Integer fringilla nisi ac sem lacinia viverra. Pellentesque consequat eu nibh in varius. 
            Proin eget erat velit. Cras blandit, nibh non pharetra interdum, risus tellus tempor dolor, 
            placerat hendrerit sem odio et quam. Pellentesque a ex eget arcu laoreet facilisis ac mollis eros. 
            Vivamus et cursus nisl. Praesent convallis sagittis lacus, quis euismod dolor consequat sit amet. 
            Duis et lectus leo. Phasellus aliquet pharetra nisl. 
          </p>
        </div>

        <footer className="about-footer">
          Glory to the EMPyrean.
        </footer>
      </article>
    </main>
  );
}