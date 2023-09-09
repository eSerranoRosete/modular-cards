export interface CardType {
  id?: string;
  title?: string;
  description?: string;
  organization?: string;

  avatar?: MediaFile;
  cover?: MediaFile;

  email?: string;
  phone?: string;

  settings?: CardSettings;

  social: SocialItem[];
}

export type CardSettings = {
  showContactButton?: boolean;
  showShareButton?: boolean;
};

export type SocialItem = {
  id: string;
  url: string;
};

export type MediaFile = {
  id?: string;
  name?: string;
  url?: string;
  fileType?: string;
  base64Content?: string;
};
