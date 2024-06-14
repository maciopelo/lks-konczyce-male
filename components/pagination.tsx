import Link from "next/link";

interface Props {
  prevDisabled: boolean;
  nextDisabled: boolean;
  prevLink?: string;
  nextLink?: string;
}
export default function Pagination({
  prevDisabled,
  nextDisabled,
  prevLink,
  nextLink,
}: Props) {
  return (
    <div className="join grid grid-cols-2 my-6">
      {prevDisabled ? (
        <button
          disabled={prevDisabled}
          className="join-item btn btn-outline text-3xl"
        >
          «
        </button>
      ) : (
        <Link href={prevLink ?? "/"}>
          <button
            disabled={prevDisabled}
            className="join-item btn btn-outline text-3xl"
          >
            «
          </button>
        </Link>
      )}

      {nextDisabled ? (
        <button
          disabled={nextDisabled}
          className="join-item btn btn-outline text-3xl"
        >
          »
        </button>
      ) : (
        <Link href={nextLink ?? "/"}>
          <button
            disabled={nextDisabled}
            className="join-item btn btn-outline text-3xl"
          >
            »
          </button>
        </Link>
      )}
    </div>
  );
}
