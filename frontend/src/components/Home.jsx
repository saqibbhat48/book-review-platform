import { Link } from 'react-router-dom';
import { BookOpen, Search, Star } from 'lucide-react';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-12">
    <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 p-12 flex flex-col justify-center text-white">
        <BookOpen className="w-16 h-16 mb-6 text-white/80" />
        <h1 className="text-4xl font-bold mb-4">Book Reviews</h1>
        <p className="text-xl text-indigo-100 mb-6">
          Discover, explore, and share your favorite reads
        </p>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Search className="w-6 h-6 mr-2 text-white/70" />
            <span>Find Books</span>
          </div>
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-2 text-yellow-400" />
            <span>Write Reviews</span>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to Your Reading Journey
        </h2>
        <p className="text-gray-600 mb-6">
          Connect with fellow book lovers, discover new reads, and share your thoughts on the books that inspire you.
        </p>
        <div className="space-y-4">
          <Link 
            to="/books" 
            className="w-full block bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg text-center hover:from-indigo-700 hover:to-purple-700 transition-all transform duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Browse Books
          </Link>
          <Link 
            to="/signup" 
            className="w-full block border-2 border-indigo-600 text-indigo-600 p-3 rounded-lg text-center hover:bg-indigo-50 transition-all"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;