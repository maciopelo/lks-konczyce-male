const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
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

export async function getLastThreePosts(preview: boolean) {
  const query = `query Posts {
    posts(first:4, where: { orderby: { field:DATE, order:DESC } }) {
      edges {
        node {
          id
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
    }
  }`;
  const options = {
    variables: {
      onlyEnabled: !preview,
      preview,
    },
  };

  const data = await fetchAPI(query, options);
  return data?.posts.edges;
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
