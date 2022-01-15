export type TAlbum = {
  id: string;
  title: string;
  product_url: string;
  media_items_count: 0;
  cover_photo_base_url: string;
  cover_photo_media_item_id: string;
  share_info: {
    shareable_url: string;
    share_token: string;
    is_joined: true;
    is_owned: true;
    is_joinable: true;
    shared_album_options: {
      is_collaborative: true;
      is_commentable: true;
    };
  };
};

export type TPhotoAlbum = {
  media_items: [
    {
      id: string;
      description: string;
      product_url: string;
      base_url: string;
      mime_type: string;
      filename: string;
    }
  ];
  next_page_token: string;
};
