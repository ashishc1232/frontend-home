// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value; // Get token from cookies

//   if (!token && req.nextUrl.pathname.startsWith("/categories")) {
//     return NextResponse.redirect(new URL("/", req.url)); // Redirect to login page
//   }

//   return NextResponse.next(); // Continue if authenticated
// }

// export const config = {
//   matcher: ["/categories/:path*"], // Apply middleware to all /categories routes
// };
