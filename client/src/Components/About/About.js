// REVIEW OK -- Laurent

import './About.scss';

function About() {
  return (
    <div className="About">
      <h1 className="About-title">Qui sommes-nous ?</h1>
      <div className="About-cardContainer">
        <div className="About-card">
          <img className="About-img rounded-full " src="./images/léo.jpg" alt="Léo Wolff" />
          <div className="About-spanContainer">
            <span className="About-cardName">Léo Wolff</span>
            <span className="About-role-back"> Lead Dev Back</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="About-icon h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
        </div>
        <div className="About-card">
          <img className="About-img rounded-full " src="./images/franck.png" alt="Franck Bisschop" />
          <div className="About-spanContainer">
            <span className="About-cardName">Franck Bisschop</span>
            <span className="About-role-back">Git Master</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="About-icon h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
        </div>
        <div className="About-card">
          <img className="About-img rounded-full " src="./images/laurent.jpeg" alt="Laurent Gourouvin" />
          <div className="About-spanContainer">
            <span className="About-cardName">Laurent Gourouvin</span>
            <span className="About-role-front">Product Owner</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="About-icon h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>
        <div className="About-card">
          <img className="About-img rounded-full " src="./images/dodo.jpg" alt="Dorian Albiges" />
          <div className="About-spanContainer">
            <span className="About-cardName">Dorian Albiges</span>
            <span className="About-role-front">Lead Dev Front</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="About-icon h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
