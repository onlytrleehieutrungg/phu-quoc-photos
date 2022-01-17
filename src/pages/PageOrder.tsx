import {
  CircularProgress,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import Page from '../components/Page';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { useParams } from 'react-router-dom';
import orderApi from 'api/order';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UploadIllustration } from '../assets';
import { motion } from 'framer-motion';
import { varBounceIn } from '../components/animate';
import { fDate } from '../utils/formatTime';

const useStyles = makeStyles((theme: any) => ({
  wrap: {
    overflow: 'hidden',
    borderRadius: '2px',
    margin: '10px 10px',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 0px 14px #ccc'
    }
  },
  imgThumb: {
    '& span': {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    '&:hover': {
      '& span': {
        display: 'block'
      }
    }
  },
  item: {
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    borderRadius: '2px',
    backgroundColor: '#ccc',
    cursor: 'zoom-in',
    '&:hover': {
      [theme.breakpoints.up('sm')]: {
        zIndex: 1,
        transform: 'scale(1.1)'
      }
    }
  }
}));

export default function PageOrder() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const {
    isLoading: loadingOrder,
    data,
    error: orderError
  } = useQuery(
    ['orderList', orderId],
    async () => await orderApi.getOrder(orderId).then((res) => res.data),
    {
      enabled: Boolean(orderId)
    }
  );
  const getItems = useCallback(() => {
    return (
      <React.Fragment>
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          mt={15}
          sx={{
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex',
            paddingLeft: 2,
            paddingRight: 2
          }}
        >
          Bộ sưu tập từ chuyến đi của bạn
        </Typography>
        <Typography
          gutterBottom
          variant="caption"
          component="div"
          sx={{ justifyContent: 'center', textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}
        >
          Bắt đầu vào: {fDate(data?.booking_date as any)}
        </Typography>
        <Grid
          container
          spacing={4}
          pt={14}
          pb={5}
          sx={{
            width: '104vw',
            paddingLeft: { xs: 2, md: 5, lg: 9 },
            paddingRight: { sm: 2, md: 6, lg: 14 }
          }}
        >
          {data?.order_detail.map((item: any, index: number) => (
            <Grid key={item.order_detail_id} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ padding: 0, height: '100%', display: { xs: 'flex', sm: 'block' } }}>
                <CardMedia
                  component="img"
                  image={`${
                    item.google_photo_album?.cover_photo_base_url ||
                    'https://lh3.googleusercontent.com/lr/AFBm1_Y2Q87GDxCIs6f4ObWcdSvIt69Ql-BZ13hCBaeTUUWS8Aw_Qqsguf2lNCLtskNcAC86tdNvUkU6Kah3geB26rHbxsqeOMSzW0s3a3Dtxifw8UmOHJrj9OAxG1n6CM3Ruk75qY_5hZ8OewejXUceAchv26Zuxn01YOQ9aPCzfOGnZIVmOoRCPffS2h5o-7hgtQuD1N2R-zsOuhlc2Y4t9Z2HjltPvit-La6ApH3FTnLxrh-cCBCDeTySJImkO3uxQXX0dPRqcoWZ7mJaPHPQPUWLq-_DWBEK-eaCBjjD6tINQbvqhuFl0WjSBdO5--mee9_rTvO4AYoA_W_9wnK9s9rkVtjOpBjIB_Rbr9Zj7HSnQQqjVct5EJBiPAmdu2JwRoSfcTmcQG4NMEe531JZ52GwyhM5NBekhTARti8bqCsSDD5xtstMrC5T93m8ld2VUn8E-wTRH8I3sUxuv-cTJ2pRZfDtisiWu4e3kxZN3OTgaqvO4W3yzk-wGwxTMIhmddZ9FUMdh05Eb6dhw-NxxaQAktX_4mkEvA6R1JNtFRL5N5wcn2Rqep6WriEs2Bq0NcsmVVZCjgizwCkpn2ti_moerkY3Ym7cBAc4jd4JJMr-Y-rmAKNlCmV3WsScQjeUpHeZ_ChkC6wEVRdYTqyZRAxwwkJIg5P-N-sn3nPEpSghDaPACs9dCaVNJ_G3Q5adjmXwJ9ZQHD_ppuPO2ZyU4t1TCGmHPPnJbrva-NQAmcb2NckidDrVxPajB3qIOFu0A_Y8ZYYgajTgcpQzrqRLoVr_RyhFamJAcKWbxNZPYygqyeZfWku8CH4Wy6UxebVGUythTILgC_mpqhVGEb-_QmoCYvRa'
                  }`}
                  alt="green iguana"
                  sx={{
                    objectFit: 'cover',
                    objectPosition: 'top',
                    width: { xs: 100, sm: '100%' },
                    height: { xs: 180, sm: 260 }
                  }}
                />
                <CardContent
                  sx={{
                    paddingBottom: 0,
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 180
                  }}
                >
                  <Box>
                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#696969' }}>
                      {item.product_name}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                      {item.google_photo_album?.media_items_count || 'Chưa cập nhật'} Hình ảnh
                    </Typography>
                  </Box>
                  {item.google_photo_album?.media_items_count ? (
                    <CardActions sx={{ paddingLeft: 0, paddingBottom: 0 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginRight: 1 }}
                        onClick={() => {
                          navigate(PATH_DASHBOARD.album.albumDetail(orderId, item.photo_album_id));
                        }}
                      >
                        Xem
                      </Button>
                      <Link
                        href={item.google_photo_album?.share_info?.shareable_url}
                        underline="none"
                        color="black"
                        target="_blank"
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DownloadIcon fontSize="small" />}
                        >
                          Tải Về
                        </Button>
                      </Link>
                    </CardActions>
                  ) : (
                    ''
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }, [classes.imgThumb, classes.item, classes.wrap, data]);
  if (loadingOrder) {
    return (
      <Container
        sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (orderError != null) {
    return (
      <Container sx={{ height: '60vh', textAlign: 'center', marginTop: '100px' }}>
        <Typography noWrap gutterBottom variant="h3" component="div">
          Không tìm thấy đơn hàng
        </Typography>
        <motion.div variants={varBounceIn}>
          <UploadIllustration sx={{ height: 260, my: { xs: 5, sm: 8 } }} />
        </motion.div>
        <Button to="/" size="large" variant="text" component={RouterLink}>
          <ArrowBackIcon fontSize="small" />
          Trở về trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Page title="Kho Ảnh">
      <div>
        <Box sx={{ flexGrow: 1 }}>{getItems()}</Box>
      </div>
    </Page>
  );
}
