import React from "react";

function useGenres(selectedGenres) {
  if (selectedGenres < 1) return "";
  const genreId = selectedGenres.map((g) => g.id);
  return genreId.reduce((acc, curr) => acc + "," + curr);
}

export default useGenres;
