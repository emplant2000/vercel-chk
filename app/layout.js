export const metadata = {
  title: "PiSDK Demo",
  description: "Minimal PiSDK demo on Vercel"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
