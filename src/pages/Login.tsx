
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { Coffee, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  // Form state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual authentication logic
    console.log('Login attempted with:', { email, password });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-secondary">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-coffee-light/30 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-coffee-medium/20 filter blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <Coffee className="h-8 w-8 text-coffee-dark" />
            <span className="ml-2 font-bold text-2xl text-coffee-dark">
              Coffee2Go <span className="text-coffee-medium">Connect</span>
            </span>
          </Link>
        </div>
        
        <Card variant="default" className="w-full">
          <Card.Content className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-coffee-dark">Welcome Back</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-coffee-dark">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-coffee-dark">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-coffee-medium hover:text-coffee-dark">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-coffee-medium focus:border-coffee-medium transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-coffee-dark"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Remember me */}
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-coffee-medium focus:ring-coffee-medium"
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me for 30 days
                  </label>
                </div>
                
                {/* Submit Button */}
                <Button type="submit" variant="primary" fullWidth size="lg">
                  Sign In
                </Button>
              </div>
            </form>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                Google
              </Button>
              <Button variant="outline">
                Facebook
              </Button>
            </div>
          </Card.Content>
        </Card>
        
        {/* Register link */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-coffee-medium hover:text-coffee-dark font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
