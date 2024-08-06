// middleware.ts
import { getToken } from '@/utils/localStorage/token';
import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const accessToken = request.cookies.has('auth');
  // 로그인 + 로그인 페이지
  if (accessToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }
  if (
    !accessToken &&
    (request.nextUrl.pathname.startsWith('/join') ||
      request.nextUrl.pathname.startsWith('/join/terms') ||
      request.nextUrl.pathname.startsWith('/join/select') ||
      request.nextUrl.pathname.startsWith('/join/success') ||
      request.nextUrl.pathname.startsWith('/join/fail') ||
      request.nextUrl.pathname.startsWith('/findId') ||
      request.nextUrl.pathname.startsWith('/findId/select') ||
      request.nextUrl.pathname.startsWith('/findPw') ||
      request.nextUrl.pathname.startsWith('/findPw/select') ||
      request.nextUrl.pathname.startsWith('/findPw/change') ||
      request.nextUrl.pathname.startsWith('/firebase-messaging-sw.js'))
  ) {
    return NextResponse.next();
  }

  // 로그인 X + 로그인 페이지 X
  if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
    console.log('22222');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images/icon_logo_big|images/header/icon_logo_big|images/icon_check_on|images/icon_check_off|images/Footer/icon_footer_logo|images/Page/icon_in|images/Page/icon_arrow_red|images/Page/icon_out|images/Page/icon_arrow_blue|images/Page/ico_modal_close|images/Page/ico_plus|images/Page/icon_delete_img).*)',
  ],
};
