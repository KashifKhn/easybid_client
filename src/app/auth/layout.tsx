import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container relative min-h-[calc(100vh)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col items-center  justify-center bg-muted gap-50 p-10 text-white lg:gap-4 lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex text-[6rem] font-bold">
          <Link href="/">EasyBid</Link>
        </div>
        <div className="relative z-20  text-center ">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &quot;EasyBid has transformed how we connect buyers and sellers,
              making online auctions simple and secure.&quot;
            </p>
            <footer className="text-sm">KashifKhn</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          {children}
        </div>
      </div>
    </div>
  );
}
