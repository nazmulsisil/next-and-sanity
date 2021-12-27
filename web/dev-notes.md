### how to memoize

```
const C1 = ({ userName, loading }: { userName?: string; loading: boolean }) => {
return <Loader loading={loading}>C1 - {userName}</Loader>;
};
const MemoizedC1 = React.memo(C1);
```

### how to declare whyDidYouRender

```
const Header = () => {
  const [objState, setObjState] = useState({ name: 'World__' });

  useEffect(() => {
    // to trigger an unnecessary re-render, it has to be same value in an object literal
    setObjState({ name: 'World__' });
  }, []);

  return (
    <header>
      <h1>Hello {objState.name} !</h1>
    </header>
  );
};
Header.whyDidYouRender = true;
```
