// Import required modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Define JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key',
};

// Configure JWT authentication strategy
passport.use(new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  // You can perform database operations here to find the user by username, validate roles, etc.
  // ...

  // If authentication is successful, pass the user details to the next middleware
  return done(null, jwtPayload);
}));
// Middleware to authenticate requests using JWT
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Implement authentication middleware for protected routes
router.get('/protected-route', authenticateJWT, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

