import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks.js';

function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, value } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: value,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          type='text'
          label='Username'
          placeholder='John Doe'
          name='username'
          value={value.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type='password'
          label='Password'
          placeholder='●●●●●●●●'
          name='password'
          error={errors.password ? true : false}
          value={value.password}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
