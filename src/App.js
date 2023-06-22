import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Home from "./pages/Home"
import Blogpage from "./pages/Blogpage";
import CategoryPage from "./pages/CategoryPage"
import TagPage from "./pages/TagPage";

export default function App() {

  const {fetchBlogPosts} = useContext(AppContext);
  const [searchParams, setSearchParam] = useSearchParams();
  const location = useLocation();

  useEffect(() => { 
    const page = searchParams.get("page") ?? 1;
    if(location.pathname.includes("tages")) {
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category =  location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  },[location.pathname, location.search])

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/blog/:bloIdg" element={<Blogpage />}/>
      <Route path="/tags/:tag" element={<TagPage />}/>
      <Route path="/categories/:category" element={<CategoryPage />}/>
    </Routes>

    // <div className="w-full h-full flex flex-col gap-y-1 justify-center items-center">
    //   <Header />
    //   <Blogs />
    //   <Pagination />
    // </div>
  );
}
