/** @type {import('next').NextConfig} */

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseUrl,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
