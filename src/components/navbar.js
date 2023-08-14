import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { ThemeSwitcher } from './themeswitcher';
// import { AcmeLogo } from './AcmeLogo.jsx';

export default function Nav() {
  return (
    <Navbar isBordered position='static' disableScrollHandler>
      <NavbarContent>
        <NavbarBrand>
          <p className='font-bold text-inherit'>Logo here</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
