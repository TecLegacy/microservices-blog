import CreatePosts from './components/posts/Index';
function App() {
  return (
    <>
      <h1 className='underline text-3xl font-bold '>
        Working With WSL 2 & gitlens in VS Code
      </h1>
      <div>
        <CreatePosts />
      </div>
    </>
  );
}

export default App;
