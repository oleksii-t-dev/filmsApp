import { useRouteError } from 'react-router-dom';

interface MyError {
  statusText?: string;
  message?: string;
}

export function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);
  const myError: MyError = error as MyError;
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{myError.statusText || myError.message}</i>
      </p>
    </div>
  );
}
