/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 하이드레이션 경고 억제
  onDemandEntries: {
    // 개발 서버가 페이지를 메모리에 유지하는 시간(ms)
    maxInactiveAge: 25 * 1000,
    // 동시에 유지할 페이지 수
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig 