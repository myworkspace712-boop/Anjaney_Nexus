import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [isVerified, setIsVerified] = useState(false);





  useEffect(() => {
    let timer;
    if (status === 'error') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.close();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    const authChannel = new BroadcastChannel('auth_channel');
    
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
          // Log this tab in
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          // 1. Notify any other open tabs that verification is complete
          const authChannel = new BroadcastChannel('auth_channel');
          authChannel.postMessage({ 
            type: 'verification_complete', 
            token: data.token, 
            user: data.user 
          });
          authChannel.close(); // Clean up

          // 2. Update local state
          setStatus('success');
          setIsVerified(true);
          setMessage('Verified! You can close this tab now.');

          // 3. Attempt to automatically close this tab after 1.5 seconds
          setTimeout(() => {
            window.close();
          }, 1500);
        } else {
          authChannel.postMessage('verified_failure');
          setStatus('error');
          setMessage(data.message || 'Invalid or Expired Link');
        }
      } catch (error) {
        authChannel.postMessage('verified_failure');
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Verification Rejected Because:", errorMessage);
        
        setStatus('error');
        setMessage(`Verification failed: ${errorMessage}`);
      }
    };
    
    if (token) {
      verifyToken();
    } else {
      setStatus('error');
      setMessage('No token provided.');
    }
    
    return () => authChannel.close();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/40 text-center">
        {isVerified && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>✅ Email Verified!</h2>
            <p>{message}</p>
          </div>
        )}
        {status === 'loading' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Verifying your email...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          </div>
        )}

        {status === 'error' && (
          <div className="animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-red-500 font-medium mb-4">Error: {message}</p>
            <p className="text-stone-500 font-medium mb-8">Redirecting you to the app in <span className="font-bold text-red-600 text-lg">{countdown}</span> seconds...</p>
            <Link 
              to="/signup"
              className="inline-block w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Back to Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
