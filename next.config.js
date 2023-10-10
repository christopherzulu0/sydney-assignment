/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ["th.bing.com","skolgarderoben.se",
    "firebasestorage.googleapis.com",
    "i.ytimg.com","www.careeraddict.com",
    "mir-s3-cdn-cf.behance.net",
    "5.imimg.com",
    "salientmarketing.com",
    "www.against-the-grain.com",
    "www.illusionsbrand.com",
    "theeventchronicle.com",
   "www.villagetalkies.com",
   "images.unsplash.com"
  ],
},
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
