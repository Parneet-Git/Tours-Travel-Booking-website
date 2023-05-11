import { useEffect } from "react";
import "./App.css";
import CourseCard from "./components/CourseCard/CourseCard";
import Layout from "./components/Layout/Layout";

 
function App() {
  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement('script')
      script.src = src
      script.onload = ()=>{
        resolve(true)
      }
      script.onerror = ()=>{
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  useEffect(()=>{
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
  })
  return(
    <>
    <section className='card-list'>
      <CourseCard/>
    </section>
    <Layout/>
    
    </>
  );
}

export default App;
