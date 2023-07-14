import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useGlobalContext } from "./context";
const key = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${key}`

const Gallery = () => {
  const {searchTerm} = useGlobalContext()
const response = useQuery({
  queryKey: ['images', searchTerm],
  queryFn: async() =>{
    const response = await axios.get(`${url}&query=${searchTerm}`);
   const data = response.data;
     return data;
  }
});

if(response.isLoading){
  return <h4>Loading. . .</h4>
}

if(response.isError){
  return <section className="image-container">
    There was an error. . .
  </section>
}
const results = response.data.results;

if (results.length<1){
  return (
    <section className="image-container">
      <h4>No Results were found. . .</h4>
    </section>
  )
}
  return (
    <section className="image-container">
      {results.map((item)=>{
        const url = item?.urls?.regular;
        return(
          <img src={url} alt={item.alt_description} className="img" key={item.id} />
        )
      })}
    </section >
  )
}
export default Gallery