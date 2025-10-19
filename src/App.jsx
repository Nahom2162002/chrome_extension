import { useState, useEffect, columns } from 'react'
import { useTable } from 'react-table'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import LockedInLogo from './images/LockedIn.png'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

const users = [
  {
    username: 'admin1',
    password: '12345678'
  },
  {
    username: 'admin2',
    password: '012345678'
  }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <LoginPage/>
        <HomePage/>
        <ForgotPassword/>
        <CreateAccount/>
      </BrowserRouter>
    </>
  )
}

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://cities-qd9i.onrender.com/websites");
      const agents = await response.json();
      setData(agents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const Table = ({data}) => {
    const columns = useMemo(
      () => [
        {Header: "ID", accessor: "id"},
        {Header: "URL", accessor: 'url'}
      ],
      []
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({columns, data});
  
  return (
    <div className="homepage">
      <header className="App-header">
        <h1>Welcome to LockedIn! Feel free to add sites you want to restrict</h1>
      </header>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoginPage() {
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  
  const navigate = useNavigate();
  const checkUser = (e) => {
    e.preventDefault();
    const usercheck = users.find(user => (user.username === data.username && user.password === data.password));
    if (usercheck) {
      alert("Login successful");
      navigate("/homepage");
    } else {
      alert("Wrong username/password");
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img className="Logo" src={LockedInLogo} alt="" width="200" height="200" />
          <h2 className="LoginText">Login</h2>
          <br />
          <br />
          <br />
          <br />
          <input type="text" name="username" value={data.username} placeholder="Username" onChange={changeHandler} />
          <br />
          <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} />
          <br />
          <input type="submit" value="Login"/><br/>
        </header>
      </div>
    </>
  )
}

function ForgotPassword() {
  return (
    <div className="ForgotPassword">
      <header className="App-header">
        <h2>Recover your password</h2>
        <form>
          <label htmlFor="email">Enter your email address:</label>
          <input type="email" id="email" name="email" /><br /><br />
          <input type="submit" value="Reset Password" />
        </form>
      </header>
    </div>
  );
}

function CreateAccount() {
  return (
    <div className="createAccount">
      <header className="App-header">
        <img className="Logo" src={LockedInLogo} alt='' width={'200'} height={'200'} />
        <h2 className="CreateHeader">Create account</h2>
        <form action="./accounts_page.php" className="LoginInfo" method="get">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" /><br /><br />
          <label htmlFor="username">Username:</label>
          <input type="text" id="uname" name="uname" /><br /><br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" /><br /><br />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmpassword" name="confirmpassword" /><br /><br />
          <input type="submit" value="Create Account" onClick={() => alert("Account successfully created!")} />
        </form>
      </header>
    </div>
  );
}

export default App;
