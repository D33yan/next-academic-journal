import Home from '@/app/page';
import JournalDetail from '@/app/journals/[slug]/page';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/journals/:slug" element={<JournalDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
