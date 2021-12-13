import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Button as MuiButton,
  ButtonGroup,
  Stack,
  ImageListItemBar,
  IconButton
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from 'simple-react-lightbox';
import Pagination from '@mui/material/Pagination';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import queryString from 'query-string';

const Root = styled('div')(({ theme }) => ({
  margin: '88px 60px',
  [theme.breakpoints.down('md')]: {
    margin: '88px 10px'
  }
}));

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: 'transparent',
  color: '#000',
  borderRadius: '20px',
  padding: theme.spacing(1)
}));

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

export default function PageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [state, setState] = useState({ isOpen: false, photoIndex: 0, photoUrl: '' });
  // const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const [page, setPage] = React.useState(1);

  const [filters, setFilters] = useState({
    page: 1,
    size: 12
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setFilters({
      ...filters,
      page: value
    });
    console.log(filters);
  };

  useEffect(() => {
    // convert filters to page=1&size=10
    const paramsString = queryString.stringify(filters);
    axios
      .get(`https://api-sale.reso.vn/api/v1/order-medias?order-code=order1&${paramsString}`)
      .then((res) => {
        console.log(res);
        const { data, metadata } = res.data;
        setListEvent(data);
        setMetaData(metadata);
        console.log('success with listEvent');
      })
      .catch((err) => {
        console.log(err);
        console.log('error');
      });
  }, [filters]);
  const [listEvent, setListEvent] = React.useState(images);
  const [metaData, setMetaData] = useState({
    page: 1,
    size: 1,
    total: 1
  });
  const totalPages = Math.ceil(metaData.total / metaData.size);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const [id, setID] = useState(generateOrderNumber());

  return (
    <div style={{ marginTop: '88px', textAlign: 'center' }}>
      <Typography gutterBottom variant="h2" align="center">
        Hình ảnh mã đơn hàng #{localStorage.getItem('Code')}
      </Typography>
      <ButtonGroup style={{ float: 'right', marginRight: '80px' }}>
        <MuiButton size="large" startIcon={<DownloadIcon />}>
          Tải Về
        </MuiButton>
        <MuiButton size="large" startIcon={<LinkIcon />}>
          Chia Sẻ
        </MuiButton>
      </ButtonGroup>
      <SimpleReactLightbox>
        <Root>
          <Stack spacing={5}>
            <Box>
              <SRLWrapper>
                <ImageList variant="masonry" cols={mobile ? 2 : fullScreen ? 3 : 4} gap={10}>
                  {listEvent.map((item) => (
                    <ImageListItem
                      sx={{
                        '& .MuiImageListItem-img': {
                          maxWidth: '100%',
                          height: 'auto',
                          padding: '10px 10px',
                          borderRadius: '30px'
                        }
                      }}
                      key={item.pic_url}
                    >
                      <img
                        src={item.pic_url}
                        srcSet={item.pic_url}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => {
                          let updateState = { ...state };
                          updateState.isOpen = true;
                          updateState.photoUrl = item.pic_url;
                          setState(updateState);
                          handleClickOpen();
                        }}
                      />
                      <ImageListItemBar
                        title={item.title}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <CloudDownloadIcon />
                          </IconButton>
                        }
                        sx={{ margin: '0px 10px 10px', borderRadius: '30px' }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </SRLWrapper>
            </Box>
          </Stack>
        </Root>
      </SimpleReactLightbox>
      <Stack spacing={5}>
        <Pagination
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
          }}
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}

const images: any[] = [];
