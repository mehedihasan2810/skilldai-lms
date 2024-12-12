import { buttonVariants } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="">
      <h2 className="text-xl font-semibold mb-2">Not Found!</h2>
      <p className="mb-2">Could not find requested resource!</p>
      <Link className="text-primary hover:underline" href="/">Return Home</Link>
      </div>
    </div>
  );
}
