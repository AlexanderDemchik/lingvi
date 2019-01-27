import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory';
let history;
try {
  history = createHistory();
} catch (e) {
  history = createMemoryHistory();//for tests
}
export default history;
