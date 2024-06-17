# Website developed for the local football club - LKS Kończyce Małe

Application is dedicated to the team from my home village.
It is connected with CMS (Wordpress) so it the content could be easily managed by people from the club.
It is available [here](https://lks-konczyce-male.vercel.app/) 👈

## Used technologies

- Next.js (with TS)
- Tailwindcss, AOS, React-Slick
- Wordpress (plugins: ACF, WPGraphQL)

## To run locally

For Wordpress I recommend [localwp](https://localwp.com/)

- Download application
- Download [zip](https://drive.google.com/file/d/1_8k3GskNRAz5C6Y9sAvv5jNqrMAUUe4h/view?usp=sharing) with wp app
- Run wp in localwp by importing project zip
- Check in which port app is hosted (default in zip is localhost:10003)

For frontend

- create in project `.env.local` file and override (if needed) variables
  - `WORDPRESS_API_URL`
  - `POLITICS_PRIVACY_PAGE_ID` (post id from wordpress politcits privacy pages, can be read from url)
  - `HISTORY_PAGE_ID` (the same as above but from history page)

Finally install modules and run project

```bash
yarn
yarn run dev
```

## 🎉 Acknowledgements

Thanks for [Manioo77](https://github.com/Manioo77) for preparing graphical design and mocks for the app.
