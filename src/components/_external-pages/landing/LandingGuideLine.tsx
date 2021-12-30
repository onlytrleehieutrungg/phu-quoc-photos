// material
import { useTheme, styled, alpha } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Container, Typography } from '@mui/material';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------
const STEP = [1, 2, 3];
const TITLE = ['Nhập Mã', 'Xem Ảnh ', 'Tải Ảnh'];
const DESCRIPTION = [
  'Khi bạn vào trang chủ, sẽ có hiển thị ô nhập mã, bạn nhập mã code bạn có được vào ô và nhấn nút gửi.',
  'Sau khi nhập mã, toàn bộ  ảnh của bạn sẽ hiển thị, bản có thể nhấn vào từng bức ảnh để xem ảnh với tỷ lệ đầy đủ',
  'Bạn có thể lựa chọn tải từng tấm ảnh hoặc tải toàn bộ ảnh, ảnh của bạn sẽ đươc lưu vào máy của bạn.'
];
const PLANS = [...Array(3)].map((_, index) => ({
  step: STEP[index],
  title: TITLE[index],
  description: DESCRIPTION[index]
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

type PlanCardProps = {
  plan: {
    step: number;
    title: string;
    description: string;
  };
  cardIndex: number;
};

function PlanCard({ plan, cardIndex }: PlanCardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { step, title, description } = plan;

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: (theme) =>
          `0px 48px 80px ${alpha(
            isLight ? theme.palette.grey[500] : theme.palette.common.black,
            0.12
          )}`,
        ...(cardIndex === 1 && {
          boxShadow: (theme) =>
            `0px 48px 80px ${alpha(
              isLight ? theme.palette.grey[500] : theme.palette.common.black,
              0.48
            )}`
        })
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="h6" sx={{ mb: 2, display: 'block' }}>
            Bước {step}
          </Typography>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body2" sx={{ mb: 2, display: 'block', opacity: 0.6 }}>
            {description}
          </Typography>
        </div>
      </Stack>
    </Card>
  );
}

export default function LandingGuideLine() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <RootStyle id="GuideLine">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 1, md: 10 }, textAlign: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h3" sx={{ mb: 3, mt: -8 }}>
              {/* Khám phá thêm */}
              <a href="#GuideLine" style={{ color: 'black' }}>
                <KeyboardDoubleArrowDownIcon sx={{ fontSize: 40, left: 4, right: 4 }} />
              </a>
            </Typography>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Tải ảnh đã chụp dễ dàng trong 3 bước
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={mobile ? 2 : 5}>
          {PLANS.map((plan, index) => (
            <Grid key={plan.step} item xs={12} md={4} style={{ textAlign: 'center' }}>
              <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                <PlanCard plan={plan} cardIndex={index} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
        <MotionInView variants={varFadeIn}>
          <Box sx={{ pt: 5, mt: 10, textAlign: 'center' }}>
            {/* <MotionInView variants={varFadeInDown}>
              <Typography paddingBottom="50px" variant="h4">
                Bạn vẫn còn câu hỏi ?
              </Typography>
            </MotionInView> */}
            <MotionInView variants={varFadeInDown}>
              <Typography variant="h3">LIÊN HỆ VỚI CHÚNG TÔI</Typography>
            </MotionInView>
          </Box>
        </MotionInView>
      </Container>
    </RootStyle>
  );
}
