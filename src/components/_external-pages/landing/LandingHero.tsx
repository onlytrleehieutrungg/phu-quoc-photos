import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Box, Input, Container, Typography, Stack, styled } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeInUp, varFadeInRight, varWrapEnter } from '../../animate';
// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 720,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  height: 'auto',
  margin: 'auto',
  position: 'absolute'
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroImgStyle alt="hero" src="/static/home/background.png" variants={varFadeInUp} />

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography sx={{ fontSize: '80px', fontWeight: 'bold', color: 'common.white' }}>
                PhuQuoc <br />
                Photo
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white', fontWeight: 'bold' }}>
                The starting point for your next project based on easy-to-customize Material-UI ©
                helps you build apps faster and better.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Box
                style={{
                  flex: 1,
                  color: 'common.white',
                  border: 'none',
                  background: 'white',
                  borderRadius: '40px',
                  height: '80px',
                  minWidth: '400px',
                  maxWidth: '100%',
                  display: 'flex'
                }}
              >
                <Input
                  style={{
                    flex: 1,
                    border: 'none',
                    height: '80px',
                    minWidth: '160px',
                    width: '300px',
                    marginLeft: '16px'
                  }}
                  id="epg-value"
                  placeholder="Nhập mã code vào đây"
                  disableUnderline
                />
                <Button
                  style={{
                    border: 'none',
                    borderRadius: '40px',
                    height: '48px',
                    minWidth: '80px',
                    width: '104px',
                    marginTop: '16px',
                    marginBottom: '16px',
                    marginLeft: 'auto',
                    marginRight: '16px'
                  }}
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.root}
                >
                  Gửi Mã
                </Button>
              </Box>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
