import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Star, Send } from 'lucide-react';
import { submitReview } from '../services/api';
import { getReviews } from '../redux/booksSlice';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!reviewText.trim()) {
      setError('Please write a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    try {
      await submitReview({ bookId, reviewText, rating });
      dispatch(getReviews(bookId));
      setReviewText('');
      setRating(0);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Rate Your Experience</label>
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setRating(num)}
              className={`transition-all duration-200 ${
                rating >= num 
                  ? 'text-yellow-400 scale-110' 
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            >
              <Star 
                className={`w-8 h-8 ${
                  rating >= num 
                    ? 'fill-yellow-400' 
                    : 'fill-transparent'
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Your Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className="w-full p-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[120px] resize-y"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-600 p-3 rounded-lg text-center mb-4">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
      >
        <Send className="mr-2 w-5 h-5" />
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;