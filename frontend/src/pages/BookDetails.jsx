import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Book, User, Star, FileText, ArrowLeft } from 'lucide-react';
import { getBook, getReviews } from '../redux/booksSlice';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Spinner from '../components/Spinner';

const BookDetails = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBook, reviews, loading } = useSelector((state) => state.books);
  const { token } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState('description');

  useEffect(() => {
    dispatch(getBook(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  if (loading) return <Spinner />;
  if (!currentBook) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
      <p className="text-red-500 text-xl">Book not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <Link 
          to="/books" 
          className="absolute m-6 p-2 hover:bg-indigo-300 bg-indigo-50 rounded-full transition-colors"
        >
          <ArrowLeft className="text-indigo-600" />
        </Link>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex mt-6 items-center  mb-4">
            <Book className="w-10 h-10 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{currentBook.title}</h1>
              <p className="text-indigo-100 flex items-center mt-2">
                <User className="w-5 h-5 mr-2" />
                {currentBook.author}
              </p>
            </div>
          </div>
          {currentBook.genre && (
            <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full">
              {currentBook.genre}
            </span>
          )}
        </div>

        <div className="p-8">
          <div className="flex border-b mb-6">
            {['description', 'reviews'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  activeSection === section 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                {section === 'description' ? 'Description' : 'Reviews'}
              </button>
            ))}
          </div>

          {activeSection === 'description' && (
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <FileText className="w-6 h-6 mr-3 text-indigo-500" />
                <p className="text-lg">{currentBook.description}</p>
              </div>
              {currentBook.rating && (
                <div className="flex items-center mt-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-6 h-6 ${
                          index < Math.floor(currentBook.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {currentBook.rating}/5 ({reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>
          )}

          {activeSection === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              )}

              {token ? (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-600 mb-4">Add a Review</h3>
                  <ReviewForm bookId={id} />
                </div>
              ) : (
                <div className="bg-indigo-50 border border-indigo-200 text-indigo-600 p-4 rounded-lg mt-8 text-center">
                  <p>Please <Link to="/login" className="underline">log in</Link> to submit a review.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;