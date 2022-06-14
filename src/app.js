import Header from "./components/header";
import Nav from "./components/nav";


function App(){
    
    return (
        <div className="d-flex h">
            <Nav  />
            <div className="col-10 ">
                <Header />
                <h1>Corpo</h1>
            </div>
            
        </div>
    )
}

export default App