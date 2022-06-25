
import Timesheet from './components/Timesheet';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">William Alkawaz</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Timesheet />
      </div>
    </div>
  );
}

export default App;
