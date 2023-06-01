import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-4 justify-center items-center w-full h-full">
      <Link href="/a" passHref>
        <button type="button" className="btn btn-outline btn-primary">
          CASO A
        </button>
      </Link>
      <Link href="/b" passHref>
        <button type="button" className="btn btn-outline btn-primary">
          CASO B
        </button>
      </Link>
    </div>
  );
}
