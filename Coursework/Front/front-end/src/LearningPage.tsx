import React from 'react';

import TopBar from './TopBar';
import NavBar from './NavBar';

export default class LearningPage extends React.Component<any, any> {
  public render() {
    return(
      <>
      <TopBar />
      <NavBar />
      <h3>Это страница обучения</h3>
      </>
    );
  }
}
