import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// material
import { Box, Button, Container, Input, Stack, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from 'framer-motion';
//
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import Slider from 'react-slick';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeInRight, varWrapEnter } from '../../animate';
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

// ----------------------------------------------------------------------

const scrollWithOffset = (el: HTMLElement) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -70;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

export default function LandingHome() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(`${PATH_DASHBOARD.root}/${orderId}`);
  }
  return (
    <>
      <Box sx={{ height: { md: '100vh' } }} />
      <RootStyle
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        sx={{ height: { xs: '68vh', sm: '70vh', md: '100vh' }, minHeight: '65vh' }}
      >
        <Box
          sx={{
            position: 'absolute',
            zIndex: 99,
            bottom: '1rem',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: '50%',
            transform: 'translate(-50%,0)'
          }}
        >
          <motion.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <NavHashLink
              scroll={(el) => scrollWithOffset(el)}
              style={{ textDecoration: 'none' }}
              smooth
              to={`#guideline`}
            >
              <KeyboardDoubleArrowDownIcon
                fontSize="large"
                sx={{
                  fontSize: 100,
                  color: '#fff'
                }}
              />
            </NavHashLink>
          </motion.div>
        </Box>
        <Box
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 8,
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            margin: 'auto',
            position: 'absolute',
            '& img': {
              filter: 'blur(2px)',
              height: '100%',
              objectFit: 'cover'
            },
            '& .slick-slider': {
              height: '100%'
            },
            '& .slick-list': {
              height: '100%'
            },
            '& .slick-track': {
              display: 'flex !important',
              height: '100%'
            },
            '& .slick-slide': {
              height: 'inherit !important'
            },
            '& .slick-slide div': { height: '100%' }
          }}
        >
          <Slider
            {...{
              infinite: true,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              fade: true
            }}
          >
            {[
              '/static/home/background.jpg',
              '/static/home/background1.jpg',
              '/static/home/background2.jpg',
              '/static/home/background3.jpg'
            ].map((src) => (
              <Box component="img" key={src} src={src} sx={{ width: '100%', height: '100%' }} />
            ))}
          </Slider>
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '110%',
            padding: '40px 24px'
          }}
        >
          <ContentStyle>
            <Box sx={{ mb: { xs: 4, md: 6 }, mt: -4 }}>
              <motion.div variants={varFadeInRight}>
                <Typography
                  sx={{
                    fontSize: { xs: '64px', sm: '96px', md: '124px' },
                    fontWeight: 'bold',
                    color: 'common.white',
                    fontFamily: 'Licorice'
                  }}
                  component="h1"
                  variant={mobile ? 'h3' : mediumScreen ? 'h2' : 'h1'}
                >
                  PhuQuoc <Box component="span">Photo</Box>
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
            </Box>
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
                    width: { xs: '100%', sm: '65%' },
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}
                >
                  <Input
                    sx={{
                      flex: 1,
                      border: 'none',
                      height: '100%',
                      minWidth: '160px',
                      width: '100%',
                      marginLeft: { xs: '20px', md: '40px' }
                    }}
                    value={orderId}
                    placeholder="Nhập mã code vào đây"
                    onChange={(e) => setOrderId(e.target.value)}
                    disableUnderline
                    required
                  />

                  <Button
                    sx={{
                      border: 'none',
                      borderRadius: '40px',
                      minWidth: '80px',
                      marginTop: '16px',
                      marginBottom: '16px',
                      marginLeft: 'auto',
                      marginRight: { xs: '20px', md: '40px' },
                      paddingX: 2
                    }}
                    endIcon={<ArrowRightAlt />}
                    variant="contained"
                    type="submit"
                  >
                    Gửi mã
                  </Button>
                </Box>
              </form>
            </motion.div>
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
