import logo from './logo.svg';
import './App.css';
import InteractiveSentence from './components/feature_1';
import RotatingLogoGrid from './components/feature_2';
import BSSOSSSlideshow from './components/feature_3';

function App() {
  return (
    <div className="App">
      <section className="section-feature-1">
        <InteractiveSentence />
      </section>
      
      <section className="section-feature-2">
        <RotatingLogoGrid />
      </section>
      
      <section className="section-feature-3">
        <BSSOSSSlideshow />
      </section>
    </div>
  );
}

export default App;
