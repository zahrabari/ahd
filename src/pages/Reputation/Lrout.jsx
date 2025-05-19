// src/pages/Reputation/Lrout.jsx ou Reputation.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Overview from './Overview';
import Reviews from './Reviews';
import Requests from './Requests';
import Widget from './Widget';
import Settings from './set/Settings';
import Whatsapp from './set/Whatsapp';
import Review from './set/Reviewqr';
import SpamReviews from './set/SpamReviews';
import Smss from './set/Smss';
import Reviewlink from './set/Reviewlink';
import EmailRev from './set/EmailRev';
import Integrations from './set/Integrations';
import List from './List';
import Reviewqr from './set/Reviewqr';

const Lrout = () => {
  return (
    <Routes>
      <Route path="/Overview" element={<Overview />} />
      <Route path="/Requests" element={<Requests />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/Widgets" element={<Widget />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Whatsapp" element={<Whatsapp />} />
      <Route path="/Review" element={<Reviewqr />} />
      <Route path="/Spam" element={<SpamReviews />} />
      <Route path="/Smss" element={<Smss />} />
      <Route path="/Reviewlink" element={<Reviewlink />} />
      <Route path="/EmailRev" element={<EmailRev />} />
      <Route path="/Integrations" element={<Integrations />} />
      <Route path="/Listings" element={<List />} />
    </Routes>
  );
};

export default Lrout;
