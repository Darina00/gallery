import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MainComponent from './components/main-component/MainComponent';

function App(props) {
  return (
    <div className="App">
      <Header />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default App;
