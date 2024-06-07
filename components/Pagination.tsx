import React from "react";

interface Props {
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
}
const Pagination = ({
  prevDisabled,
  nextDisabled,
  onNextClick,
  onPrevClick,
}: Props) => {
  return (
    <div className="join grid grid-cols-2 my-6">
      <button
        disabled={prevDisabled}
        className="join-item btn btn-outline text-3xl"
        onClick={onPrevClick}
      >
        «
      </button>
      <button
        disabled={nextDisabled}
        className="join-item btn btn-outline text-3xl"
        onClick={onNextClick}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
