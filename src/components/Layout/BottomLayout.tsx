import Footer from '@/components/common/Footer/Footer';

export default function BottomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
