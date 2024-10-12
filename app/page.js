import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href="/Chat">
        Chat
      </Link>
      <Link href="/Report">
        Report
      </Link>
    </>
  );
}

