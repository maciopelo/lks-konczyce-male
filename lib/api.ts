const API_URL = process.env.WORDPRESS_API_URL || "";

async function fetchAPI(
  query = "",
  { variables }: Record<string, any> = {},
  apiUrl: string = API_URL
) {
  if (!URL.canParse(apiUrl)) {
    throw new Error(`
      Please provide a valid WordPress instance URL.
      Add to your environment variables WORDPRESS_API_URL.
    `);
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(apiUrl, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getImages(limit: number) {
  const query = `
  query Images($first:Int!) {
    mediaItems(first: $first, where:{mimeType:IMAGE_JPEG} ){
      nodes {
        sourceUrl
        slug
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      first: limit,
    },
  };
  const data = await fetchAPI(query, options);
  return data?.mediaItems;
}

export async function getPrevImages(
  last: number,
  startCursor: string,
  apiUrl?: string
) {
  const query = `query PrevImages($last:Int!, $before:String!)  {
    mediaItems(
      last:$last
      before:$before,
      where:{mimeType:IMAGE_JPEG}
    ) {
      nodes {
        sourceUrl
        slug
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      last,
      before: startCursor,
    },
  };

  const data = await fetchAPI(query, options, apiUrl);
  return data?.mediaItems;
}

export async function getNextImages(
  first: number,
  endCursor: string,
  apiUrl?: string
) {
  const query = `query NextImages($first:Int!, $after:String!) {
    mediaItems(
      first:$first,
      after:$after,
      where:{mimeType:IMAGE_JPEG}
    ) {
      nodes {
        sourceUrl
        slug
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      first,
      after: endCursor,
    },
  };

  const data = await fetchAPI(query, options, apiUrl);
  return data?.mediaItems;
}

export async function getAllPostSlugs() {
  const query = `
  query AllPostSlugs {
    posts {
      edges{
        node{
          slug
        }
      }
    }
  }`;
  const data = await fetchAPI(query);
  return data?.posts;
}

export async function getPost(preview: boolean, slug: string) {
  const query = `
  query Post($id: ID!)  {
    post(id: $id, idType: SLUG) {
      slug
      postFields {
        title
        content
        date
        image {
          node {
            sourceUrl
          }
        }
      }
    }
  }`;
  const options = {
    variables: {
      id: slug,
      onlyEnabled: !preview,
      preview,
    },
  };

  const data = await fetchAPI(query, options);
  return data?.post;
}

export async function getPrevPosts(
  preview: boolean,
  last: number,
  startCursor: string,
  apiUrl?: string
) {
  const query = `query Posts($last:Int!, $before:String!)  {
    posts(
      last:$last
      before:$before,
    ) {
      edges {
        node {
          id
          slug
          postFields {
            title
            date
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      onlyEnabled: !preview,
      preview,
      last,
      before: startCursor,
    },
  };

  const data = await fetchAPI(query, options, apiUrl);
  return data?.posts;
}

export async function getNextPosts(
  preview: boolean,
  first: number,
  endCursor: string,
  apiUrl?: string
) {
  const query = `query Posts($first:Int!, $after:String!) {
    posts(
      first:$first,
      after:$after
    ) {
      edges {
        node {
          id
          slug
          postFields {
            title
            date
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      onlyEnabled: !preview,
      preview,
      first,
      after: endCursor,
    },
  };

  const data = await fetchAPI(query, options, apiUrl);
  return data?.posts;
}

export async function getLatestPosts(preview: boolean, limit: number) {
  const query = `query Posts($first:Int!) {
    posts(
      first:$first,
      where: { 
        orderby: { field:DATE, order:DESC } 
      }
    ) {
      edges {
        node {
          id
          slug
          postFields {
            title
            date
            image {
              node {
                sourceUrl
              }
            }
          }
        }
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
  const options = {
    variables: {
      onlyEnabled: !preview,
      preview,
      first: limit,
    },
  };

  const data = await fetchAPI(query, options);
  return data?.posts;
}

export async function getSponsors(preview: boolean) {
  const query = `query Sponsors {
    sponsors {
      edges {
        node {
          id
          sponsorFields {
            name
            url
            logo {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }`;
  const options = {
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  };

  const data = await fetchAPI(query, options);
  return data?.sponsors.edges;
}
