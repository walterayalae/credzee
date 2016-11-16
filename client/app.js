import React from 'react';
import ReactDOM from 'react-dom';
import First from './components/first';

// Import compiled SASS
require('./sass/app.sass');

ReactDOM.render(<First title="Credzee" />, window.document.getElementById('app'));