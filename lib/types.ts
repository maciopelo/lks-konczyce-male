export type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type GalleryImage = {
  slug: string;
  sourceUrl: string;
};

export type Match = {
  node: {
    slug: string;
    matchFields: {
      date: string;
      goalsScored: number;
      goalsLost: number;
      opponent: string;
      hosts: boolean;
      walkoverWin: boolean;
      opponentLogo: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
};

export type Sponsor = {
  node: {
    id: string;
    sponsorFields: {
      name: string;
      url: string;
      date: string;
      logo: {
        node: {
          sourceUrl: string;
        };
      };
    };
  };
};

export type PostData = {
  id: string;
  slug: string;
  postFields: {
    title: string;
    content: string;
    date: string;
    image: {
      node: {
        sourceUrl: string;
      };
    };
  };
};

export type Post = {
  node: PostData;
};
