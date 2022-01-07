/* eslint-disable jsx-a11y/anchor-is-valid */

import { CircularProgress, Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import Page from '../components/Page';
import Header, { Root } from '../pages/PageGallery.Style';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

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
        <ImageList>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">Album</ListSubheader>
          </ImageListItem>
          {data.order_detail.map((item: any) => (
            <ImageListItem key={item.order_detail_id}>
              <img
                src={item.google_photo_album.cover_photo_base_url}
                srcSet={item.google_photo_album.cover_photo_base_url}
                alt={item.google_photo_album.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.google_photo_album.title}
                subtitle={`${item.google_photo_album.media_items_count} hình ảnh`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.google_photo_album.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
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
  console.log(data);
  return (
    <Page title="Kho Ảnh">
      <div>
        <Header order={data} />
        <Box mt={10}>
          {/* {loading ? (
            <CircularProgress />
          ) : orderError ? (
            <Typography>Không tìm thấy dữ liệu {(orderError as any).message}</Typography>
          ) : ( */}
          <Stack spacing={1}>
            <Root>
              <Stack spacing={1}>
                <Box
                  sx={{
                    overflow: 'hidden',
                    '& .infinite-scroll-component': {
                      overflow: 'hidden !important'
                    }
                  }}
                >
                  {getItems()}
                </Box>
              </Stack>
            </Root>
          </Stack>
          {/* )} */}
        </Box>
      </div>
    </Page>
  );
}
