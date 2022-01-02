// material
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
//
import MainFooter from './MainFooter';
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------
const RootStyle = styled('div')({
  minHeight: '100%',
  overflow: 'hidden'
});

export default function MainLayout() {
  return (
    <RootStyle>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      <MainFooter />
    </RootStyle>
  );
}
