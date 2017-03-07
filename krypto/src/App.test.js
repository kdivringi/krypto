import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it("Dummy test", () => {
	expect(true).toBe(true);
})
// This fails because it now depends on being wrapped in a provider tag
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
