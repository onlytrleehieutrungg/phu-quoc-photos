import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
//
import { MotionInView, varFadeInDown, varFadeInRight, varFadeInUp } from '../../animate';
import { SectionWrapper } from './Landing.styles';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  //   borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: `linear-gradient(135deg,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center'
  }
}));

export default function LandingCTA() {
  return (
    <SectionWrapper>
      <ContentStyle>
        <MotionInView
          variants={varFadeInUp}
          sx={{
            mb: { xs: 3, md: 0 }
          }}
        >
          <motion.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Box
              component="img"
              alt="rocket"
              src="/static/home/rocket.png"
              sx={{ maxWidth: 460, width: 1, textAlign: 'center', margin: '0 auto' }}
            />
          </motion.div>
        </MotionInView>

        <Box
          sx={{
            pl: { sm: 0, md: 10 },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <MotionInView variants={varFadeInDown} sx={{ color: 'common.white', mb: 5, pr: 2 }}>
            <Typography variant="h3">
              Cần biết thêm thông tin! <br />
              Để lại email và chúng tôi sẽ liên lạc với bạn ngay
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Stack
              direction={['column', 'row']}
              spacing={[1.5, 1.5]}
              rowGap={[1.5, 1.5]}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <motion.div variants={varFadeInRight}>
                <a href="mailto:info@phuquocbase.com" style={{ textDecoration: 'none' }}>
                  <Button
                    size="large"
                    variant="contained"
                    disableElevation
                    sx={{ width: '100%', height: ['48px', '100%'] }}
                  >
                    Liên hệ
                  </Button>
                </a>
              </motion.div>
            </Stack>
          </MotionInView>
        </Box>
      </ContentStyle>
    </SectionWrapper>
  );
}
