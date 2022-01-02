// material
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
//
import { MotionInView, varFadeInDown, varFadeInUp } from '../../animate';
import { CardIconStyle, CardStyle, SectionWrapper, shadowIcon } from './Landing.styles';

// ----------------------------------------------------------------------

const PLANS = [
  {
    icon: '/static/icons/ic_code.svg',
    title: <>Nhập Mã</>,
    description:
      'Khi bạn vào trang chủ, sẽ có hiển thị ô nhập mã, bạn nhập mã code bạn có được vào ô và nhấn nút gửi.'
  },
  {
    icon: '/static/icons/ic_image.svg',
    title: <>Xem Ảnh</>,
    description:
      'Sau khi nhập mã, toàn bộ  ảnh của bạn sẽ hiển thị, bản có thể nhấn vào từng bức ảnh để xem ảnh với tỷ lệ đầy đủ.'
  },
  {
    icon: '/static/icons/ic_download.svg',
    title: <>Tải Ảnh</>,
    description:
      'Bạn có thể lựa chọn tải từng tấm ảnh hoặc tải toàn bộ ảnh, ảnh của bạn sẽ đươc lưu vào máy của bạn.'
  }
];

// ----------------------------------------------------------------------

type PlanCardProps = {
  guide: {
    icon: string;
    title: any;
    description: string;
  };
  index: number;
};

function PlanCard({ guide, index }: PlanCardProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <CardStyle variant="outlined">
      <Box textAlign="center">
        <CardIconStyle
          src={guide.icon}
          sx={{
            ...(index % 3 === 0 && {
              filter: (theme) => shadowIcon(theme.palette.warning.main)
            }),
            ...(index % 3 === 1 && {
              filter: (theme) => shadowIcon(theme.palette.error.main)
            }),
            ...(index % 3 === 2 && {
              filter: (theme) => shadowIcon(theme.palette.info.main)
            })
          }}
        />
        <Typography variant="h4" paragraph>
          {guide.title}
        </Typography>
        <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
          {guide.description}
        </Typography>
      </Box>
    </CardStyle>
  );
}

export default function LandingGuideLine() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SectionWrapper id="guideline">
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 10, md: 15 }, textAlign: 'center' }}>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h3">Tải ảnh đã chụp dễ dàng trong 3 bước</Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={mobile ? 2 : 5}>
          {PLANS.map((plan, index) => (
            <Grid key={`guide-${index}`} item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <MotionInView variants={index === 1 ? varFadeInDown : varFadeInUp}>
                <PlanCard guide={plan} index={index} />
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionWrapper>
  );
}
