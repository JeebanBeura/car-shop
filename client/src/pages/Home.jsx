import React, { useState, useEffect } from 'react';
import { carService, blogService } from '../services/api';
import { cars as staticCars, usedCars as staticUsedCars } from '../data/cars';
import { blogs as staticBlogs } from '../data/blogs';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import CarList from '../sections/CarList';
import Newsletter from '../sections/Newsletter';
import Blog from '../sections/Blog';
import Footer from '../sections/Footer';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsRes, blogsRes] = await Promise.all([
          carService.getAll(),
          blogService.getAll()
        ]);
        
        // Use API data if available, else fallback to static
        const apiCars = carsRes.data.length > 0 ? carsRes.data : [...staticCars, ...staticUsedCars];
        const apiBlogs = blogsRes.data.length > 0 ? blogsRes.data : staticBlogs;
        
        setCars(apiCars);
        setBlogs(apiBlogs);
      } catch (err) {
        console.error('API Error, falling back to static data:', err);
        setCars([...staticCars, ...staticUsedCars]);
        setBlogs(staticBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const newCars = cars.filter(car => car.type === 'New');
  const usedCars = cars.filter(car => car.type === 'Used');

  return (
    <div className="bg-white">
      <Hero />
      <div id="cars">
        <CarList 
          title="Featured New Arrivals" 
          subtitle="Explore the latest" 
          cars={newCars.length > 0 ? newCars : staticCars} 
          id="new-cars-list"
        />
      </div>
      <div id="used-cars">
        <CarList 
          title="Quality Certified Pre-Owned" 
          subtitle="Used Cars" 
          cars={usedCars.length > 0 ? usedCars : staticUsedCars} 
          id="used-cars-list"
          variant="light"
        />
      </div>
      <Newsletter />
      <div id="blog">
        <Blog blogs={blogs.length > 0 ? blogs : staticBlogs} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
