const siteMetadata = {
  title: 'Brain Fart Services',
  author: 'Lukasz Gornicki',
  headerTitle: 'Brain Fart Services',
  description:
    'Accelerate your business growth with expert consulting and tailored solutions. Trusted by top companies like Postman, HDI, and SAP, we specialize in helping you build expertise faster, saving you time and resources. AsyncAPI? Open source? We got you covered.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.brainfart.dev/',
  siteRepo: 'https://github.com/derberg/derberg.github.io',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'lpgornicki@gmail.com',
  github: 'https://github.com/derberg',
  twitter: 'https://twitter.com/derberq',
  youtube: 'https://www.youtube.com/user/derberq/videos',
  linkedin: 'https://www.linkedin.com/in/lukasz-gornicki-a621914/',
  locale: 'en-US',
  // analytics: {
  //   // supports plausible, simpleAnalytics or googleAnalytics
  //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
  //   simpleAnalytics: false, // true or false
  //   googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  // },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'preferred_color_scheme',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
    // utterancesConfig: {
    //   // Visit the link below, and follow the steps in the 'configuration' section
    //   // https://utteranc.es/
    //   repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
    //   issueTerm: '', // supported options: pathname, url, title
    //   label: '', // label (optional): Comment 💬
    //   // theme example: github-light, github-dark, preferred-color-scheme
    //   // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
    //   theme: '',
    //   // theme when dark mode
    //   darkTheme: '',
    // },
    // disqusConfig: {
    //   // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
    //   shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    // },
  },
}

module.exports = siteMetadata
