/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverExternalPackages: ["firebase", "zustand"],
  },
};

module.exports = nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     webpackBuildWorker: true,
//     serverComponentsExternalPackages: ["firebase", "zustand"],
//     //serverComponentsExternalPackages: [
//       // '@google-cloud/datastore',
//       // '@google-cloud/secret-manager',
//       // '@google-cloud/storage',
//     //],
//   },
//   transpilePackages: [
//     // '@repo/platform-web-ui',
//     // '@repo/utils',
//   ],
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//     ],
//   },

//   // @svgr/webpack
//   // webpack(config) {
//   //   // Grab the existing rule that handles SVG imports
//   //   const fileLoaderRule = config.module.rules.find((rule) =>
//   //     rule.test?.test?.('.svg')
//   //   );

//   //   config.module.rules.push(
//   //     // Reapply the existing rule, but only for svg imports ending in ?url
//   //     {
//   //       ...fileLoaderRule,
//   //       test: /\.svg$/i,
//   //       resourceQuery: /url/, // *.svg?url
//   //     },
//   //     // Convert all other *.svg imports to React components
//   //     {
//   //       test: /\.svg$/i,
//   //       issuer: /\.[jt]sx?$/,
//   //       resourceQuery: { not: /url/ }, // exclude if *.svg?url
//   //       use: [
//   //         {
//   //           loader: '@svgr/webpack',
//   //           options: {
//   //             svgoConfig: {
//   //               plugins: [
//   //                 {
//   //                   name: 'preset-default',
//   //                   params: {
//   //                     overrides: {
//   //                       removeViewBox: false,
//   //                       cleanupIds: false,
//   //                     },
//   //                   },
//   //                 },
//   //               ],
//   //             },
//   //           },
//   //         },
//   //       ],
//   //     }
//   //   );

//   //   // Modify the file loader rule to ignore *.svg, since we have it handled now.
//   //   fileLoaderRule.exclude = /\.svg$/i;

//   //   return config;
//   // },

//   async redirects() {
//     return [
//       // {
//       //   source: '/policy-terms',
//       //   destination: '/help/terms-and-conditions',
//       //   permanent: true,
//       // },
//       // {
//       //   source: '/content/contact-us',
//       //   destination: '/help/contact',
//       //   permanent: true,
//       // },
//       // {
//       //   source: '/content/about-us',
//       //   destination: '/help/about',
//       //   permanent: true,
//       // },
//       // {
//       //   source: '/content/:slug',
//       //   destination: '/help/:slug',
//       //   permanent: true,
//       // },
//       // {
//       //   source: '/registration/:slug',
//       //   destination: '/join',
//       //   permanent: true,
//       // },
//     ];
//   },

//   // Allow CORS on API
//   async headers() {
//     return [
//       {
//         source: '/api/(.*)',
//         headers: [
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'X-Tenant-ID,X-Env',
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
