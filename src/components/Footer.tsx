import Link from "next/link";

export const Footer = () => (
  <footer className="footer footer-center p-10 bg-primary text-primary-content">
 <div className="grid grid-flow-col gap-4">
    <Link href="/about" className="link link-hover">About us</Link>
    <Link href="/contact" className="link link-hover">Contact</Link>
    <Link href="/" className="link link-hover">Jobs</Link>
    <Link href="/post-job" className="link link-hover">Post job</Link>
  </div>
  <div>
    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
  </div>
  </footer>
)
