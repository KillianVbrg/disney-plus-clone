import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  }
}

async function SearchPage({ params: { term } }: Props) {
  if(!term) notFound()

  const termToUse = decodeURI(term) // to remve %20 instead of ' '

  // API call to get the searched movies
  const movies = await getSearchedMovies(termToUse)

  // API call to get Popular movies
  const popularMovies = await getPopularMovies()
  
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for { termToUse }</h1>

        {/* AI suggestion */}

        <MoviesCarousel title="Movies" movies={ movies } isVertical />

        <MoviesCarousel title="You may also like" movies={ popularMovies } />
      </div>
    </div>
  )
}

// http://localhost:3000/search/test
export default SearchPage