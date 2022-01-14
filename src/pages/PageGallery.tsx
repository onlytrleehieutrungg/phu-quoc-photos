import { CircularProgress, Container, Button, Stack, Typography, Link } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import React, { useCallback, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery, useQuery } from 'react-query';
import Page from '../components/Page';
import Header, { Root } from './PageGallery.Style';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useParams } from 'react-router-dom';
import orderApi from 'api/order';
import albumApi from 'api/album';
import ResoMasonry from './ResoMasonry';

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

  const { orderId, photoAlbumId } = useParams();

  const {
    isLoading: loadingOrder,
    data: order,
    error: errors
  } = useQuery(['album', orderId], () => orderApi.getOrderDetail(orderId).then((res) => res.data), {
    enabled: Boolean(orderId)
  });

  const { data: dataGallery } = useQuery(
    ['images', photoAlbumId],
    () => albumApi.getAlbum(photoAlbumId).then((res) => res.data),
    {
      enabled: Boolean(photoAlbumId)
    }
  );
  console.log(dataGallery);

  const lightGallery = useRef<any>(null);
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['images', photoAlbumId, 'medias'],
    async ({ pageParam: nextToken }) => {
      const res = await albumApi.getPhotoAlbum(photoAlbumId, {
        'page-token': nextToken ?? null,
        'page-size': 20
      });
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page_token ?? false,
      onSuccess: (response) => {
        lightGallery.current?.refresh();
        console.log('Refresh', response);
      }
    }
  );

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const getItems = useCallback(() => {
    return <ResoMasonry data={data} />;
  }, [classes.imgThumb, classes.item, classes.wrap, data?.pages]);

  if (loadingOrder) {
    return (
      <Container
        sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <CircularProgress />
      </Container>
    );
  }

  const mediaLength = data?.pages.reduce(
    (acc, { media_items }) => [...acc, ...media_items],
    [] as any
  ).length;

  if (error != null) {
    return (
      <Container
        sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <Typography noWrap gutterBottom variant="h3" component="div">
          Không tìm thấy album của bạn
        </Typography>
      </Container>
    );
  }

  return (
    <Page title="Kho Ảnh">
      <div>
        <Header order={order} gallery={dataGallery} />

        <Box mt={10}>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Typography>Không tìm thấy dữ liệu {(error as any).message}</Typography>
          ) : (
            <Stack spacing={1}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent="flex-end"
                sx={{ marginRight: { xs: '10px', lg: '30px' } }}
              >
                <Link
                  href={dataGallery?.share_info?.shareable_url}
                  underline="none"
                  color="black"
                  target="_blank"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<FileDownloadIcon fontSize="medium" />}
                  >
                    Tải về album
                  </Button>
                </Link>
              </Stack>
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
                    <LightGallery
                      speed={500}
                      plugins={[lgThumbnail, lgZoom]}
                      mode="lg-fade"
                      exThumbImage="data-external-thumb-image"
                      onInit={onInit}
                      selector=".gallery-selector"
                    >
                      <InfiniteScroll
                        dataLength={mediaLength}
                        next={fetchNextPage}
                        hasMore={Boolean(hasNextPage)}
                        loader={
                          <Container sx={{ textAlign: 'center', py: 2 }}>
                            <CircularProgress />
                          </Container>
                        }
                        endMessage={
                          <p style={{ textAlign: 'center' }}>
                            <i>Bạn đã xem hết hình ảnh</i>
                          </p>
                        }
                      >
                        {getItems()}
                      </InfiniteScroll>
                    </LightGallery>
                  </Box>
                </Stack>
              </Root>
            </Stack>
          )}
        </Box>
      </div>
    </Page>
  );
}
