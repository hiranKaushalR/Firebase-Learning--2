import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="h-[80vh] text-2xl flex justify-center items-center flex-col gap-2">
      <p>404 Error - Page not Found</p>
      <Link
        to=".."
        className="bg-black text-white text-lg my-4 px-6 py-2 rounded-md"
      >
        Back to home
      </Link>
    </div>
  );
}

export default NoPage;
