/* eslint-disable jsx-a11y/anchor-is-valid */
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {
  CircularProgress,
  Container,
  IconButton,
  ImageListItemBar,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import { isNull } from 'lodash';
import React, { useCallback, useRef } from 'react';
import { Img } from 'react-image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery, useQuery } from 'react-query';
import Page from '../components/Page';
import Header, { Root } from '../pages/PageGallery.Style';

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

  const url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let orderId = params.get('ma-don-hang');

  const { isLoading: loadingOrder, data: order } = useQuery(['album', orderId], async () => {
    const res = await axios.get(`https://api.phuquocphoto.com/api/v1/orders/${orderId}`);
    return res.data;
  });
  const lightGallery = useRef<any>(null);
  const { data, error, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    'projects',
    async ({ pageParam: nextToken }) => {
      const res = await axios.get(
        `https://api.phuquocphoto.com/api/v1/orders/${orderId}/google-photo-medias`,
        {
          params: {
            'page-token': nextToken,
            'page-size': 10
          }
        }
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.next_page_token ?? false,
      onSuccess: () => lightGallery.current?.refresh()
    }
  );

  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  const getItems = useCallback(() => {
    return data?.pages ? (
      data?.pages?.map(({ media_items: items }: any, index) => (
        <React.Fragment key={`group-${index}`}>
          {items.map((item: any) => (
            <ImageListItem key={item.id} className={[classes.wrap, 'img-responsive'].join(' ')}>
              <div>
                <div className={classes.imgThumb}>
                  <div>
                    <a
                      // data-lg-size={`${item.media_metadata.width}-${item.media_metadata.height}`}
                      className="gallery-selector"
                      data-download-url={`${item.base_url}=w${1960}-d`}
                      data-src={`${item.base_url}=w${1960}-d`}
                      data-external-thumb-image={item.base_url}
                      data-responsive={`${item.base_url}=w${1960} 780, ${
                        item.base_url
                      }=w${1960} 1024`}
                      data-sub-html={`<h4>${item.filename} - ${
                        item.media_metadata.creationTime
                      }</h4> <p><a href="${
                        item.base_url
                      }=w${1960}-d" target="_blank" rel="noreferrer">
          Tải ảnh
        </a></p>`}
                    >
                      <Img
                        src={item.base_url}
                        loader={<Skeleton />}
                        alt={`${isNull(item.title) ? '' : item.title} ${
                          isNull(item.timestamp) ? '' : item.timestamp
                        }`}
                        loading="lazy"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: 'inherit',
                          backgroundColor: 'black'
                        }}
                        onClick={() => {}}
                        className={classes.item}
                      />
                    </a>
                  </div>
                  <span>
                    <ImageListItemBar
                      title={
                        <>
                          <Stack direction="row" spacing={1}>
                            {item.tags?.split(',').map((tag: string) => (
                              <Chip
                                key={tag}
                                label={tag}
                                variant="outlined"
                                clickable
                                size="small"
                                sx={{
                                  color: 'rgb(255, 255, 255)',
                                  marginRight: '2px',
                                  '& .MuiChip-label': {
                                    overflow: 'visible'
                                  }
                                }}
                              />
                            ))}
                          </Stack>
                        </>
                      }
                      style={{ zIndex: 2 }}
                      actionIcon={
                        <a href={`${item.base_url}=w${1960}-d`} target="_blank" rel="noreferrer">
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <CloudDownloadIcon />
                          </IconButton>
                        </a>
                      }
                      sx={{
                        borderRadius: 'inherit',
                        background: 'linear-gradient(0, #000, transparent);'
                      }}
                    />
                  </span>
                </div>
              </div>
            </ImageListItem>
          ))}
        </React.Fragment>
      ))
    ) : (
      <Typography>Không tìm thấy hình ảnh của bạn</Typography>
    );
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
    []
  ).length;

  return (
    <Page title="Kho Ảnh">
      <div>
        <Header order={order} />

        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Typography>Không tìm thấy dữ liệu {(error as any).message}</Typography>
          ) : (
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
                        <ImageList
                          variant="masonry"
                          cols={mobile ? 2 : fullScreen ? 3 : 4}
                          gap={0}
                          sx={{ overflow: 'visible' }}
                        >
                          {getItems()}
                        </ImageList>
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
