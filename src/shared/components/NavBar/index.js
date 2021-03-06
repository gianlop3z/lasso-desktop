import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';
import { messageBox } from '../../utils';
import './index.scss';

const electron = window.require('@electron/remote');

function NavBar({ downloading }) {

  const showInformation = () => {
    let { node, electron, chrome } = window.process.versions;
    messageBox({
      type: 'info',
      title: 'Information',
      detail: `Lasso versions: \
        \nNode: ${node} \
        \nElectron: ${electron} \
        \nChrome: ${chrome}`
      });
  };

  const pageRedirect = () => {
    electron.shell.openExternal('https://lassodl.web.app/');
  };

  return (
    <nav className={cls('aside-nav', { 'hide': downloading })}>
      <NavLink
        exact to="/"
        title="Home"
        activeClassName="active"
        className="uil uil-estate"/>
      <NavLink
        to="/package"
        title="Loaded package"  
        activeClassName="active"      
        className="uil uil-box"/>
      <a
        title="Go to package creator"
        className="uil uil-globe"
        onClick={pageRedirect}/>
      <a
        title="Information"
        className="uil uil-info-circle"
        onClick={showInformation}/>
    </nav>
  );

};

const mapStateToProps = ({ downloading }) => ({ downloading });

export default connect(mapStateToProps)(NavBar);