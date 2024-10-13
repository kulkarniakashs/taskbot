import localFont from "next/font/local";
import "./globals.css";
import SendReminders from "@/components/SendReminder";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TaskBot: Efficient Task Management with Chatbot and Summarization",
  description: "Efficient Task Management with Chatbot and Summarization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SendReminders/>
      </body>
    </html>
  );
}
