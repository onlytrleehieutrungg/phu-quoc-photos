/* eslint-disable jsx-a11y/anchor-is-valid */

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
// import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import Page from '../components/Page';
// import Header from '../pages/PageGallery.Style';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
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

export default function PageGallery() {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [errorCode, setErrorCode] = useState(false);
  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let orderId = params.get('ma-don-hang');
  const imgUrl =
    'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-6/252022468_1673007489699911_3605193315752506281_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=VMBK4fJzURIAX-ahy2-&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT9q81yUBNSX6C2QlRWyeGAmCJK1MmmVQKh_MQBzHu6xjw&oe=61DDA2FC';

  const {
    isLoading: loadingOrder,
    data: data,
    isLoading: loading,
    error: orderError
  } = useQuery(['album', orderId], async () => {
    const res = await axios.get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}`);
    return res.data;
  });
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
          Bắt đầu vào: {fDate(data.booking_date)}
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
          {data.order_detail.map((item: any) => (
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
                <CardContent sx={{ paddingBottom: 0 }}>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ justifyContent: 'space-between' }}
                  >
                    {item.product_name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    sx={{ justifyContent: 'space-between' }}
                  >
                    {item.google_photo_album?.media_items_count || 'Chưa cập nhật'} Hình ảnh
                  </Typography>
                  {item.google_photo_album?.media_items_count ? (
                    <CardActions sx={{ paddingLeft: 0, paddingBottom: 0 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginRight: 1 }}
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
  if (orderError) {
    return (
      <Container
        sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <Typography noWrap gutterBottom variant="h3" component="div">
          Không tìm thấy đơn hàng
        </Typography>
      </Container>
    );
  }
  console.log(data);
  return (
    <Page title="Kho Ảnh">
      <div>
        {/* <Header order={data} /> */}
        <Box sx={{ flexGrow: 1 }}>{getItems()}</Box>
      </div>
    </Page>
  );
}
