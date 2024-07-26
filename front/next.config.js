import withPWAInit from "next-pwa"

const withPWA = withPWAInit({
  dest: "public",
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Other Next.js config options
}

export default withPWA(nextConfig)
