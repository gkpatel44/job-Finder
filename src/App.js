import { useEffect, useState } from 'react';
import './App.css';
import Loader from "react-loader-spinner";
import { JobData } from './asset/JobData';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styled from 'styled-components';

function App() {
  const [data, setData] = useState({})
  const [details, setDetails] = useState([])
  const [sortdata, setSortdata] = useState([])
  const [sortstatus, setSortstatus] = useState(false)
  const [searchview, setSearchview] = useState(true)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchdata()
  }, [data])
  const fetchdata = () => {
    fetch('http://localhost:8080/api')
      .then(resp => resp.json())
      .then(data => {
        setLoading(false)
        console.log(data);
        setDetails(data)

      })
  }

  const handleinput = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:8080/api/sortlist', options)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.length);
        setSortdata(data)
        if (data.status) {
          console.log(sortdata)
          setSortdata(false)
          setSearchview(false)
        }
        else {
          setSortstatus(true)
          setSearchview(true)
        }
      })
  }



  return (<>

    <Wrapper>
      <Loader
        type="Puff"
        visible={isLoading}
        color="#00BFFF"
        height={100}
        width={100}
      />
    </Wrapper>
    <div className="container" >
      <h1 className="h1tag">Job Search </h1>
      <form className="searchform" onSubmit={handlesubmit} style={{ textAlign: "center", padding: "74px 45px 64px 25px" }}>
        <input name="jobtitle" placeholder="Enter Job Title" onChange={handleinput}></input>
        <input name="joblocation" placeholder="Enter Location" onChange={handleinput}></input>
        <button type="submit">submit</button>
      </form>
      {sortstatus ?
        <JobData datas={sortdata} />
        :
        (<>
          <h5 hidden={searchview} style={{ color: "white" }}>search result not found</h5>
          <h4 style={{ color: "white" }}>suggestion</h4>
          <JobData datas={details} /></>)}
    </div>
  </>
  );
}


const Wrapper = styled.div`
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
`;


export default App;
