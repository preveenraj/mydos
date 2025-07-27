/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
  // your next config options
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
