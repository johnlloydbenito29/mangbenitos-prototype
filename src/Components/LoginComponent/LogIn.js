import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../Contex/AuthenticationContext';
import {Link, useHistory} from 'react-router-dom';

function Login() {
   const emailRef = useRef();
   const passwordRef = useRef();
   const { logIn,currentUser } = useAuth();
   const [signUpError, setSignUpError] = useState('');
   const [loadingSignup, setLoadingSignup] = useState(false);
   const history = useHistory();



   async function handleSubmitSignUp(e) {
      e.preventDefault();

      if (currentUser) {   
         console.log(currentUser.email);
      }

      try {
         setSignUpError('');
         setLoadingSignup(true);
         await logIn(emailRef.current.value, passwordRef.current.value);
         history.push('/Dashboard/Profile');
      } catch (err) {
         setSignUpError('Failed to Sign In');
      }
   }

  
  
   return (
         <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
               <Card>
                  <Card.Body className="w-400">
                     <h2 className="text-center mb-4">Log In</h2>
                     {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                     <Form onSubmit={handleSubmitSignUp}>
                        <Form.Group id="addProduct">
                           <Form.Label>Email</Form.Label>
                           <Form.Control type="email" ref={emailRef} required />
                           <Form.Label>Password</Form.Label>
                           <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loadingSignup } className="w-100 my-4" type="submit">
                           Log In
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
               <div className="w-100 text-center mt-2">
                  Need An Account? <Link to="/"> Sign Up</Link>
               </div>
            </div>
         </Container>
   );
}

export default Login;
