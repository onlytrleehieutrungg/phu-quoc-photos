import { motion } from 'framer-motion';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Box, Input, Container, Typography, Stack, styled } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeInRight, varWrapEnter } from '../../animate';
//
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import BackgroundSlider from 'react-background-slider';
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
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    backgroundColor: theme.palette.grey[400]
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  width: '100%',
  maxWidth: '100%',
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'center'
  }
}));

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  margin: 'auto',
  position: 'absolute'
}));

const Backdrop = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(5px)',
  zIndex: 10
}));

// ----------------------------------------------------------------------

export default function LandingHome() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [code, setCode] = useState('');
  const handle = () => {
    localStorage.setItem('Code', code);
  };
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate({
      pathname: PATH_DASHBOARD.root,
      search: `?${createSearchParams({
        'ma-don-hang': orderId
      })}`
    });
  }
  return (
    <>
      <RootStyle
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        sx={{ height: { xs: '65vh', sm: '70vh', md: '100vh' } }}
      >
        {/* <Backdrop />
        <HeroImgStyle alt="hero" src="/static/home/background.png" variants={varFadeInUp} /> */}
        <div
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 8,
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            margin: 'auto',
            position: 'absolute'
          }}
        >
          <BackgroundSlider
            images={[
              '/static/home/background.png',
              '/static/home/background1.png',
              '/static/home/background2.png',
              '/static/home/background3.png'
            ]}
            duration={5}
            transition={2}
          />
        </div>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '40px 24px'
          }}
        >
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography
                sx={{
                  fontSize: { xs: '30px', md: '60px' },
                  fontWeight: 'bold',
                  color: 'common.white',
                  lineHeight: '0.5rem'
                }}
                component="h1"
                variant={mobile ? 'h3' : mediumScreen ? 'h2' : 'h1'}
              >
                PhuQuoc Photos
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography
                sx={{
                  color: 'grey.300',
                  fontSize: '20px'
                  // marginLeft: { md: '100px', lg: '10px' }
                }}
                variant="caption"
              >
                Lưu giữ hình ảnh cho những chuyến đi của bạn.
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    flex: 1,
                    color: 'common.white',
                    border: 'none',
                    background: 'white',
                    borderRadius: '40px',
                    height: '80px',
                    minWidth: '100px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: '700px',
                    margin: '0 auto'
                  }}
                >
                  {/* <input defaultValue={user ?? undefined} type="text" name="user" /> */}
                  <Input
                    sx={{
                      flex: 1,
                      border: 'none',
                      height: '80px',
                      minWidth: '160px',
                      width: '100%',
                      marginLeft: { xs: '20px', md: '40px' }
                    }}
                    value={orderId}
                    // onChange={(orderID) => setOrderId(orderID)}
                    placeholder="Nhập mã code vào đây"
                    // value={code}
                    onChange={(e) => setOrderId(e.target.value)}
                    disableUnderline
                    required
                  />

                  <Button
                    sx={{
                      border: 'none',
                      borderRadius: '40px',
                      height: '48px',
                      minWidth: '80px',
                      marginTop: '16px',
                      marginBottom: '16px',
                      marginLeft: 'auto',
                      marginRight: { xs: '20px', md: '40px' }
                    }}
                    endIcon={<ArrowRightAlt />}
                    variant="contained"
                    type="submit"
                    // component={RouterLink}
                    // to={PATH_DASHBOARD.root}
                    // onClick={() => {
                    //   navigate(`/${PATH_DASHBOARD.root}/${code}`);
                    // }}
                  >
                    Gửi Mã
                  </Button>
                </Box>
              </form>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '90vh' } }} />
    </>
  );
}
