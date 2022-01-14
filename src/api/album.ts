import { TAlbum, TPhotoAlbum } from 'types/album';

import request from './axios';

const getAlbum = (photoAlbumId: any) => request.get<TAlbum>(`admin/albums/${photoAlbumId}`);

const getPhotoAlbum = (photoAlbumId: any, param: any) =>
  request.get<TPhotoAlbum>(`admin/albums/${photoAlbumId}/medias`, { params: param });
const albumApi = {
  getAlbum,
  getPhotoAlbum
};

export default albumApi;
