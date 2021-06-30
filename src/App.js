import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './Components/Details'
import Edit from './Components/Edit'
import Add from './Components/Add'

import Main from './Components/Main'
import PageNotFound from './Components/PageNotFound'
import Headers from './Components/Headers'

function App() {
	return (
		<div className="App">
			<Router>
				<Headers />
				<Switch>

					<Route exact path="/" render={() => <Main />} />
					<Route exact path="/add/:id/:admin" render={({ match }) => <Add match={match} />} />
					<Route exact path="/edit/:id/:admin" render={({ match }) => <Edit match={match} />} />
					<Route exact path="/details/:id" render={({ match }) => <Details match={match} />} />
					<Route render={() => <PageNotFound />} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
